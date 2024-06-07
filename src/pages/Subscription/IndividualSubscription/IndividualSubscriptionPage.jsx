import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import IndividualPayment from './IndividualPayment';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const IndividualSubscriptionPage = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <IndividualPayment></IndividualPayment>
            </Elements>
        </div>
    );
};

export default IndividualSubscriptionPage;