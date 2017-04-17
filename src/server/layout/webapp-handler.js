import { TITLE, DESCRIPTION, COLOR } from '../../constants/app.js';;

// This is intended to setup meta tags to support web applications
const getMetas = () => {

  const webAppMetas = [
    // Standard stuff
    { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
    { name: 'application-name', content: TITLE }, // Default name when adding to homescreen
    { name: 'mobile-web-app-capable', content: 'yes' },

    // iOS stuff
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-title', content: TITLE }, // Default name when adding to homescreen

    // Chrome stuff
    { name: 'theme-color', content: COLOR }, // Changes browser UI color

    // Microsoft stuff
    { name: 'msapplication-TileColor', content: COLOR }, // Set tile's background color, the same than icon
    // {
    //   name: 'msapplication-TileImage',
    //   content: require('../images/favicons/mstile-144x144.png'),
    // },
  ];

  // Create valid strings
  const webAppMetasString = webAppMetas
    .map(meta => `<meta name="${meta.name}" content="${meta.content}"/>`)
    .join('\n');

  return webAppMetasString;
};

// This is intended to setup different icons to support different OS web applications
const getLinks = () => {
  const webAppLinks = [
    // // Standard icons
    // { rel: 'shorcut icon', type: 'image/x-icon', href: `/favicon.ico?v=${Math.random()}` },

    // // iOS icons
    // // https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
    // {
    //   rel: 'apple-touch-icon',
    //   href: require('../images/favicons/apple-touch-icon.png')
    // }, // App Store defalt
    // {
    //   rel: 'apple-touch-icon',
    //   size: '180x180',
    //   href: require('../images/favicons/apple-touch-icon-180x180.png'),
    // }, // iPhone retina
    // {
    //   rel: 'apple-touch-icon',
    //   size: '167x167',
    //   href: require('../images/favicons/apple-touch-icon-167x167.png'),
    // }, // iPad retina
    // {
    //   rel: 'apple-touch-icon',
    //   size: '152x152',
    //   href: require('../images/favicons/apple-touch-icon-152x152.png'),
    // }, // iPad
    // {
    //   rel: 'apple-touch-icon',
    //   size: '120x120',
    //   href: require('../images/favicons/apple-touch-icon-120x120.png'),
    // }, // iPhone
    // {
    //   rel: 'apple-touch-icon',
    //   size: '76x76',
    //   href: require('../images/favicons/apple-touch-icon-76x76.png'),
    // }, // Legacy iPhones

    // // Chrome icons
    // // https://developer.chrome.com/multidevice/android/installtohomescreen
    // {
    //   rel: 'icon',
    //   size: '192x192',
    //   type: 'image/png',
    //   href: require('../images/favicons/android-chrome-192x192.png'),
    // }, // recommended
    // {
    //   rel: 'icon',
    //   size: '128x128',
    //   type: 'image/png',
    //   href: require('../images/favicons/android-chrome-128x128.png'),
    // }, // standard

    // // Android icons
    // // https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html
    // {
    //   rel: 'icon',
    //   size: '96x96',
    //   type: 'image/png',
    //   href: require('../images/favicons/favicon-96x96.png'),
    // }, // xhdpi
    // {
    //   rel: 'icon',
    //   size: '72x72',
    //   type: 'image/png',
    //   href: require('../images/favicons/favicon-72x72.png'),
    // }, // hdpi
    // {
    //   rel: 'icon',
    //   size: '48x48',
    //   type: 'image/png',
    //   href: require('../images/favicons/favicon-48x48.png'),
    // }, // mdpi
    // {
    //   rel: 'icon',
    //   size: '36x36',
    //   type: 'image/png',
    //   href: require('../images/favicons/favicon-36x36.png'),
    // }, // ldpi
  ];

  // Create valid strings
  const webAppLinksString = webAppLinks
    .map((link) => {
      const size = link.size ? `sizes="${link.size}"` : '';
      const type = link.type ? `type="${link.type}"` : '';

      return `<link rel="${link.rel}" href="${link.href}" ${size} ${type}/>`;
    })
    .join('\n');

  return webAppLinksString;
};

const webAppHandler = () => getMetas() + getLinks();

export default webAppHandler;
