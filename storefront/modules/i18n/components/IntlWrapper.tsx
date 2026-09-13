import React from 'react';
import { IntlProvider } from 'react-intl';

import '@formatjs/intl-pluralrules/polyfill.js';
import '@formatjs/intl-pluralrules/locale-data/de';
import '@formatjs/intl-pluralrules/locale-data/en';

import '@formatjs/intl-numberformat/polyfill.js';
import '@formatjs/intl-numberformat/locale-data/en';
import '@formatjs/intl-numberformat/locale-data/de';

import '@formatjs/intl-datetimeformat/polyfill.js';
import '@formatjs/intl-datetimeformat/locale-data/en';
import '@formatjs/intl-datetimeformat/locale-data/de';
import '@formatjs/intl-datetimeformat/add-all-tz.js';

import '@formatjs/intl-relativetimeformat/polyfill.js';
import '@formatjs/intl-relativetimeformat/locale-data/de';
import '@formatjs/intl-relativetimeformat/locale-data/en';

const IntlWrapper = ({ children, locale, messages }) => (
  <IntlProvider locale={locale} messages={messages} textComponent="span">
    {children}
  </IntlProvider>
);

export default IntlWrapper;
