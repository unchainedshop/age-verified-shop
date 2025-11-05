import { useIntl } from 'react-intl';

import MetaTags from '../modules/common/components/MetaTags';

const Conditions = () => {
  const intl = useIntl();

  return (
    <>
      <MetaTags
        title={intl.formatMessage({
          id: 'conditions',
          defaultMessage: 'Terms & Conditions',
        })}
      />
      <div>
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-20">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                Allgemeine Geschäftsbedingungen
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl">
                Gültig für Bestellungen bei Unchained Commerce GmbH
              </p>
            </div>

            {/* Demo-Shop Hinweis */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-2xl p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-yellow-600 dark:text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-yellow-900 dark:text-yellow-200 mb-3">
                    WICHTIGER HINWEIS: Demo-Shop
                  </h2>
                  <div className="space-y-2 text-lg text-yellow-900 dark:text-yellow-100">
                    <p className="font-semibold">
                      Bei diesem Online-Shop handelt es sich um einen reinen
                      Demonstrations-Shop der Unchained Commerce Plattform.
                    </p>
                    <p>
                      Es werden keine echten Produkte verkauft und keine realen
                      Transaktionen durchgeführt. Alle Bestellungen und
                      Zahlungen dienen ausschliesslich zu Demonstrationszwecken.
                    </p>
                    <p>
                      Für echte E-Commerce-Projekte kontaktieren Sie uns bitte
                      unter{' '}
                      <a
                        href="mailto:hello@unchained.shop"
                        className="underline font-semibold hover:text-yellow-800 dark:hover:text-yellow-300"
                      >
                        hello@unchained.shop
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="border-l-4 border-blue-500 pl-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Zweck des Demo-Shops
                </h2>
                <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                  <p>
                    Dieser Online-Shop dient ausschliesslich zur Demonstration
                    der technischen Möglichkeiten der Unchained Commerce
                    Plattform. Er zeigt beispielhaft, wie ein moderner
                    E-Commerce-Shop auf Basis unserer Headless Commerce Lösung
                    aussehen und funktionieren kann.
                  </p>
                  <p>
                    Die angezeigten Produkte, Preise und Funktionen sind rein
                    exemplarisch und dienen Demonstrationszwecken.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Keine realen Transaktionen
                </h2>
                <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                  <p>
                    Es werden keine echten Kaufverträge geschlossen und keine
                    realen Zahlungen verarbeitet. Alle im Bestellprozess
                    eingegebenen Daten werden ausschliesslich zu Testzwecken
                    verwendet und nicht für kommerzielle Zwecke genutzt.
                  </p>
                  <p>
                    Es erfolgt keine Lieferung von Produkten und es entstehen
                    keine Zahlungsverpflichtungen.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Verwendung von Test-Daten
                </h2>
                <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                  <p>
                    Bitte verwenden Sie beim Testen des Shops nur Test-Daten und
                    keine echten persönlichen Informationen oder Zahlungsdaten.
                    Die eingegebenen Daten werden gemäss unserer
                    Datenschutzerklärung behandelt.
                  </p>
                  <p>
                    Weitere Informationen zum Datenschutz finden Sie in unserer{' '}
                    <a
                      href="/privacy-policy"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Datenschutzerklärung
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Haftungsausschluss
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Die Unchained Commerce GmbH übernimmt keine Haftung für die
                  Vollständigkeit, Richtigkeit oder Aktualität der im Demo-Shop
                  dargestellten Informationen. Die Nutzung des Demo-Shops
                  erfolgt auf eigene Verantwortung.
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Kontakt
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

              <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center pt-8">
                Stand: September 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conditions;
