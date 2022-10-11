import LocaleService = require('../../services/locale.service');

const localeService = new LocaleService();

module.exports = [
  {
    "value": "number",
    "label": localeService.translate("NUMBER")
  },
  {
    "value": "text",
    "label": localeService.translate("SINGLE_LINE_TEXT")
  },
  {
    "value": "checkbox",
    "label": localeService.translate("CHECKBOX")
  },
  {
    "value": "radio",
    "label": localeService.translate("RADIO")
  },
  {
    "value": "select",
    "label": localeService.translate("SELECT")
  },
  {
    "value": "text-area",
    "label": localeService.translate("MULTIPLE_LINE_TEXT")
  }
]
