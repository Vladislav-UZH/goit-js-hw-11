export default class FetchToApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.options = {};
  }

  async onFetchArticles() {
    const url = `https://pixabay.com/api/?q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

    const r = await fetch(url, this.options);
    const data = await r.json();
    return data.then().then(data => this.page.onIncrement());
  }
  onIncrement() {
    this.page += 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  get actualOptions() {
    return this.options;
  }
  set actualOptions(newOptions) {
    this.options = newOptions;
  }
}
