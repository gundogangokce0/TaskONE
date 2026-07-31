import { ref, computed } from 'vue'
import { en } from './en'
import { tr } from './tr'

export type Language = 'en' | 'tr'

const savedLang = (localStorage.getItem('app_lang') as Language) || 'en'
export const currentLang = ref<Language>(savedLang)

export const setLanguage = (lang: Language) => {
  currentLang.value = lang
  localStorage.setItem('app_lang', lang)
}

export const t = computed(() => {
  return currentLang.value === 'tr' ? tr : en
})
