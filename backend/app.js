/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const errHandler = require('./middlewares/errHandler');
const { validateLogin, validateUser } = require('./middlewares/validation');
const PageNotFound = require('./errors/PageNotFound');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use(cors({
  credentials: true,
  origin: [
    'https://localhost:3000',
    'http://localhost3000',
    'https://localhost:3001',
    'http://localhost3001',
    'https://artbash.nomoredomains.sbs',
    'http://artbash.nomoredomains.sbs',
    'https://api.artbash.nomoredomains.sbs',
    'http://api.artbash.nomoredomains.sbs',
    'https://web.postman.co',
  ],
}));

app.use(helmet());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);
app.use(auth);
app.use(usersRouter);
app.use(cardsRouter);
app.use(errorLogger);

app.use('/', (req, res, next) => {
  next(new PageNotFound('Страница не найдена'));
});
app.use(errors());
app.use(errHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
