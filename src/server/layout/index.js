import webAppHandler from './webapp-handler';
import { TITLE, SLUG } from '../../constants/app.js';

export default (html, initialData, initializer) => {
  const assets = require('../webpack-stats.json');

  const mainStyle = assets.style && assets.style[0];
  const mainScript = assets.script && assets.script[0];

  const thirdPartyScriptsHeader = [
    // '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min',
  ];
  const thirdPartyScriptsBody = [
    // '//platform.twitter.com/widgets'
  ];

  return (
  `<!doctype html>
    <html class="no-js">
      <head>
        <title>${TITLE}</title>
        <meta charset="utf-8">
        ${webAppHandler()}
        ${thirdPartyScriptsHeader
          .map(script => `<script src="${script}"></script>`)
          .join('\n')
        }
      </head>
      <body>
        <div id="${SLUG}">
          ${html}
        </div>
        <script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}</script>
        ${mainScript
          ? `<script src="${mainScript}"></script>`
          : ''
        }
        ${mainStyle
          ? `<link rel="stylesheet" href="${mainStyle}">`
          : ''
        }
        ${thirdPartyScriptsBody
          .map(script => `<script src="${script}"></script>`)
          .join('\n')
        }
        ${initializer ? initializer : ''}
        <script type="text/javascript">
          (function() {
            if('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/service-worker.js');
            }
          })();
        </script>
      </body>
    </html>`
  );
};
