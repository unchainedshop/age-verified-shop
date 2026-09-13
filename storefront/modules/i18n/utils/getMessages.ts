import translations from '../../../i18n';

const getMessages = (locale) => {
  // Next 16 dropped Pages Router i18n routing, so router.locale can be
  // undefined; fall back to the former defaultLocale ('en').
  const language = (locale || 'en').split('-').shift();
  return translations[language];
};

export default getMessages;
