import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import path from 'path';

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/about', (req, res) => {
  res.send('gracias ~');
});

app.use((_req, _res, next) => {
  next(createError(404));
});

app.listen(3000, () => {
  console.log('app is listening on part 3000...');
});
