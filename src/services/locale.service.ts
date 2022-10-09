class LocaleService {
  i18nProvider: any;

  /**
   *
   * @param i18nProvider The i18n provider
   */

  constructor() {
    this.i18nProvider = require('../config/i18n.config');
  }

  /**
   *
   * @returns {string} The current locale code
   */

  getCurrentLocale() {
    return this.i18nProvider.getLocale();
  }

  /**
   *
   * @returns string[] The list of available locale codes
   */

  getLocales() {
    return this.i18nProvider.getLocales();
  }

  /**
   *
   * @param locale The locale to set. Must be from the list of available locales.
   */

  setLocale(locale: any) {

    if (this.getLocales().indexOf(locale) !== -1) {
      this.i18nProvider.setLocale(locale)
    }

  }

  /**
   *
   * @param string String to translate
   * @param args Extra parameters
   * @returns {string} Translated string
 
   */

  translate(string: any, args = undefined) {

    return this.i18nProvider.translate(string, args)

  }

  /**
   *
   * @param phrase Object to translate
   * @param count The plural number
   * @returns {string} Translated string
   */

  translatePlurals(phrase: any, count: any) {
    return this.i18nProvider.translateN(phrase, count)
  }
}

export = LocaleService