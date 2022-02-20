import { Notify } from 'notiflix';


export const okMessage = (data) => {
  Notify.success(`Hooray! We found ${data.total} images.`);
};
export const wrongMessage = () => {
  Notify.failure(`Sorry, there are no images matching your search query. Please try again`);
};
export const emptyMessage = () => {
  Notify.failure(`There is nothing to search!`);
};
export const endMessage = () => {
  Notify.failure(`We're sorry, but you've reached the end of search results`);
};
