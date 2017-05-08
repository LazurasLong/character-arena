# Character Arena
Character Arena is a small webapp to compare your World of Warcraft character with other characters, so you can know what attributes, stats or talents you should change to get a better performance of your character.

[Character Arena](https://www.characterarena.com)

## Technical info
Character Arena is using an updated stack to create a modern and responsive webapp, allowing the user to run it on any device, minimizing resources needed. Main technologies used are:
* React
* React Router
* Redux
* React Redux
* Yarn
* Webpack
* Sass
* Babel

### Instalation instructions
Development and production server are running under express webserver, so you'll need to install yarn to run them.
You'll also need to create a `.env.js` file on the root directory, where you should export `API_KEY` (You can get an API key from [Battle.net Developers' site](https://dev.battle.net)).

Once you have yarn installed, install dependencies by running:
```
yarn
```

To execute dev server, just execute:
* TODO: To avoid infinite reloading, you'll need to set `false` the conditional on `src/utils/image-loader.js`. This will disable image loadings.
```
yarn start
```

To execute production server, execute:
* TODO: To enable image loading, you'll need to set `true` the conditional on `src/utils/image-loader.js`. 
```
yarn serve:dist
```
