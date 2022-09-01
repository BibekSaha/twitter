import path from 'path';
import express from 'express';
import * as middleware from './middleware.js';
import loginRouter from './routes/login.route.js';
import registerRouter from './routes/register.route.js';
import __dirname from './constants/__dirname.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.get('/', middleware.requireLogin, (req, res, next) => {
  const payload = {
    pageTitle: 'Home',

  };
  res.render('home', payload);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
