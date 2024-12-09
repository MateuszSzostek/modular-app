import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import Backend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "en",
    fallbackLng: "en", // use et if detected lng is not available
    debug: true,

    // backend: {
    //     // for all available options read the backend's repository readme file
    //     loadPath: '/locales/{{lng}}/{{ns}}.json'
    // },

    react: {
      useSuspense: true,
    },
    preload: ["en", "nl", "pl", "de"],
    initImmediate: true,
  })

export default i18n
