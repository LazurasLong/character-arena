import webAppHandler from './webapp-handler';
import { TITLE } from '../../constants/app.js';

export default (html, initialData) => {
  const assets = require('../webpack-stats.json');

  const mainStyle = assets.style && assets.style[0];
  const mainScript = assets.script && assets.script[0];

  const thirdPartyScriptsHeader = [
    // '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min',
  ];
  const thirdPartyScriptsBody = [
    // '//platform.twitter.com/widgets'
  ];

  return `
    <!doctype html>
    <html class="no-js">
      <head>
        ${TITLE}
        <meta charset="utf-8">
        ${webAppHandler()}

        ${thirdPartyScriptsHeader
          .map(script => `<script src="${script}"></script>`)
          .join('\n')
        }
        ${mainStyle
          ? `<link rel="stylesheet" href="${mainStyle}">`
          : ''
        }
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}
        </script>

        ${mainScript
          ? `<script src="${mainScript}"></script>`
          : ''
        }
        ${thirdPartyScriptsBody
          .map(script => `<script src="${script}"></script>`)
          .join('\n')
        }
      </body>
    </html>
  `;
};
