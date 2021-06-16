import { addSeparatorySpaces } from './digits';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22088587-b9222ac51e20698a54a4430fc';

export default class PixaApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    console.log(this);

    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.plusPage();
        console.log(hits);
        return hits;
      })
      .then(hits =>
        hits.map(({ likes, views, comments, downloads, ...rest }) => {
          return {
            ...rest,
            likes: addSeparatorySpaces(likes),
            views: addSeparatorySpaces(views),
            comments: addSeparatorySpaces(comments),
            downloads: addSeparatorySpaces(downloads),
          };
        }),
      );
  }

  plusPage() {
    this.page += 1;
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
