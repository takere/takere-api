import LocaleService from '../../services/locale.service';

const localeService = new LocaleService();

export default [
  {
    "value": "daily",
    "label": localeService.translate("DAILY")
  },
  {
    "value": "onlyOnce",
    "label": localeService.translate("ONLY_ONCE")
  },
  {
    "value": "everyHours",
    "label": localeService.translate("EVERY_X_HOURS"),
    "request_input": "number"
  },
  {
    "value": "everyDays",
    "label": localeService.translate("EVERY_X_DAYS"),
    "request_input": "number"
  }
]
