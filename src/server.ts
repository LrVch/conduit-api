import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import express from 'express';
import * as http from 'http';
import createError from 'http-errors';
import methodOverride from 'method-override';
import morgan from 'morgan';
import config from './config';
import * as passport from './libs/passport';
import { IError } from './models';
import routes from './routes';

passport.init();

const isProduction = config.get('NODE_ENV') === 'production';

const app = express();

app.disable('x-powered-by');
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

if (!isProduction) {
  app.use(errorhandler());
}

app.use(routes);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404));
  }
);

if (!isProduction) {
  app.use(
    (
      err: IError,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);

      res.status(err.status || 500);

      res.json({
        errors: {
          message: err.message,
          error: err,
          stack: err.stack
        }
      });
    }
  );
}

app.use(
  (
    err: IError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: {}
      }
    });
  }
);

export default http.createServer(app);
