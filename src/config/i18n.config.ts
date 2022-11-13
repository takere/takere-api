/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import i18n from 'i18n';


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

export default i18n;