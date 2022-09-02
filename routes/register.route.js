import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    return res.status(200).render('register', {
      title: 'Register'
    });
  })
  .post(async (req, res) => {
    const payload = { ...req.body };
    try {
      const firstName = req.body.firstName?.trim();
      const lastName = req.body.lastName?.trim();
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      if (firstName && lastName && username && email && password) {
        const user = await User.findOne({ 
          $or: [
            { username },
            { email }
          ]
        });
        if (!user) {
          req.session.user = await User.create({
            firstName, lastName, email, username, password
          });
          return res.redirect('/');
        }
        if (user?.email === email)
          payload.errorMessage = 'Email already in use';
        else if (user?.username === username)
          payload.errorMessage = 'Username alreay in use';
      } else
        payload.errorMessage = 'Make sure each field has a valid value';
      return res.status(200).render('register', payload);
    } catch (err) {
      payload.errorMessage = 'Something went wrong. Please try again!';
      return res.status(200).render('register', payload);
    }
  });

export default router;
