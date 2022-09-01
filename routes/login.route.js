import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).render('login', {
    title: 'Login'
  });
})

export default router;
