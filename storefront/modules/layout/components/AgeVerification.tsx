import useRequestAgeVerification from '../../auth/hooks/useRequestAgeVerification';
import useQRCodeGenerator from 'react-hook-qrcode-svg';
import Loading from '../../common/components/Loading';
import Image from 'next/image';
import Link from 'next/link';
const QRCODE_SIZE = 256;
const QRCODE_LEVEL = 'Q';
const QRCODE_BORDER = 4;

export default function AgeVerification() {
  const { verificationRequest, reset } = useRequestAgeVerification();

  const { path, viewBox } = useQRCodeGenerator(
    verificationRequest?.verificationDeepLink,
    QRCODE_LEVEL,
    QRCODE_BORDER,
  );

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-center flex-col mt-5">
        Wir müssen dein Alter verifizieren, damit wir wissen, welche Produkte du
        sehen darfst
        {verificationRequest ? (
          <>
            <Loading>Scan den QR Code mit der swiyu App</Loading>
            {verificationRequest?.state === 'FAILED' ? (
              <button
                type="button"
                onClick={() => reset()}
                className="rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                Erneut versuchen (mit Papa's Handy? 😉)
              </button>
            ) : (
              <svg
                width={QRCODE_SIZE}
                height={QRCODE_SIZE}
                viewBox={viewBox}
                stroke="none"
              >
                <rect width="100%" height="100%" fill="#ffffff" />
                <path d={path} fill="#000000" />
              </svg>
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
