import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from '../refs/getRefs';
import { message } from '../refs/message';
import DataApiService from '../api/API-service';
import cardTemplate from '../templates/card.hbs';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionType: 'alt',
  captionDelay: 200,
  captionPosition: 'bottom',
});

const dataApi = new DataApiService();

function onSearch(e) {
  e.preventDefault();

  const { searchQuery } = e.target;

  searchQuery.value.trim();

  if (searchQuery.value === '') {
    return Notify.failure(message.empty);
  }

  dataApi.query = searchQuery.value;
  dataApi.resetPage();

  dataApi
    .requestData()
    .then(data => {
      const ok = `Hooray! We found ${dataApi.hits} images.`;

      data.hits.length === 0 ? Notify.failure(message.wrong) : Notify.success(ok);

      return data.hits;
    })
    .then(hits => {
      resetGallery();

      makeMarkup(hits);

      makeActiveButton();

      lightbox.refresh();

      noMoreResource();
    });
}

function makeMoreVisible() {
  dataApi.requestData().then(data => {
    makeMarkup(data.hits);
    makeActiveButton();
    lightbox.refresh();
    noMoreResource();
  });
}

function makeMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(hits));
}

function resetGallery() {
  refs.gallery.innerHTML = '';
}

function makeActiveButton() {
  pagesCount() > dataApi.page - 1
    ? refs.moreBtn.classList.add('is-visible')
    : refs.moreBtn.classList.remove('is-visible');
}

function pagesCount() {
  return Math.ceil(dataApi.totalHits / dataApi.request.params.per_page);
}

function noMoreResource() {
  if (pagesCount() === dataApi.page - 1) {
    return Notify.failure(message.end);
  }
}

refs.input.addEventListener('submit', onSearch);
refs.moreBtn.addEventListener('click', makeMoreVisible);
