import i18n from 'i18n';
import path from 'path';

i18n.configure({

  locales: ['en'],
  defaultLocale: 'en',
  queryParameter: 'lang',
  directory: __dirname + '/../assets/locales',

  api: {
    '__': 'translate',
    '__n': 'translateN'
  },

});

module.exports = i18n;