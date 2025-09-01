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
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(185,28,28,0.08)',
        }}
        role="alert"
        aria-live="assertive"
      >
        HINWEIS: Dies ist ein Demo-Shop (Proof of Concept), der ein
        Beta-ID-Verifizierungssystem verwendet. Mit Klick auf &quot;Bestellung
        senden&quot; bestätigst du gar nichts. Sie bezahlen nichts und es wird
        auch nichts geliefert. Capish?
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
