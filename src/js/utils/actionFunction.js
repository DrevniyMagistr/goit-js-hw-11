import { dataApi } from './search';
import { refs } from '../refs/getRefs';
import cardTemplate from '../templates/card.hbs';
import { endMessage } from './serviceMessage';

export const makeMarkup = hits => {
  refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(hits));
};

export const resetGallery = () => {
  refs.gallery.innerHTML = '';
};

const pagesCount = () => {
  return Math.ceil(dataApi.totalHits / dataApi.request.params.per_page);
};

export const makeActiveButton = () => {
  pagesCount() > dataApi.page - 1
    ? refs.moreBtn.classList.remove('is-hidden')
    : refs.moreBtn.classList.add('is-hidden');
};

export const noMoreResource = () => {
  if (pagesCount() === dataApi.page - 1) {
    return endMessage();
  }
};

export const onScroll = () => {
  const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const toggleBtnAction = () => {
  window.pageYOffset > 300
    ? refs.topBtn.classList.remove('is-hidden')
    : refs.topBtn.classList.add('is-hidden');
};

window.addEventListener('scroll', toggleBtnAction);

export const scrollToTop = () => {
  const el = document.documentElement;
  el.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
