import PixaApiService from './apiService';
import galleryCardTpl from '../partials/photo-card.hbs';
import LoadMoreBtn from './load-more-btn';

const searchForm = document.querySelector('#search-form');
const imgsContainer = document.querySelector('.gallery');
const scrollPoint = document.getElementById('#scroll');
console.log(scrollPoint);
// const loadMoreBtn = document.querySelector('[data-action="load-more');

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const pixaApiService = new PixaApiService();

console.log(loadMoreBtn);

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImgsAndBtn);

function onSearch(e) {
  e.preventDefault();

  pixaApiService.query = e.currentTarget.elements.query.value;

  if (pixaApiService.query === '') {
    return console.log('NO');
  }

  loadMoreBtn.show();
  pixaApiService.resetPage();
  clearImgsContainer();
  fetchImgsAndBtn();
}

function fetchImgsAndBtn() {
  loadMoreBtn.disable();
  pixaApiService.fetchImages().then(hits => {
    appendImgsMarkup(hits);
    loadMoreBtn.enable();
    scroll();
  });
}

function appendImgsMarkup(hits) {
  imgsContainer.insertAdjacentHTML('beforeend', galleryCardTpl(hits));
}

function clearImgsContainer() {
  imgsContainer.innerHTML = '';
}

function scroll() {
  scrollPoint.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
