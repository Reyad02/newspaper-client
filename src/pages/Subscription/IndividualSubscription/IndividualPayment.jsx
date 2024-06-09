import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../provider/AuthProvider";

const IndividualPayment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const [clientSecret, setClientSecret] = useState("");
    const normalPrice = 5;
    const { user } = useContext(AuthContext);


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // fetch("/create-payment-intent", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ amount: normalPrice }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //         setClientSecret(data.clientSecret)
        //     });

        axiosPublic.post("/create-payment-intent", { price: normalPrice })
            .then(res => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosPublic]);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }



        const {paymentIntent, error: confirError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            }
        })

        if (confirError) {
            console.log('[error]', confirError);
        }
        else {
            console.log('[PaymentIntent]', paymentIntent.id);
            const updateUserInfo = {
                email: user?.email,
                time: new Date(Date.now() + 1 * 60 * 1000)
            }
            axiosPublic.put('/update-payment', updateUserInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        console.log("Premium added");
                    }
                })

        }
    }
    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="flex justify-center btn bg-blue-300 text-black" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default IndividualPayment;