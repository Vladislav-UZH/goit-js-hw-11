import ImgApiServ from './js/img-api-service';
const API_KEY = '31547025-6e47633566ca913046836177e';
// 'Sorry, there are no images matching your search query. Please try again.'
// `https://pixabay.com/api/?key=31547025-6e47633566ca913046836177e&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`;
ImgApiServ.actualOptions = {
  headers: {
    Authorization: API_KEY,
  },
};
console.log(ImgApiServ.actualOptions);
