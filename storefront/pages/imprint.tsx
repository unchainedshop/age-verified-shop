import { useIntl } from 'react-intl';

import MetaTags from '../modules/common/components/MetaTags';

const Imprint = () => {
  const intl = useIntl();

  return (
    <>
      <MetaTags
        title={intl.formatMessage({ id: 'imprint', defaultMessage: 'Imprint' })}
      />
      <div>
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-20">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                Impressum
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl">
                Alle rechtlichen Informationen zu unserem Shop auf einen Blick.
              </p>
            </div>

            <div className="space-y-16">
              {/* Verantwortlich für den Inhalt */}
              <div className="border-l-4 border-blue-500 pl-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Verantwortlich für den Inhalt dieser Website
                </h2>
                <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                  <p className="font-semibold text-2xl text-gray-900 dark:text-white">
                    Unchained Commerce GmbH
                  </p>
                  <a
                    href="https://g.page/Westhive_Coworking?share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <address className="not-italic">
                      Hardturmstrasse 161
                      <br />
                      CH-8005 Zürich
                    </address>
                  </a>
                  <div className="pt-2 space-y-1">
                    <a
                      href="tel:+41435051846"
                      className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      +41 43 505 18 46
                    </a>
                    <a
                      href="mailto:hello@unchained.shop"
                      className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      hello@unchained.shop
                    </a>
                  </div>
                </div>
              </div>

              {/* Grid für 2 kleinere Sections */}
              <div className="grid md:grid-cols-2 gap-12">
                {/* Zeichnungsberechtigte Personen */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Zeichnungsberechtigte Personen
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Pascal Kaufmann, Vedran Rudelj
                  </p>
                </div>

                {/* Mehrwertsteuernummer */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Mehrwertsteuernummer
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    CHE-244.383.397 MWST
                  </p>
                </div>
              </div>

              {/* Handelsregistereintrag */}
              <div className="border-l-4 border-purple-500 pl-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Handelsregistereintrag
                </h2>
                <div className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Firmenname:</span> Unchained
                    Commerce GmbH
                  </p>
                  <p>
                    <span className="font-medium">Nummer:</span>{' '}
                    CH-020-4058261-7 (Standort Zürich, Hauptsitz)
                  </p>
                </div>
              </div>

              {/* Design & Entwicklung */}
              <div className=" text-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Design & Entwicklung der Website
                </h2>
                <p className="text-xl dark:text-gray-300">
                  Unchained Commerce GmbH
                </p>
                <a
                  href="https://unchained.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  www.unchained.shop
                </a>
              </div>

              {/* Haftungsausschluss */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Haftungsausschluss
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Die Unchained Commerce GmbH schliesst jegliche Haftung für
                  sämtliche Schäden aus, die sich aus der Benutzung der
                  Unchained Commerce GmbH Webseite ergeben sollten. Links auf
                  der Unchained Commerce GmbH Webseite können zu Webseiten
                  Dritter führen, für deren Inhalt und Rechtmässigkeit Unchained
                  Commerce GmbH keine Verantwortung übernimmt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Imprint;
