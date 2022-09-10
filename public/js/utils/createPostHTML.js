import { getIdFromPostHTML } from "./getIdFromPostHTML.js";

export const createPostHTML = post => `
  <div class="post" data-id="${post._id}">
    <div class="mainContentContainer">
      <div class="userImageContainer">
        <img src="${post.postedBy.profilePic}" />
      </div>
      <div class="postContentContainer">
        <div class="header">
          <a href="/profile/${post.postedBy.username}" class="displayName">
            ${post.postedBy.firstName} ${post.postedBy.lastName}
          </a>
          <span class="username">@${post.postedBy.username}</span>•
          <span class="date">${timeDifference(new Date(), new Date(post.createdAt))}</span>
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
            <button class="likeButton" onclick="_likeButtonHandler(this)">
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

window._likeButtonHandler = async target => {
  const postId = getIdFromPostHTML(target);
  const post = await fetch(`/api/v1/posts/${postId}/like`, {
    method: 'PUT'
  });
  console.log(await post.json());
}

const timeDifference = (current, previous) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return "Just now";
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
};
