'use client';
import { useIntl } from 'react-intl';
import Button from '../../common/components/Button';
import { useEffect, useState } from 'react';

export default function AgeVerificationButton({
  verificationRequest,
  onOpenModal,
}) {
  const { formatMessage } = useIntl();
  const [isMobile, setMobile] = useState(undefined);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (
      /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(userAgent)
    ) {
      setMobile(true);
      setIsIOS(/iPhone|iPad|iPod/i.test(userAgent));
    } else {
      setMobile(false);
    }
  }, []);

  const handleMobileClick = () => {
    // Try to open deep link
    window.location.href = verificationRequest?.verificationDeepLink;

    // After 1.5 seconds, redirect to app store if still on page
    // (meaning app wasn't installed)
    setTimeout(() => {
      const appStoreUrl = isIOS
        ? 'https://apps.apple.com/ch/app/swiyu/id6737259614'
        : 'https://play.google.com/store/apps/details?id=ch.admin.foitt.swiyu&pli=1';
      window.location.href = appStoreUrl;
    }, 1500);
  };

  if (!verificationRequest)
    return (
      <Button disabled>
        {formatMessage({ id: 'loading', defaultMessage: 'Loading...' })}
      </Button>
    );

  // Show loading state while checking mobile
  if (isMobile === undefined)
    return (
      <Button disabled>
        {formatMessage({ id: 'loading', defaultMessage: 'Loading...' })}
      </Button>
    );

  return isMobile ? (
    <Button className="button--swiyu" onClick={handleMobileClick}>
      {formatMessage({
        id: 'verify_now',
        defaultMessage: 'Verify now',
      })}
    </Button>
  ) : (
    <Button className="button--swiyu" onClick={onOpenModal}>
      {formatMessage({
        id: 'verify_now',
        defaultMessage: 'Verify now',
      })}
    </Button>
  );
}
