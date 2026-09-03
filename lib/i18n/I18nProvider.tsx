"use client";

import { useMemo, useEffect } from "react";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { Locale, defaultLocale } from "./config";

import idCommon from "./locales/id/common.json";
import idAbout from "./locales/id/about.json";
import idSchedule from "./locales/id/schedule.json";
import idCommunity from "./locales/id/community.json";
import idNews from "./locales/id/news.json";
import idDisclaimer from "./locales/id/disclaimer.json";

import enCommon from "./locales/en/common.json";
import enAbout from "./locales/en/about.json";
import enSchedule from "./locales/en/schedule.json";
import enCommunity from "./locales/en/community.json";
import enNews from "./locales/en/news.json";
import enDisclaimer from "./locales/en/disclaimer.json";

const resources = {
  id: {
    common: idCommon,
    about: idAbout,
    schedule: idSchedule,
    community: idCommunity,
    news: idNews,
    disclaimer: idDisclaimer,
  },
  en: {
    common: enCommon,
    about: enAbout,
    schedule: enSchedule,
    community: enCommunity,
    news: enNews,
    disclaimer: enDisclaimer,
  },
};

export function createI18nInstance(locale: Locale) {
  const i18nInstance = i18next.createInstance();
  i18nInstance.use(initReactI18next).init({
    lng: locale,
    fallbackLng: defaultLocale,
    resources,
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
  return i18nInstance;
}

interface I18nProviderProps {
  children: React.ReactNode;
  locale: Locale;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  const i18n = useMemo(() => createI18nInstance(locale), [locale]);

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [i18n, locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
