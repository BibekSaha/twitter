import express from 'express';
import * as loginController from '../controllers/login.controller.js';

const router = express.Router();

router
  .route('/')
  .get(loginController.getLogin)
  .post(loginController.postLogin);

export default router;
