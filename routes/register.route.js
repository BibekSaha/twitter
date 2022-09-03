import express from 'express';
import * as registerController from '../controllers/register.controller.js';

const router = express.Router();

router
  .route('/')
  .get(registerController.getRegister)
  .post(registerController.postRegister);

export default router;
