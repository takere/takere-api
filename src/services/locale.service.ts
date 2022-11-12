/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import I18nConfig from '../config/i18n.config';


/**
 * Responsible for providing translations according to some language.
 */
class LocaleService {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private i18nProvider: any;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.i18nProvider = I18nConfig;
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  /**
   * Translates a text according to the language set.
   * 
   * @param      text Text to translate
   * @param      args Extra parameters (text must contain '%s' indicating
   * a parameter placeholder)
   * 
   * @returns    {string} Translated text
   */
  translate(string: any, args = undefined): string {
    return this.i18nProvider.__(string, args)

  }


  // --------------------------------------------------------------------------
  //         Getters & Setters
  // --------------------------------------------------------------------------
  /**
   * Get current locale.
   * 
   * @returns    {string} The current locale code
   */
   getCurrentLocale(): string {
    return this.i18nProvider.getLocale();
  }

  /**
   * Get all available locales.
   * 
   * @returns    {string[]} The list of available locale codes
   */
  getLocales(): string[] {
    return this.i18nProvider.getLocales();
  }

  /**
   * Changes current locale.
   * 
   * @param      locale The locale to set. Must be from the list of available 
   * locales.
   */
  setLocale(locale: any): void {

    if (this.getLocales().indexOf(locale) !== -1) {
      this.i18nProvider.setLocale(locale)
    }

  }
}

export default LocaleService