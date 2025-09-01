import useRequestAgeVerification from '../../auth/hooks/useRequestAgeVerification';
import useQRCodeGenerator from 'react-hook-qrcode-svg';
import Loading from '../../common/components/Loading';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useUser from '../../auth/hooks/useUser';
import useLoginAsGuest from '../../auth/hooks/useLoginAsGuest';
import useCheckAgeVerification from '../../auth/hooks/useCheckAgeVerification';

const QRCODE_SIZE = 280;
const QRCODE_LEVEL = 'Q';
const QRCODE_BORDER = 4;

export default function AgeVerification() {
  const [isMobile, setMobile] = useState(undefined);
  const { user, loading, refetch } = useUser();
  const { checkAgeVerification } = useCheckAgeVerification();
  const { verificationRequest, reset } = useRequestAgeVerification({
    skip: !user?._id,
  });
  const { loginAsGuest, called } = useLoginAsGuest();

  const userId = user?._id;

  useEffect(() => {
    let timeout;
    if (!userId && !loading) {
      if (!called) {
        loginAsGuest();
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [loading, userId]); // DO NOT include the mutation functions

  useEffect(() => {
    if (verificationRequest?.state === 'SUCCESS' && !loading) {
      refetch();
    }
  }, [verificationRequest, refetch, loading]);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)
    ) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  const { path, viewBox } = useQRCodeGenerator(
    verificationRequest?.verificationDeepLink,
    QRCODE_LEVEL,
    QRCODE_BORDER,
  );

  const check = () => {
    checkAgeVerification(verificationRequest?._id);
  };

  if (isMobile === undefined) return <Loading />;

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Bitte Alter bestätigen
          </h2>
        </div>

        {verificationRequest ? (
          <div className="space-y-6">
            {verificationRequest?.state === 'FAILED' ? (
              <div className="text-center space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-red-800 dark:text-red-300">
                    Die Verifikation ist fehlgeschlagen
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  Erneut versuchen
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {isMobile ? (
                  <div className="text-center space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Verwende die Swiyu App, um deine Beta ID vorzuweisen
                    </p>
                    <a
                      className="inline-flex w-full justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      href={verificationRequest.verificationDeepLink}
                    >
                      Mit Swiyu verifizieren
                    </a>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <h3 className="text-gray-400">
                      Mit der offiziellen swiyu-App der Schweizer Regierung den
                      QR-Code scannen und dein Alter bestätigen um fortzufahren.
                    </h3>
                    <button
                      onClick={check}
                      className="inline-block p-6 border border-slate-200 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200"
                    >
                      <svg
                        width={QRCODE_SIZE}
                        height={QRCODE_SIZE}
                        viewBox={viewBox}
                        stroke="none"
                      >
                        <rect width="100%" height="100%" fill="#ffffff" />
                        <path d={path} fill="#000000" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 space-y-6">
          <Image
            src="https://prod-eidch-hcms-sdweb.imgix.net/2025/02/19/e5c89823-7449-4e53-a36f-93959989b445.png?auto=format"
            alt="Swiyu Logo"
            width={60}
            height={60}
            className="rounded-lg mx-auto shadow-md"
          />

          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Lade die Swiyu App herunter
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="https://apps.apple.com/ch/app/swiyu/id6737259614"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <Image
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  priority
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=ch.admin.foitt.swiyu&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <Image
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  width={176}
                  height={48}
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
