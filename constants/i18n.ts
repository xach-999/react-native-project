import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import ru from "../locales/ru.json";
import am from "../locales/am.json";

export const LanguageResources = {
  en: { translation: en },
  ru: { translation: ru },
  am: { translation: am },
};

i18n.use(initReactI18next).init({
  resources: LanguageResources,
  compatibilityJSON: "v3",
  lng: "en",
  fallbackLng: "en",
});

export default i18n;