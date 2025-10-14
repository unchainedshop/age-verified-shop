'use client';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Button from '../../common/components/Button';
import { useEffect, useState } from 'react';

export default function AgeVerificationButton({
  verificationRequest,
  onOpenModal,
}) {
  const { formatMessage } = useIntl();
  const [isMobile, setMobile] = useState(undefined);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)
    ) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  if (!verificationRequest)
    return (
      <Button disabled>
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
