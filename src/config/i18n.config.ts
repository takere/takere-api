import i18n from 'i18n';
import path from 'path';

i18n.configure({

  locales: ['en'],
  defaultLocale: 'en',
  queryParameter: 'lang',
  directory: path.join('./', 'assets', 'locales'),

  api: {
    '__': 'translate',
    '__n': 'translateN'
  },

});

export = i18n;