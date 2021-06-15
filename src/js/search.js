import PixaApiService from './apiService';

const searchForm = document.querySelector('#search-form');
const articlesContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more');
console.log(loadMoreBtn);

const pixaApiService = new PixaApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixaApiService.query = e.currentTarget.elements.query.value;
  pixaApiService.resetPage();
  pixaApiService.fetchImages(searchQuery);
}

function onLoadMore() {
  pixaApiService.fetchImages(searchQuery);
}
