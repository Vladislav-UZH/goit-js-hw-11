import refsApi from './refsApi';
function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
<div class="photo-card">
  <a class="gallery-item" href="${largeImageURL}" >
    <div class="img-modif">
       <img src="${webformatURL}"  alt="${tags}"  title="" loading="lazy" />
    </div>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
  
</div>
       `
    )
    .join('');
}
function renderImgMarkup(data) {
  refsApi.gallery.insertAdjacentHTML('beforeend', createMarkup(data));
}
export { renderImgMarkup };
