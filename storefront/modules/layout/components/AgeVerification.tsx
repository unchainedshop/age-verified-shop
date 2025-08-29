import useRequestAgeVerification from '../../auth/hooks/useRequestAgeVerification';
import useQRCodeGenerator from 'react-hook-qrcode-svg';
import Loading from '../../common/components/Loading';
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
      <div className="sm:flex sm:items-center sm:justify-center flex-col mt-10">
        Please verify your age so we know which products you are allowed to see
        {verificationRequest ? (
          <>
            <code>ID: {verificationRequest?._id}</code>
            <code>Status: {verificationRequest?.state}</code>
            {verificationRequest?.state === 'FAILED' ? (
              <button
                type="button"
                onClick={() => reset()}
                className="w-full rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                Reset
              </button>
            ) : (
              <svg
                className="mt-4"
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
      </div>
    </div>
  );
}
