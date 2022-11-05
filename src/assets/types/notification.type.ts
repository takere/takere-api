import LocaleService from '../../services/locale.service';

const localeService = new LocaleService();

export default [
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