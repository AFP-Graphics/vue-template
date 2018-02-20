import Vue from 'vue'
import VueI18n from 'vue-i18n'
import dateTimeFormats from '@/utils/dateTimeFormats'
import numberFormats from '@/utils/numberFormats'
import locales from '@/locales'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: locales,
  dateTimeFormats,
  numberFormats
})

export const loadedLocales = []

export function setI18nLanguage (lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync (lang) {
  if (!locales[lang]) return Promise.reject(new Error('The chosen language is not available'))
  if (!loadedLocales.includes(lang)) {
    let messages
    try {
      messages = await locales[lang]
    } catch (e) {
      console.error(e) //eslint-disable-line no-console
      return Promise.reject(new Error('The chosen language cannot be loaded'))
    }
    i18n.setLocaleMessage(lang, messages)
    loadedLocales.push(lang)
    return setI18nLanguage(lang)
  }
  return setI18nLanguage(lang)
}