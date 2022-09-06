import Post from '../models/post.model.js';
import User from '../models/user.model.js';

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      console.log('Content is not sent with request');
      return res.sendStatus(400);
    }
    let post = await Post.create({
      content: content.trim(),
      postedBy: req.session.user
    });
    post = await User.populate(post, { path: 'postedBy'});
    return res.status(201).json({
      status: 'success',
      data: post
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
