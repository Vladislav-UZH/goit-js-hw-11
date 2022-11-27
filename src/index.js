import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import refs from './js/refs';
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
const observer = new IntersectionObserver(onLoad, options);
const api = new FetchToApiService();
refs.form.addEventListener('submit', onSearchBtnClick);
refs.searchBtn.disabled = false;
function onSearchBtnClick(e) {
  e.preventDefault();
  api.query = refs.searchInput.value;
  if (!refs.searchInput.value) {
    return;
  }
  // setTimeout(() => (refs.searchBtn.disabled = true), 10000);

  api.actualPage = 1;

  api
    .fetchArticles()
    .then(resp => {
      const imgArr = resp.data.hits;
      const totalHits = resp.data.totalHits;
      if (!imgArr.length) {
        return Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      refs.gallery.innerHTML = '';
      successNotifyMess(totalHits);
      console.log(resp);
      loadImg(resp);
      observer.observe(refs.jsGuardEl);
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

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      api.incrementPage();

      api
        .fetchArticles()
        .then(resp => {
          const totalHitsData = resp.data.totalHits;
          successNotifyMess(totalHitsData);
          loadImg(resp);
          if (api.getValueToEndOfLimit() >= totalHitsData) {
            Notiflix.Notify.warning('Opps.. That`s all ¯\\_(ツ)_/¯ ');
            return observer.unobserve(refs.jsGuardEl);
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
function errorNotifyMess(value) {
  return Notiflix.Notify.failure(value);
}

const spinner = new SearchBtnApi({
  selector: '.form__submit-btn',
});
console.log(spinner.show('is-hidden'));
// refs.searchBtn.disabled = true;
