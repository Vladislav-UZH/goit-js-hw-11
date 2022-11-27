import axios from 'axios';
class FetchToApiService {
  constructor() {
    this.page = 1;
    this.perPage = 40;
    this.searchQuery = '';
    this.API_KEY = '31547025-6e47633566ca913046836177e';
    this.parametrs = `&image_type=photo&orientation=horizontal&safesearch=true`;
    this.config = '';
    this.BASE_URL = {
      baseURL: `https://pixabay.com/api/`,
    };
  }

  async fetchArticles() {
    const resp = await axios.get(
      `?key=${this.API_KEY}&q=${this.searchQuery}${this.parametrs}&per_page=${this.perPage}&page=${this.page}`,
      this.BASE_URL
    );
    return resp;
  }
  incrementPage() {
    this.page += 1;
  }
  getValueToEndOfLimit() {
    return this.page * this.perPage;
  }
  get actualPage() {
    return this.page;
  }
  set actualPage(newPage) {
    return (this.page = newPage);
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  get actualParametrs() {
    return this.parametrs;
  }
  set actualParametrs(newParametrs) {
    this.parametrs = newParametrs;
  }
}
export default FetchToApiService;
