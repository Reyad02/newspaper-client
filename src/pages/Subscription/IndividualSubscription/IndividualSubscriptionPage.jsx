import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import IndividualPayment from './IndividualPayment';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const IndividualSubscriptionPage = () => {
    return (
        <div className='max-w-7xl mx-auto '>
            <div className='h-32 my-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-black flex items-center justify-center flex-col gap-2'>
                <h1 className='font-semibold text-4xl'>Subscription</h1>
                <p className='text-lg'>Must have to pay $5</p>
            </div>
            <div className=' md:px-40'>
                <Elements stripe={stripePromise}>
                    <IndividualPayment></IndividualPayment>
                </Elements>
            </div>
        </div>
    );
};

export default IndividualSubscriptionPage;