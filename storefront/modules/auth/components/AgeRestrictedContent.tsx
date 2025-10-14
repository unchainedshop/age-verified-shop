import { useIntl } from 'react-intl';
import { useAgeVerificationModal } from '../contexts/AgeVerificationContext';
import Button from '../../common/components/Button';

interface AgeRestrictedContentProps {
  restricted: boolean;
  children: React.ReactNode;
  className?: string;
}

const AgeRestrictedContent = ({
  restricted,
  children,
  className,
}: AgeRestrictedContentProps) => {
  const { formatMessage } = useIntl();
  const { openModal } = useAgeVerificationModal();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openModal();
  };

  if (!restricted) return children;

  return (
    <div className={className}>
      <div
        className="absolute p-8 inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm flex flex-col items-center justify-center text-center z-10 cursor-pointer"
        onClick={openModal}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={formatMessage({
          id: 'age_verification_message',
          defaultMessage: 'Please verify your age to view this content',
        })}
      >
        <p className="text-slate-900 dark:text-white mb-4">
          {formatMessage({
            id: 'age_verification_message',
            defaultMessage: 'Please verify your age to view this content',
          })}
        </p>
        <Button
          className="button--swiyu"
          fullWidth={false}
          onClick={handleButtonClick}
        >
          {formatMessage({
            id: 'verify_now',
            defaultMessage: 'Verify now',
          })}
        </Button>
      </div>
      {children}
    </div>
  );
};

export default AgeRestrictedContent;
