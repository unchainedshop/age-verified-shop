import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useCheckoutByInvoice from '../cart/hooks/useCheckoutByInvoice';
import Button from '../common/components/Button';

const InvoiceCheckoutButton = () => {
  const { formatMessage } = useIntl();
  const { checkoutByInvoice } = useCheckoutByInvoice();
  const router = useRouter();

  const checkout = async () => {
    const result = await checkoutByInvoice();
    router.replace(`/order/${result.data.checkoutCart._id}/success`);
  };

  return (
    <>
      <div
        style={{
          marginTop: '16px',
          color: '#b91c1c', // Tailwind red-700
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #fee2e2 0%, #fca5a5 100%)',
          border: '2px solid #b91c1c',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '16px',
          fontSize: '1rem',
          textAlign: 'left',
        }}
        role="alert"
        aria-live="assertive"
      >
        {formatMessage({
          id: 'invoice_checkout_warning',
          defaultMessage:
            'NOTE: This is a demo shop (Proof of Concept) using a beta ID verification system. By clicking "Send Order" you are not confirming anything. You will not be charged and nothing will be delivered. Capish?',
        })}
      </div>
      <Button
        type="button"
        text={formatMessage({
          id: 'send-order',
          defaultMessage: 'Send Order',
        })}
        onClick={checkout}
        className="mt-6 w-full rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-slate-50"
      />
    </>
  );
};

export default InvoiceCheckoutButton;
