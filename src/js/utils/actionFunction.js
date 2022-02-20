import { dataApi } from './search';
import { refs } from '../refs/getRefs';
import cardTemplate from '../templates/card.hbs';

export const makeMarkup = hits => {
  refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(hits));
};

export const resetGallery = () => {
  refs.gallery.innerHTML = '';
};

export const pagesCount = () => {
  return Math.ceil(dataApi.totalHits / dataApi.request.params.per_page);
};

export const makeActiveButton = () => {
  pagesCount() < dataApi.page - 1
    ? refs.moreBtn.classList.add('is-hidden')
    : refs.moreBtn.classList.remove('is-hidden');
};

export const noMoreResource = () => {
  if (pagesCount() === dataApi.page - 1) {
    return endMessage();
  }
};
