'use client';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Button from '../../common/components/Button';
import { useEffect, useState } from 'react';
import useCheckAgeVerification from '../../auth/hooks/useCheckAgeVerification';

let lastCheck = new Date().getTime();

export default function AgeVerificationButton({
  verificationRequest,
  onOpenModal,
}) {
  const { formatMessage } = useIntl();
  const [isMobile, setMobile] = useState(undefined);
  const { checkAgeVerification } = useCheckAgeVerification();

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)
    ) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  useEffect(() => {
    if (new Date().getTime() - lastCheck > 500 && verificationRequest?._id) {
      // After 500ms, re-check verification status manually
      // This is an idea to workaround potential delays in SSE updates
      checkAgeVerification(verificationRequest?._id);
      lastCheck = new Date().getTime();
    }
    return;
  });

  if (!verificationRequest)
    return (
      <Button className="button--swiyu" disabled>
        {formatMessage({ id: 'loading', defaultMessage: 'Loading...' })}
      </Button>
    );

  // Show loading state while checking mobile
  if (isMobile === undefined)
    return (
      <Button className="button--swiyu" disabled>
        {formatMessage({ id: 'loading', defaultMessage: 'Loading...' })}
      </Button>
    );

  return isMobile ? (
    <Link href={verificationRequest?.verificationDeepLink}>
      <Button className="button--swiyu">
        {formatMessage({
          id: 'verify_now',
          defaultMessage: 'Verify now',
        })}
      </Button>
    </Link>
  ) : (
    <Button className="button--swiyu" onClick={onOpenModal}>
      {formatMessage({
        id: 'verify_now',
        defaultMessage: 'Verify now',
      })}
    </Button>
  );
}
