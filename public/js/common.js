import { createPostHTML } from './utils/createPostHTML.js';
import { prepend as postPrepend } from './utils/prepend.js';
import { postContainer } from './utils/domElements.js';

const textarea = document.getElementById('postTextArea');
const postButton = document.getElementById('submitPostButton');

textarea.addEventListener('keyup', (event) => {
  if (event.target.value.trim())
    postButton.disabled = false;
  else postButton.disabled = true;
});

postButton.addEventListener('click', async () => {
  try {
    const data = {
      content: textarea.value
    };
    const response = await fetch('/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const postHTML = createPostHTML((await response.json()).data);
    postPrepend(postHTML, postContainer);
    textarea.value = '';
    postButton.disabled = true;
  } catch (err) {
    console.error(err);
  }
});
