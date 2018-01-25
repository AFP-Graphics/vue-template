import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { dateTimeFormats } from '@/utils/dateTimeFormats'

// ****** Stories
// Define here the different languages
// const locales = {
//   'fr': import('../locales/fr.txt'),
//   'en': import('../locales/en.txt')
// }
import fr from '../locales/fr.txt'
import en from '../locales/en.txt'
const locales = {
  'fr': fr,
  'en': en
}
// ****** End Stories

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: locales,
  dateTimeFormats
})

export const loadedLocales = []

export function setI18nLanguage (lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync (lang) {
  if (!locales[lang]) return Promise.reject()
  if (!loadedLocales.includes(lang)) {
    // const messages = await locales[lang]
    const messages = locales[lang]
    i18n.setLocaleMessage(lang, messages)
    loadedLocales.push(lang)
    return setI18nLanguage(lang)
  }
  return setI18nLanguage(lang)
}