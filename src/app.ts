import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import expressHandlebars from 'express-handlebars';
import path from 'path';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// hint: https://github.com/express-handlebars/express-handlebars#extnamehandlebars
// .bhs must be setup in both [express-handlebars options] and [express view engine args]
const hbs = expressHandlebars.create({ helpers: {}, extname: '.hbs' });
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));

app.use('/about', (_req, res) => {
  res.render('index/about', { hi: 'hola ~' });
});

app.use((_req, _res, next) => {
  next(createError(404));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: createError.HttpError, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'some thing went wrong';

  res.status(status).render('index/error', { status, message, error: err });
});

app.listen(3000, () => {
  console.log('app is listening on part 3000...');
});
