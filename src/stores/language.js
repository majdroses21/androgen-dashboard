import { defineStore } from 'pinia'

export const useLangStore = defineStore('language', {
    state: () => {
        return {language: 'en'};
    },
    actions: {
        setLanguage(lang){
            this.language = lang;
        },
    },
})
  