import path from 'path';
import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import * as middleware from './middlewares/requireLogin.middleware.js';
import loginRouter from './routes/login.route.js';
import registerRouter from './routes/register.route.js';
import logoutRouter from './routes/logout.route.js';
import __dirname from './constants/__dirname.js';

dotenv.config();

const app = express();

// Setting the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Setting up the middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Setting up for session
app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Setting up the route handlers
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);

app.get('/', middleware.requireLogin, (req, res, next) => {
  // const name = req.session?.user.username;
  return res.render('home', {
    title: 'Home' 
  });
});

// 404 - Not Found
app.all('*', (req, res, next) => {
  return res.render('404', {
    pageTtile: 'Page Not Found'
  });
});

export default app;
