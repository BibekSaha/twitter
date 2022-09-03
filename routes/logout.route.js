import express from 'express';
import * as logoutController from '../controllers/logout.controller.js';

const router = express.Router();

router.route('/')
  .get(logoutController.logout);

export default router;
