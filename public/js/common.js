const textarea = document.getElementById('postTextArea');
const postButton = document.getElementById('submitPostButton');
const postContainer = document.querySelector('.postContainer');

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
    postPrepend(postHTML);
    textarea.value = '';
    postButton.disabled = true;
  } catch (err) {
    console.error(err);
  }
});

const postPrepend = postHTML => {
  postContainer.innerHTML = postHTML + postContainer.innerHTML;
}

const createPostHTML = post => `
  <div class="post">
    <div class="mainContentContainer">
      <div class="userImageContainer">
        <img src="${post.postedBy.profilePic}" />
      </div>
      <div class="postContentContainer">
        <div class="header">
          <a href="/profile/${post.postedBy.username}" class="displayName">
            ${post.postedBy.firstName} ${post.postedBy.lastName}
          </a>
          <span class="username">@${post.postedBy.username}</span>
          <span class="date">${post.createdAt}</span>
        </div>
        <div class="postBody">
          <span>${post.content}</span>
        </div>
        <div class="postFooter">
          <div class="postButtonContainer">
            <button>
              <i class="far fa-comment"></i>
            </button>
          </div>

          <div class="postButtonContainer">
            <button>
              <i class="fas fa-retweet"></i>
            </button>
          </div>

          <div class="postButtonContainer">
            <button>
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
