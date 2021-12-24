import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationVi from './vi.js'
import translationEn from './en.js'
i18n.use(initReactI18next).init({
  debug: true,
  lng: 'vi',
  supportedLngs: ['vi', 'en'],
  fallbackLng: 'vi', // use en if detected lng is not available
  keySeparator: false, // we do not use keys in form messages.welcome
  resources: {
    vi: {
      translations: translationVi,
    },
    en: {
      translations: translationEn,
    },
  },
  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',
})

export default i18n
