
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUserData from '../../../Hooks/useHRData';
import Spinner from '../../../Components/Spinner';

const CheckoutForm = () => {
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [TransactionId, setTransactionId] = useState("");
    const [error, setError] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const { userData, isLoading } = useUserData()

    console.log(userData)
    const packagePrice = userData?.category;

    useEffect(() => {
        if (packagePrice) {
            axiosSecure.post('/create-payment-intent', { category_price: packagePrice })
                .then(res => {
                    // console.log("res", res.data);
                    setClientSecret(res?.data.clientSecret);
                })
        }
    }, [axiosSecure, packagePrice])

    // get all employee package category price
    // console.log("client", clientSecret)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {

            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: userData?.email || 'anonymous',
                    name: userData?.name || 'anonymous'
                }
            }
        })


        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)

            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: userData?.email,
                    price: packagePrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    // cartIds: cart.map(item => item._id),
                    // menuItemIds: cart.map(item => item.menuId),
                    // status: 'pending'
                    payment_status: "p"
                }

                // const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data);
                // refetch();
                // if (res.data?.paymentResult?.insertedId) {
                //     Swal.fire({
                //         position: "top-end",
                //         icon: "success",
                //         title: "Thank you for the taka paisa",
                //         showConfirmButton: false,
                //         timer: 1500
                //     });
                //     navigate('/dashboard/paymentHistory')
                // }

            }
        }
    }

    if (isLoading) return <Spinner></Spinner>
    return (
        <div className="mb-24">
            <h2 className="text-3xl mt-12 mb-10 text-center text-primary">Payment here: </h2>

            <div className='flex flex-col w-1/2 mx-auto mb-20'>
                <select
                    name='product_type'
                    required
                    className='border p-2  border-primary input input-bordered input-success'
                >
                    <option disabled>Our packages</option>
                    <option value={5}>5 members for $5</option>
                    <option value={8}>10 members for $8</option>
                    <option value={15}>20 members for $15</option>

                </select>
            </div>

            <div className='flex flex-col w-1/2 mx-auto'>
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

                    <div className="flex mt-8">
                        <button className=" font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center" type="submit" disabled={!stripe || !clientSecret}>
                            Pay
                        </button>

                    </div>
                    <p className='text-red-500 '>{error}</p>
                    {
                        TransactionId && <p className='text-green-400 font-bold'>Your transaction id: {TransactionId}</p>
                    }
                </form>
            </div>

        </div>
    );
};

export default CheckoutForm;