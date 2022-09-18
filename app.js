require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');
const { MONGO_CONNECTION } = require('./config');

const app = express();
const PORT = 3000;

mongoose.connect(MONGO_CONNECTION, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(bodyParser.json());

app.use(requestLogger);

app.use(require('./middlewares/cors'));

app.use(require('./routes'));

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(require('./middlewares/errors'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
