import { createI18n } from 'vue3-i18n'
import en from './translations/en.json'
import ar from './translations/ar.json'

const messages = {
    en: en,
    ar: ar,
};

export const i18n = createI18n({
    locale: 'en',
    messages: messages,
});
