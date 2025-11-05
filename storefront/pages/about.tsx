import { useIntl } from 'react-intl';

import MetaTags from '../modules/common/components/MetaTags';

const AboutPage = () => {
  const intl = useIntl();

  return (
    <>
      <MetaTags
        title={intl.formatMessage({ id: 'about', defaultMessage: 'About' })}
      />

      <div>
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-20">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                Über uns
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl">
                Unchained Commerce – Headless E-Commerce Plattform für moderne Online-Shops
              </p>
            </div>

            <div className="space-y-16">
              <div className="border-l-4 border-blue-500 pl-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Wer wir sind
                </h2>
                <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                  <p>
                    Unchained Commerce GmbH ist ein Schweizer Software-Unternehmen mit Sitz in Zürich.
                    Wir entwickeln moderne E-Commerce-Lösungen auf Basis unserer Open-Source Headless Commerce Plattform.
                  </p>
                  <p>
                    Unsere Mission ist es, Online-Händlern maximale Flexibilität und Unabhängigkeit zu bieten.
                    Mit unserem API-first Ansatz ermöglichen wir es Unternehmen, individuelle Shopping-Erlebnisse
                    zu schaffen – ohne an proprietäre Systeme gebunden zu sein.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Unsere Technologie
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Die Unchained Engine ist eine flexible, modulare E-Commerce-Plattform,
                    die auf modernen Web-Technologien basiert. GraphQL API, Microservices-Architektur
                    und vollständige Anpassbarkeit stehen im Zentrum unserer Lösung.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Open Source
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Wir glauben an offene Technologie. Unsere Plattform ist Open Source und wird
                    aktiv von einer wachsenden Community weiterentwickelt. Transparenz und
                    Zusammenarbeit sind Teil unserer DNA.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Unser Ansatz
                </h2>
                <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                  <p>
                    Wir verstehen, dass jedes E-Commerce-Projekt einzigartig ist. Deshalb bieten wir
                    keine One-Size-Fits-All-Lösung, sondern eine flexible Plattform, die sich an
                    Ihre spezifischen Anforderungen anpasst.
                  </p>
                  <p>
                    Von der ersten Beratung bis zur erfolgreichen Umsetzung begleiten wir unsere
                    Kunden mit Expertise und Engagement. Dabei setzen wir auf agile Methoden und
                    enge Zusammenarbeit.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Kontakt
                </h2>
                <div className="space-y-2 text-xl text-gray-700 dark:text-gray-300">
                  <p>Unchained Commerce GmbH</p>
                  <p>Hardturmstrasse 161</p>
                  <p>CH-8005 Zürich</p>
                  <div className="pt-4">
                    <a
                      href="mailto:hello@unchained.shop"
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      hello@unchained.shop
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://unchained.shop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      www.unchained.shop
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
