import PixaApiService from './apiService';
import galleryCardTpl from '../partials/photo-card.hbs';

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
  pixaApiService.fetchImages().then(appendImgsMarkup);
}

function onLoadMore() {
  pixaApiService.fetchImages().then(appendImgsMarkup);
}

function appendImgsMarkup(hits) {
  articlesContainer.insertAdjacentHTML('beforeend', galleryCardTpl(hits));
}
