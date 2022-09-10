import { createPostHTML } from './utils/createPostHTML.js';
import { prepend as postPrepend } from './utils/prepend.js';
import { postContainer } from './utils/domElements.js';

document.addEventListener('DOMContentLoaded', async () => {
  postContainer.innerHTML = "";
  const response = await fetch('/api/v1/posts');
  const { data: posts } = await response.json();
  console.log(posts);
  if (!posts.length)
    postPrepend(`<p class="noResults">Nothing to show</p>`, postContainer);
  else {
    postContainer.innerHTML = '';
    posts.forEach(
      post => postPrepend(createPostHTML(post), postContainer)
    );
  }
});
