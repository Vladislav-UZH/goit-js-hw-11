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
  api.query = refsApi.searchInput.value;

  if (!refsApi.searchInput.value) {
    return;
  }
  searchButtonApi.disable();

  api.actualPage = 1;

  api
    .fetchArticles()
    .then(resp => {
      searchButtonApi.enable();
      const imgArr = resp.data.hits;
      const totalHits = resp.data.totalHits;
      if (!imgArr.length) {
        return undefinedNotifyMess(
          `Sorry, there are no images matching your ${api.query}. Please try again.`
        );
      }
      refsApi.gallery.innerHTML = '';
      successNotifyMess(totalHits);
      console.log(resp);
      loadImg(resp);
      // smoothScroll();
      observer.observe(refsApi.jsGuardEl);
      return;
    })
    .catch(err => {
      errorNotifyMess('Opps.. Something went wrong!');
      return console.log(err);
    });
}
function loadImg(response) {
  const dataArray = response.data.hits;
  renderImgMarkup(dataArray);
  return lightbox.refresh();
}

function onLoadMore(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      api.incrementPage();

      api
        .fetchArticles()
        .then(resp => {
          const totalHitsData = resp.data.totalHits;
          successNotifyMess(totalHitsData);
          loadImg(resp);
          smoothScroll();
          if (api.getValueToEndOfLimit() >= totalHitsData) {
            Notiflix.Notify.warning(
              'Opps.. but you`ve reached the end of search results ¯\\_(ツ)_/¯ '
            );
            return observer.unobserve(refsApi.jsGuardEl);
          }
        })
        .catch(err => {
          errorNotifyMess('Opps.. Something went wrong!');
          return console.log(err);
        });
    }
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
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
// refsApi.searchBtn.disabled = true;
