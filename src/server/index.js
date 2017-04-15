import * as fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import debug from 'debug';

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

// Serve static files if enabled
app.use('/assets', express.static('/assets'));

// Redux store. Set redux store into res.locals
app.use(reduxStore());

// Redux & React-Router Middleware
app.use(reactRouterReduxMiddleware({ routes }));

// Listen
app.listen(3000);

if (process.send) process.send('online');

debug('dev')('`server` listening on port %s', 3000);
