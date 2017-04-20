import * as fs from 'fs';
import express from 'express';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import bodyParser from 'body-parser';
import debug from 'debug';

import { SESSION_SECRET } from '../../.env.js';

// Application
import routes from '../routes';

// Custom middlewares
import reactRouterReduxMiddleware from './middlewares/react-router-redux';
import reduxStore from './middlewares/redux-store';

const app = express();

// To take post parameters
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Session
const sessionConf = {
  store:{
    type: 'file',
    file: {
      path: './.sessions',
      retries: 2,
    },
  },
};

const FileStore = sessionFileStore(session);
const store = new FileStore({ ...sessionConf.store.file });
app.use(
  session({
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// Serve static files if enabled
app.use('/', express.static('dist/'));

// Redux store. Set redux store into res.locals
app.use(reduxStore());

// Redux & React-Router Middleware
app.use(reactRouterReduxMiddleware({ routes }));

// Listen
app.listen(3000);

if (process.send) process.send('online');

debug('dev')('`server` listening on port %s', 3000);
