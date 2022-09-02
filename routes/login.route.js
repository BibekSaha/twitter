import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    return res.status(200).render('login', {
      title: 'Login'
    });
  })
  .post(async (req, res) => {
    try {
      if (req.body.logUsername && req.body.logPassword) {
        const user = await User.findOne({
          $or: [
            { username: req.body.logUsername },
            { email: req.body.logUsername }
          ]
        });
        if (user && await user.checkPassword(req.body.logPassword)) {
          req.session.user = user;
          return res.redirect('/');
        }
      }
      return res.status(200).render('login', {
        logUsername: req.body.logUsername,
        errorMessage: 'Incorrect email / password'
      });
    } catch (err) {
      return res.status(200).render('login', {
        logUsername: req.body.logUsername,
        errorMessage: 'Something went wrong. Please try again!'
      })
    }
  });

export default router;
