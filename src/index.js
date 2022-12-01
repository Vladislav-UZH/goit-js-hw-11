import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import refsApi from './js/helpers/refsApi';
import { renderImgMarkup } from './js/helpers/renderFunc';
import FetchToApiService from './js/helpers/img-serviceApi';
import SearchBtnApi from './js/helpers/spinnerApi';
const lightbox = new SimpleLightbox('.gallery a', {
  captionPosition: 'bottom',
  captionDelay: '250ms',
});

const options = {
  root: null,
  rootMargin: '300px',
  treshold: 1.0,
};
const observer = new IntersectionObserver(onLoadMore, options);
const api = new FetchToApiService();
refsApi.form.addEventListener('submit', onSearchBtnClick);
const searchButtonApi = new SearchBtnApi({
  selector: '.form__submit-btn',
  hidden: true,
});
function onSearchBtnClick(e) {
  e.preventDefault();
  const inputValue = refsApi.searchInput.value.trim();
  api.query = inputValue;

  if (!inputValue) {
    return;
  }
  searchButtonApi.disable();

  api.actualPage = 1;
  getImgsOnSubmit();
}
function loadImg(response) {
  const dataArray = response.data.hits;
  renderImgMarkup(dataArray);
  return lightbox.refresh();
}

async function getImgsOnSubmit() {
  try {
    const resp = await api.fetchArticles();
    const imgArr = resp.data.hits;
    const totalHits = resp.data.totalHits;

    if (!imgArr.length) {
      return undefinedNotifyMess(
        `Sorry, there are no images matching your search query: "${api.query}". Please try again.`
      );
    }
    refsApi.gallery.innerHTML = '';
    successNotifyMess(totalHits);
    console.log(resp);
    loadImg(resp);
    observer.observe(refsApi.jsGuardEl);
    searchButtonApi.enable();
    return;
  } catch (error) {
    errorNotifyMess('Opps.. Something went wrong!');
    searchButtonApi.enable();
    return console.log(err);
  }
}

function onLoadMore(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      getMoreImgAfterScroll(observer);
    }
  });
}
async function getMoreImgAfterScroll(observer) {
  try {
    api.incrementPage();
    const response = await api.fetchArticles();
    const totalHitsData = response.data.totalHits;
    loadImg(response);
    smoothScroll();
    if (api.getValueToEndOfLimit() >= totalHitsData) {
      Notiflix.Notify.warning(
        'Opps.. but you`ve reached the end of search results ¯\\_(ツ)_/¯ '
      );
      return observer.unobserve(refsApi.jsGuardEl);
    }
  } catch (error) {
    errorNotifyMess('Opps.. Something went wrong!');
    searchButtonApi.enable();
    return console.log(error);
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
function successNotifyMess(value) {
  return Notiflix.Notify.success(`Hooray! We found ${value} images.`);
}
function undefinedNotifyMess(value) {
  return Notiflix.Notify.info(value);
}
function errorNotifyMess(value) {
  return Notiflix.Notify.failure(value);
}

// refsApi.searchBtn.disabled = true;
