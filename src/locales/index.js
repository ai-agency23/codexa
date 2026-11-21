import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';

export const locales = { en, fr, ar };
export const supportedLanguages = ['en', 'ar', 'fr'];
export const directionForLanguage = (language) => (language === 'ar' ? 'rtl' : 'ltr');
