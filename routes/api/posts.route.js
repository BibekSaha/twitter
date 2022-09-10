import express from 'express';
import * as postController from '../../controllers/post.controller.js';

const router = express.Router();

router
  .route('/')
  .get(postController.getPosts)
  .post(postController.createPost)

router
  .route('/:id/like')
  .put(postController.updateLike);

export default router;
