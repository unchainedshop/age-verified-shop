'use client';
import useQRCodeGenerator from 'react-hook-qrcode-svg';
import { useIntl } from 'react-intl';
import Loading from '../../common/components/Loading';
import Image from 'next/image';
import Link from 'next/link';
import useCheckAgeVerification from '../../auth/hooks/useCheckAgeVerification';
import Portal from '../../common/components/Portal';

const QRCODE_SIZE = 280;
const QRCODE_LEVEL = 'Q';
const QRCODE_BORDER = 4;

export default function AgeVerificationModal({ verificationRequest, onReset }) {
  const { formatMessage } = useIntl();
  const { checkAgeVerification } = useCheckAgeVerification();

  const { path, viewBox } = useQRCodeGenerator(
    verificationRequest?.verificationDeepLink,
    QRCODE_LEVEL,
    QRCODE_BORDER,
  );

  const check = () => {
    checkAgeVerification(verificationRequest?._id);
  };

  return (
    <Portal>
      <div
        className="relative z-[2000]"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-10 bg-white bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="text-center mt-10">
            <h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              {formatMessage({
                id: 'age_verification_modal_title',
                defaultMessage: 'Please confirm your age',
              })}
            </h2>
          </div>

          {verificationRequest ? (
            <div className="space-y-6">
              {verificationRequest?.state === 'FAILED' ? (
                <div className="text-center space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-red-800 dark:text-red-300">
                      {formatMessage({
                        id: 'age_verification_failed',
                        defaultMessage: 'Verification failed',
                      })}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onReset}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    {formatMessage({
                      id: 'try_again',
                      defaultMessage: 'Try again',
                    })}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-gray-400">
                      {formatMessage({
                        id: 'age_verification_qr_instruction',
                        defaultMessage:
                          'Scan the QR code with the Swiyu app and confirm your age to continue.',
                      })}
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
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center py-12">
              <Loading />
            </div>
          )}

          <div className="border-t mt-10 border-gray-200 dark:border-gray-700 pt-8 space-y-6">
            <Image
              src="https://prod-eidch-hcms-sdweb.imgix.net/2025/02/19/e5c89823-7449-4e53-a36f-93959989b445.png?auto=format"
              alt="Swiyu Logo"
              width={60}
              height={60}
              className="rounded-lg mx-auto shadow-md"
            />

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatMessage({
                  id: 'download_swiyu_app',
                  defaultMessage: 'Download the Swiyu app',
                })}
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
    </Portal>
  );
}
