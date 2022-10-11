import LocaleService = require('../../services/locale.service');

const localeService = new LocaleService();

module.exports = [
    {
      "value": "popup",
      "label": localeService.translate("POPUP_MESSAGE")
    },
    {
      "value": "email",
      "label": localeService.translate("EMAIL_MESSAGE")
    },
    {
      "value": "text",
      "label": localeService.translate("TEXT_MESSAGE")
    },
    {
      "value": "alarm",
      "label": localeService.translate("ALARM")
    }
  ]