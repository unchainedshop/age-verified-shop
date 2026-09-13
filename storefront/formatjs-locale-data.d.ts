// formatjs locale-data entry points ship no type declarations; these are
// side-effect-only imports (they register locale data on the Intl polyfills).
declare module '@formatjs/intl-pluralrules/locale-data/*';
declare module '@formatjs/intl-numberformat/locale-data/*';
declare module '@formatjs/intl-datetimeformat/locale-data/*';
declare module '@formatjs/intl-relativetimeformat/locale-data/*';
