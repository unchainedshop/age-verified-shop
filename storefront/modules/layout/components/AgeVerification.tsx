'use client';
import { useEffect, useState } from 'react';
import Button from '../../common/components/Button';
import AgeVerificationModal from './AgeVerificationModal';
import useUser from '../../auth/hooks/useUser';
import useRequestAgeVerification from '../../auth/hooks/useRequestAgeVerification';
import useLoginAsGuest from '../../auth/hooks/useLoginAsGuest';
import useLogout from '../../auth/hooks/useLogout';
import AgeVerificationButton from './AgeVerificationButton';
import { useApolloClient } from '@apollo/client';

export default function AgeVerification() {
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

  if (loading && !user) return null;

  if (status) {
    return (
      <div className="bg-slate-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        Ihr Alter wurde verifiziert. Sie können alle Produkte ansehen.
        <Button onClick={() => logout()}>Zurücksetzen</Button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      Um alle Produkte anzusehen, müssen Sie Ihr Alter mit Swiyu verifizieren.
      <AgeVerificationButton
        verificationRequest={verificationRequest}
        onOpenModal={() => setIsVerificationModalOpen(true)}
      />
      {isVerificationModalOpen && (
        <AgeVerificationModal
          verificationRequest={verificationRequest}
          onReset={() => reset()}
        />
      )}
    </div>
  );
}
