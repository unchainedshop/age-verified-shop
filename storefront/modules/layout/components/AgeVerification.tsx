'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Button from '../../common/components/Button';
import AgeVerificationModal from './AgeVerificationModal';
import useUser from '../../auth/hooks/useUser';
import useRequestAgeVerification from '../../auth/hooks/useRequestAgeVerification';
import useLoginAsGuest from '../../auth/hooks/useLoginAsGuest';
import useLogout from '../../auth/hooks/useLogout';
import AgeVerificationButton from './AgeVerificationButton';
import { useApolloClient } from '@apollo/client';

export default function AgeVerification() {
  const { formatMessage } = useIntl();
  const apollo = useApolloClient();
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const { user, loading } = useUser();
  const { verificationRequest, reset } = useRequestAgeVerification({
    skip: !user?._id,
  });
  const { logout } = useLogout();
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

  const status = user?.ageVerification?.status;
  useEffect(() => {
    if (!status && verificationRequest?.state === 'SUCCESS' && !loading) {
      apollo.resetStore();
      setIsVerificationModalOpen(false);
    }
  }, [verificationRequest, apollo, status, loading]);

  const userAge16Verified = user?.ageVerification?.age_over_16 === 'true';
  const userAge18Verified = user?.ageVerification?.age_over_18 === 'true';

  let ageApprox = '18+';
  if (userAge16Verified && !userAge18Verified) {
    ageApprox = '16-17';
  } else if (!userAge16Verified) {
    ageApprox = '<16';
  }

  if (loading && !user) return null;

  if (status) {
    return (
      <div className="sticky top-16 z-[1010] bg-slate-50 dark:bg-slate-800 flex flex-wrap gap-5 items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        <span className="text-slate-900 dark:text-white">
          {formatMessage({
            id: 'age_verified_as',
            defaultMessage: 'Your age has been verified as:',
          })}{' '}
          {ageApprox}
        </span>
        <Button
          className="max-w-[180px]"
          onClick={() => {
            logout().then(() => window.location.reload());
          }}
        >
          {formatMessage({ id: 'reset', defaultMessage: 'Reset' })}
        </Button>
      </div>
    );
  }

  return (
    <div className="sticky top-16 z-[1010] bg-slate-50 dark:bg-slate-800 flex gap-5 items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center text-pretty gap-3">
        <Image
          src="/swiyu-logo.png"
          alt="Swiyu Logo"
          width={32}
          height={32}
          className="rounded-md"
        />
        <div className="text-slate-900 text-xs sm:text-sm dark:text-white">
          <p>
            <b>
              {formatMessage({
                id: 'age_verification_title',
                defaultMessage: 'e-ID Age Verification:',
              })}{' '}
            </b>
            {formatMessage({
              id: 'age_verification_description',
              defaultMessage:
                'Confirm your age with Swiyu and see all products.',
            })}
          </p>
          <p className="text-xs mt-1">
            {formatMessage({
              id: 'no_swiyu_app',
              defaultMessage: 'Kein Swiyu?',
            })}{' '}
            <Link
              href="https://apps.apple.com/ch/app/swiyu/id6737259614"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600 dark:hover:text-slate-300"
            >
              App Store
            </Link>
            {' | '}
            <Link
              href="https://play.google.com/store/apps/details?id=ch.admin.foitt.swiyu&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600 dark:hover:text-slate-300"
            >
              Google Play
            </Link>
          </p>
        </div>
      </div>
      <AgeVerificationButton
        verificationRequest={verificationRequest}
        onOpenModal={() => setIsVerificationModalOpen(true)}
      />
      {isVerificationModalOpen && (
        <AgeVerificationModal
          verificationRequest={verificationRequest}
          onReset={() => reset()}
          onClose={() => setIsVerificationModalOpen(false)}
        />
      )}
    </div>
  );
}
