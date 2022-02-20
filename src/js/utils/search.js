import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from '../refs/getRefs';
import { okMessage, wrongMessage, emptyMessage} from './serviceMessage';
import { makeMarkup, resetGallery, makeActiveButton, noMoreResource } from './actionFunction';
import DataApiService from '../api/API-service';
// import cardTemplate from '../templates/card.hbs';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'title',
  captionType: 'alt',
  captionDelay: 200,
  captionPosition: 'bottom',
});

export const dataApi = new DataApiService();
refs.moreBtn.classList.add('is-hidden');

const onSearch = e => {
  e.preventDefault();

  const { searchQuery } = e.target;

  searchQuery.value.trim();

  if (searchQuery.value === '') {
    return emptyMessage();
  }

  dataApi.query = searchQuery.value;
  dataApi.resetPage();

  dataApi
    .requestData()
    .then(data => {
      data.hits.length === 0 ? wrongMessage() : okMessage(data);
      return data.hits;
    })
    .then(hits => {
      resetGallery();

      makeMarkup(hits);

      makeActiveButton();

      lightbox.refresh();

      noMoreResource();
    });
};

function makeMoreVisible() {
  dataApi.requestData().then(data => {
    makeMarkup(data.hits);

    makeActiveButton();

    lightbox.refresh();

    noMoreResource();
  });
}



refs.input.addEventListener('submit', onSearch);
refs.moreBtn.addEventListener('click', makeMoreVisible);
