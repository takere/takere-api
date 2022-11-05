import LocaleService from '../../services/locale.service';

const localeService = new LocaleService();

export default [
  {
    "value": "1",
    "label": localeService.translate("VERY_LOW")
  },
  {
    "value": "2",
    "label": localeService.translate("LOW")
  },
  {
    "value": "3",
    "label": localeService.translate("MEDIUM")
  },
  {
    "value": "4",
    "label": localeService.translate("CRITICAL")
  },
  {
    "value": "5",
    "label": localeService.translate("VERY_CRITICAL")
  }
]
