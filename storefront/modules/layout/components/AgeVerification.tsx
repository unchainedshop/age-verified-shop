import useRequestAgeVerification from '../../auth/hooks/useRequestAgeVerification';
import useQRCodeGenerator from 'react-hook-qrcode-svg';
import Loading from '../../common/components/Loading';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useUser from '../../auth/hooks/useUser';
import useLoginAsGuest from '../../auth/hooks/useLoginAsGuest';
import useCheckAgeVerification from '../../auth/hooks/useCheckAgeVerification';

const QRCODE_SIZE = 256;
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
    <div>
      <div className="sm:flex sm:items-center sm:justify-center flex-col mt-5">
        Wir müssen dein Alter verifizieren, damit wir wissen, welche Produkte du
        sehen darfst
        {verificationRequest ? (
          <>
            {verificationRequest?.state === 'FAILED' ? (
              <button
                type="button"
                onClick={() => reset()}
                className="rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                Erneut versuchen (mit Papa's Handy? 😉)
              </button>
            ) : (
              <div className="mt-5">
                {isMobile ? (
                  <a
                    className="rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-slate-50"
                    href={verificationRequest.verificationDeepLink}
                  >
                    Beta ID mit Swiyu vorweisen
                  </a>
                ) : (
                  <button onClick={check}>
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
                )}
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}
        <Image
          className="mt-10"
          src="https://prod-eidch-hcms-sdweb.imgix.net/2025/02/19/e5c89823-7449-4e53-a36f-93959989b445.png?auto=format"
          alt="Age Verification"
          width={50}
          height={50}
        />
        <Link
          className="mt-5 font-medium text-blue-600 hover:underline"
          href="https://apps.apple.com/ch/app/swiyu/id6737259614"
        >
          Download swiyu for iOS
        </Link>
        <Link
          className="mt-3 font-medium text-blue-600 hover:underline"
          href="https://play.google.com/store/apps/details?id=ch.admin.foitt.swiyu&pli=1"
        >
          Download swiyu for Android
        </Link>
      </div>
    </div>
  );
}
