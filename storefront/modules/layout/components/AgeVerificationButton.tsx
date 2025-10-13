'use client';
import Link from 'next/link';
import Button from '../../common/components/Button';
import { useEffect, useState } from 'react';

export default function AgeVerificationButton({
  verificationRequest,
  onOpenModal,
}) {
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

  if (!verificationRequest) return <Button disabled>Loading...</Button>;

  return isMobile ? (
    <Link href={verificationRequest?.verificationDeepLink}>
      <Button className="button--swiyu">Jetzt verifizieren</Button>
    </Link>
  ) : (
    <Button className="button--swiyu" onClick={onOpenModal}>
      Jetzt verifizieren
    </Button>
  );
}
