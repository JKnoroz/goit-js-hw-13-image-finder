const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22088587-b9222ac51e20698a54a4430fc';

export default class PixaApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    console.log(this);
    const searchOptions = new URLSearchOpts({
      image_type: 'photo',
      orientation: 'horizontal',
      q: this.searchQuery,
      page: this.page,
      per_page: 12,
      key: API_KEY,
    });

    const url = `${BASE_URL}/?${searchOptions}`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        this.page += 1;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
