import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";

const IndividualPayment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const [clientSecret, setClientSecret] = useState("");
    const normalPrice = 5;
    const { user } = useContext(AuthContext);


    useEffect(() => {
       

        axiosPublic.post("/create-payment-intent", { price: normalPrice })
            .then(res => {
                // console.log(res.data);
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosPublic]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            
            return;
        }

       
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
        }



        const { paymentIntent, error: confirError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            }
        })

        if (confirError) {
            // console.log('[error]', confirError);
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
                        // console.log("Premium added");
                        Swal.fire({
                            position: "center",
                            title: "Congrats!",
                            text: "You are a premium user!",
                            icon: "success",
                            timer: 1500
                        });
                    }
                })

        }
    }
    return (
        <div className=" ">
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