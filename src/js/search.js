import PixaApiService from './apiService';
import galleryCardTpl from '../partials/photo-card.hbs';
import LoadMoreBtn from './load-more-btn';

const searchForm = document.querySelector('#search-form');
const imgsContainer = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('[data-action="load-more');

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const pixaApiService = new PixaApiService();

console.log(loadMoreBtn);

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixaApiService.query = e.currentTarget.elements.query.value;

  if (pixaApiService.query === '') {
    return console.log('NO');
  }

  loadMoreBtn.show();
  loadMoreBtn.disable();

  pixaApiService.resetPage();
  pixaApiService.fetchImages().then(hits => {
    clearImgsContainer();
    appendImgsMarkup(hits);
    loadMoreBtn.enable();
  });
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
