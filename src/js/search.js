import PixaApiService from './apiService';
import galleryCardTpl from '../partials/photo-card.hbs';
import LoadMoreBtn from './load-more-btn';
import notifications from './notifications';

const searchForm = document.querySelector('#search-form');
const imgsContainer = document.querySelector('.gallery');
const scrollPoint = document.getElementById('#scroll');

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
  clearImgsContainer();
  loadMoreBtn.hide();
  pixaApiService.query = e.currentTarget.elements.query.value;

  if (!pixaApiService.query) {
    return;
  }

  if (pixaApiService.query.trim() === '') {
    return notifications.notFound();
  }

  loadMoreBtn.show();
  pixaApiService.resetPage();

  fetchImgsAndBtn();

  e.currentTarget.elements.query.value = '';
}

function fetchImgsAndBtn() {
  loadMoreBtn.disable();
  loadMoreBtn.removeEnd();

  pixaApiService.fetchImages().then(hits => {
    if (hits.length === 0) {
      loadMoreBtn.hide();
      return notifications.myError();
    }

    if (hits.length < 12) {
      loadMoreBtn.showEnd();
      appendImgsMarkup(hits);
      return;
    }

    appendImgsMarkup(hits);
    loadMoreBtn.enable();
    notifications.onSuccess();
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

  // window.scrollBy(0, 480);
}
