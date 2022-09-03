const textarea = document.getElementById('postTextArea');
const postButton = document.getElementById('submitPostButton');
textarea.addEventListener('keyup', (event) => {
  if (event.target.value.trim())
    postButton.disabled = false;
  else postButton.disabled = true;
});
