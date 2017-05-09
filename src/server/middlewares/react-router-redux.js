/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import renderLayout from '../layout';
// import errorLayout from '../layout/error';
// import Error404 from '../../components/Error404';

export default function (config) {
  return (req, res, next) => {
    const routes = config.routes(res.locals.store);

    return match({ routes, location: req.url }, (error, redirectLocation, props) => {
      if (redirectLocation) {
        // Redirect 301 (permanently) vs 302 (temporarily)
        // http://stackoverflow.com/questions/1393280/http-redirect-301-permanent-vs-302-temporary
        // https://moz.com/learn/seo/redirection

        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        next(error);
      } else if (props) {
        const { store } = res.locals;
        const { components, params } = props;

        const parameters = {
          ...params,
        };

        // Take component to render
        const component = components[components.length - 1];

        // Dispatch necessary actions to build initial state
        const fetchData = () => Promise.resolve();
        // const fetchData = component.fetchData
        //   ? component.fetchData
        //   : () => Promise.resolve();

        fetchData(store.dispatch, parameters)
          .then(() => {
            const html = ReactDOMServer.renderToString(
              <Provider store={store}>
                <RouterContext {...props} />
              </Provider>,
            );

            const htmlTemplate = renderLayout(html, {
              initialState: store.getState(),
            });

            res.status(200).send(htmlTemplate);

            // const filepath = path.resolve(__dirname, '../../../dist/index.html');
            // fs.writeFile(filepath, htmlTemplate);
          })
          .catch((e) => {
            if (e.status === 401) {
              return res.redirect(req.path);
            }

            return next(e);
          });
      } else if (req.accepts('html')) {
        /*
        const html = ReactDOMServer.renderToString(
          <Provider>
            <Error404 />
          </Provider>,
        );
        res.status(404).type('text/html').send(
          errorLayout({
            title: 'Error 404',
            html,
          }),
        );*/
        res.status(404).type('txt').send('Not found');        
      } else {
        // Default to plain-text. send()
        res.status(404).type('txt').send('Not found');
      }
    });
  };
}
