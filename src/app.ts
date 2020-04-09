import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import expressHandlebars from 'express-handlebars';
import path from 'path';

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, './views'));
const hbs = expressHandlebars.create({
  helpers: {},
  extname: '.hbs'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/about', (_req, res) => {
  res.render('about', { hi: 'hola ~' });
});

app.use((_req, _res, next) => {
  next(createError(404));
});

app.listen(3000, () => {
  console.log('app is listening on part 3000...');
});
