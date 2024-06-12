import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUserData from '../../../Hooks/useHRData';
import Spinner from '../../../Components/Spinner';
import toast from 'react-hot-toast';
import Heading from '../../../Components/Heading';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';

// import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [TransactionId, setTransactionId] = useState("");
    const { userData, isLoading, } = useUserData();
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location?.state)
    const [selectedValue, setSelectedValue] = useState(userData?.category || '');

    useEffect(() => {
        if (userData?.category) {
            setSelectedValue(userData.category);
        }
    }, [userData]);

    if (TransactionId) {
        setTimeout(() => {
            navigate(location?.state?.from || "/");
        }, 1000)
    }

    useEffect(() => {
        if (selectedValue > 0) {
            axiosSecure.post('/create-payment-intent', { category_price: selectedValue })
                .then(res => {
                    setClientSecret(res?.data.clientSecret);
                })
                .catch(error => {
                    console.error('Error creating payment intent:', error);
                });
        }
    }, [axiosSecure, selectedValue]);

    const handleChange = async (event) => {
        const packagePrice = event.target.value;
        setSelectedValue(packagePrice);

        if (packagePrice > 0) {
            try {
                const res = await axiosSecure.patch(`/payments/change/${userData?.email}`, { category_price: packagePrice, payment: "yes" });
                if (res.data) {
                    toast.success("Package updated successfully");
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
            console.log(paymentMethod)
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

                // const payment = {
                //     email: userData?.email,
                //     price: selectedValue,
                //     transactionId: paymentIntent.id,
                //     date: new Date().toLocaleDateString(),
                //     payment: "yes"
                // };

                // try {
                //     const res = await axiosSecure.patch('/payment_status', {payment: "yes"});
                //     if (res.data?.insertedId) {
                //         Swal.fire({
                //             position: "center",
                //             icon: "success",
                //             title: "Payment successful",
                //             showConfirmButton: false,
                //             timer: 1500
                //         });
                //         navigate(from);
                //     }
                // } catch (error) {
                //     console.error('Error saving payment:', error);
                // }
                const res = await axiosSecure.patch(`/payment_status/${userData?.email}`, { payment: "yes" });
                if (res.data?.paymentResult?.insertedId) {
                    //     setTimeout(() => {
                    //     navigate(location?.state?.from || "/assetList");
                    // }, 2000); 

                }
            }
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="my-24">
            <Helmet>
                <title>Payment || Checkout form</title>
            </Helmet>
            <Heading heading="Payment here"></Heading>
            <form className='flex flex-col w-1/2 mx-auto mb-10'>
                <select
                    name='product_type'
                    required
                    className='border-2 p-2 border-primary input input-bordered input-success'
                    value={selectedValue}
                    onChange={handleChange}
                >
                    <option value='' disabled>Select a package</option>
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
                    <div className="flex justify-center mt-8">
                        <button
                            className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center cursor-pointer"
                            type="submit"
                            disabled={!stripe || !clientSecret}
                        >
                            Pay
                        </button>
                    </div>
                    <div className='flex justify-center mt-2'>
                        <p className='text-red-500 text-center'>{error}</p>
                        {TransactionId && <p className='text-green-400 font-bold'>Your transaction id: {TransactionId}</p>}


                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;
