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
        <b>Likes: </b>
      <span class="info-value">${likes}</span>
        </p>
       
  
      <p class="info-item">
        <b>Views: </b>
      <span class="info-value"> ${views}</span>
        </p>
         
  
      <p class="info-item">
        <b>Comments: </b>
      <span class="info-value">${comments}</span>
        </p>
             
    
      <p class="info-item">
        <b>Downloads: </b>
      <span class="info-value">${downloads}</span>
        </p>
      </div> 
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
