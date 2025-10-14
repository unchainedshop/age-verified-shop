'use client';
import { useEffect, useState } from 'react';
import useQRCodeGenerator from 'react-hook-qrcode-svg';
import { useIntl } from 'react-intl';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Loading from '../../common/components/Loading';
import Image from 'next/image';
import Link from 'next/link';
import useCheckAgeVerification from '../../auth/hooks/useCheckAgeVerification';
import Portal from '../../common/components/Portal';

const QRCODE_SIZE = 280;
const QRCODE_LEVEL = 'Q';
const QRCODE_BORDER = 4;

export default function AgeVerificationModal({
  verificationRequest,
  onReset,
  onClose,
}) {
  const { formatMessage } = useIntl();
  const { checkAgeVerification } = useCheckAgeVerification();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsAnimating(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

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
        className="fixed inset-0 z-[9999]"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop with blur */}
        <div
          className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 ease-out z-[9998] ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleClose}
          aria-hidden="true"
        />

        {/* Modal container */}
        <div className="fixed inset-0 z-[9999] overflow-y-auto pointer-events-none">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal content */}
            <div
              className={`relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full p-8 transform transition-all duration-300 ease-out pointer-events-auto ${
                isAnimating
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-4'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                aria-label="Close modal"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
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
                        <h3 className="text-slate-600 dark:text-slate-300">
                          {formatMessage({
                            id: 'age_verification_qr_instruction',
                            defaultMessage:
                              'Scan the QR code with the Swiyu app and confirm your age to continue.',
                          })}
                        </h3>
                        <div className="flex justify-center">
                          <button
                            onClick={check}
                            className="inline-block p-6 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200"
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
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-center py-12">
                  <Loading />
                </div>
              )}

              <div className="border-t mt-8 border-slate-200 dark:border-slate-700 pt-8 space-y-6">
                <Image
                  src="https://prod-eidch-hcms-sdweb.imgix.net/2025/02/19/e5c89823-7449-4e53-a36f-93959989b445.png?auto=format"
                  alt="Swiyu Logo"
                  width={60}
                  height={60}
                  className="rounded-lg mx-auto shadow-md"
                />

                <div className="text-center space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
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
        </div>
      </div>
    </Portal>
  );
}
