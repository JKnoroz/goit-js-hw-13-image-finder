import PixaApiService from './apiService';
import galleryCardTpl from '../partials/photo-card.hbs';

const searchForm = document.querySelector('#search-form');
const imgsContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more');
console.log(loadMoreBtn);

const pixaApiService = new PixaApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearImgsContainer();

  pixaApiService.query = e.currentTarget.elements.query.value;

  if (pixaApiService.query === '') {
    return console.log('NO');
  }

  pixaApiService.resetPage();
  pixaApiService.fetchImages().then(appendImgsMarkup);
}

function onLoadMore() {
  pixaApiService.fetchImages().then(appendImgsMarkup);
}

function appendImgsMarkup(hits) {
  imgsContainer.insertAdjacentHTML('beforeend', galleryCardTpl(hits));
}

function clearImgsContainer() {
  imgsContainer.innerHTML = '';
}
