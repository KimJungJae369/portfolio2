import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translation.json";
import translationKO from "./ko/translation.json";

const resources = {
  en: {
    translation: translationEN
  },
  ko: {
    translation: translationKO
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",  // 기본 언어 설정
    fallbackLng: "en", // 언어를 찾을 수 없을 때 사용할 언어
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;