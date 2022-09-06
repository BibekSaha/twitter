export const prepend = (html, container) => {
  container.innerHTML = html + container.innerHTML;
}
