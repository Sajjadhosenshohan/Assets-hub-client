import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUserData from '../../../Hooks/useHRData';
import Spinner from '../../../Components/Spinner';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [TransactionId, setTransactionId] = useState("");
    const { userData, isLoading } = useUserData();
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const [selectedValue, setSelectedValue] = useState(userData?.category);

    useEffect(() => {
        if (selectedValue > 0) {
            axiosSecure.post('/create-payment-intent', { category_price: selectedValue })
                .then(res => {
                    setClientSecret(res?.data.clientSecret);
                    // console.log(res?.data.clientSecret)
                })
                .catch(error => {
                    console.error('Error creating payment intent:', error);
                });
        }
    }, [axiosSecure, selectedValue]);


    const handleChange = async (event) => {
        const packagePrice = event.target.value;
        // console.log(parseInt(selectedValue))
        setSelectedValue(packagePrice);

        if (packagePrice > 0) {
            try {
                const res = await axiosSecure.patch(`/payments/change/${userData?.email}`, {category_price: packagePrice});
                console.log('Payment category updated', res.data);
                if (res.data) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Package updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error('Error updating payment category:', error);
            }
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
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
            setError(error.message);
        } else {
            console.log("payment method",paymentMethod)
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: userData?.email || 'anonymous',
                    name: userData?.name || 'anonymous'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: userData?.email,
                    price: selectedValue,
                    transactionId: paymentIntent.id,
                    date: new Date().toLocaleDateString(),
                    payment_status: "paid"
                };

                try {
                    const res = await axiosSecure.post('/payments', payment);
                    if (res.data?.paymentResult?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Payment successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    console.error('Error saving payment:', error);
                }
            }
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="mb-24">
            <h2 className="text-3xl mt-12 mb-10 text-center text-primary">Payment here: </h2>
            <form className='flex flex-col w-1/2 mx-auto mb-20'>
                <select
                    name='product_type'
                    required
                    className='border p-2 border-primary input input-bordered input-success'
                    value={selectedValue}
                    onChange={handleChange}
                >
                    <option value={5} disabled>Our packages</option>
                    <option value={5}>5 members for $5</option>
                    <option value={8}>10 members for $8</option>
                    <option value={15}>20 members for $15</option>
                </select>
            </form>
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
                        <button
                            className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center"
                            type="submit"
                            disabled={!stripe || !clientSecret}
                        >
                            Pay
                        </button>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    {TransactionId && <p className='text-green-400 font-bold'>Your transaction id: {TransactionId}</p>}
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;
