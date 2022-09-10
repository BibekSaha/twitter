export const getIdFromPostHTML = element => {
  const isRoot = element.classList.contains('post');
  const rootElement = !isRoot ? element.closest('.post') : element;
  return rootElement.dataset.id;
};
