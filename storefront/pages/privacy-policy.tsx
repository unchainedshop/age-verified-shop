import { useIntl } from 'react-intl';

import MetaTags from '../modules/common/components/MetaTags';

const Privacy = () => {
  const intl = useIntl();

  return (
    <>
      <MetaTags
        title={intl.formatMessage({
          id: 'privacy',
          defaultMessage: 'Privacy Policy',
        })}
      />
      <div>
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-20">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                Datenschutzerklärung
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl">
                Demo-Shop der Unchained Commerce GmbH
              </p>
            </div>

            {/* Demo-Shop Hinweis */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-400 dark:border-blue-600 rounded-2xl p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-blue-600 dark:text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-200 mb-3">
                    Information: Demo-Shop ohne Datenerhebung
                  </h2>
                  <p className="text-lg text-blue-900 dark:text-blue-100 font-semibold">
                    Dieser Shop ist eine reine Demonstration. Es werden keine
                    personenbezogenen Daten erhoben, gespeichert oder
                    verarbeitet. Es werden auch keine Cookies verwendet.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="border-l-4 border-blue-500 pl-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Verantwortliche Stelle
                </h2>
                <div className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
                  <p className="font-semibold">Unchained Commerce GmbH</p>
                  <p>Hardturmstrasse 161</p>
                  <p>CH-8005 Zürich</p>
                  <p className="pt-2">
                    E-Mail:{' '}
                    <a
                      href="mailto:hello@unchained.shop"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      hello@unchained.shop
                    </a>
                  </p>
                  <p>Telefon: +41 43 505 18 46</p>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Keine Datenerhebung
                </h2>
                <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                  <p>
                    Da es sich um einen reinen Demo-Shop handelt, werden{' '}
                    <strong>keine personenbezogenen Daten</strong> erhoben,
                    gespeichert oder verarbeitet. Dies umfasst:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Keine Speicherung von IP-Adressen</li>
                    <li>Keine Erfassung von Zugriffsdaten oder Logs</li>
                    <li>
                      Keine Erhebung von Namen, Adressen oder Kontaktdaten
                    </li>
                    <li>Keine Verarbeitung von Zahlungsinformationen</li>
                    <li>
                      Keine Verwendung von Tracking-Tools oder Analysediensten
                    </li>
                  </ul>
                  <p className="mt-4">
                    Alle im Demo-Bestellprozess eingegebenen Daten dienen
                    ausschliesslich der Demonstration und werden nicht dauerhaft
                    gespeichert.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Keine Cookies
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Diese Website verwendet <strong>keine Cookies</strong> zur
                  Speicherung von Informationen auf Ihrem Gerät. Es werden keine
                  Marketing-Cookies, Analyse-Cookies oder sonstige
                  Tracking-Mechanismen eingesetzt.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Keine Weitergabe an Dritte
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Da keine Daten erhoben werden, erfolgt auch keine Weitergabe
                  von Daten an Dritte.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Zweck des Demo-Shops
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Dieser Shop dient ausschliesslich der Demonstration der
                  technischen Möglichkeiten der Unchained Commerce Plattform. Er
                  zeigt, wie ein moderner E-Commerce-Shop auf Basis unserer
                  Headless Commerce Lösung funktioniert – ohne dabei echte Daten
                  zu erheben oder zu speichern.
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Kontakt Datenschutz
                </h2>
                <div className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
                  <p>
                    Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter:
                  </p>
                  <p className="font-semibold">Unchained Commerce GmbH</p>
                  <p>Hardturmstrasse 161</p>
                  <p>CH-8005 Zürich</p>
                  <p className="pt-2">
                    E-Mail:{' '}
                    <a
                      href="mailto:hello@unchained.shop"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      hello@unchained.shop
                    </a>
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center pt-8">
                Stand: Januar 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
