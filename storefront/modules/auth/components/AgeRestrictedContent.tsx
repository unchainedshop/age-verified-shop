import { useIntl } from 'react-intl';

export default function AgeRestrictedContent({
  restricted,
  children,
  className,
}: {
  restricted: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const { formatMessage } = useIntl();

  if (!restricted) return children;
  return (
    <div className={`${className}`}>
      <div className="absolute p-8 inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm flex items-center justify-center text-center z-10">
        <p>
          {formatMessage({
            id: 'age_verification_message',
            defaultMessage: 'Please verify your age to view this content',
          })}
        </p>
      </div>
      {children}
    </div>
  );
}
