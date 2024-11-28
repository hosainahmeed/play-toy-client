import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Components/Hook/useAxiosSecure';
import useCart from '../../Components/Hook/useCart';
import useAuth from '../../Components/Hook/useAuth';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, setCart } = useCart();
  const [clientSecret, setClientSecret] = useState();
  const [transitionId, setTransitionId] = useState();
  const { user } = useAuth();

  useEffect(() => {
    const totalPrices = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrices);
  }, [cart]);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post('/create-payment-intent', {
          price: totalPrice,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [totalPrice]);

  useEffect(() => {
    axiosSecure
      .get('/cart')
      .then((res) => {
        setCart(res.data || []);
      })
      .catch((err) => {
        console.error('Error fetching cart items:', err);
      });
  }, []);

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
      billing_details: {
        email: user?.email || 'Anonymous',
        name: user?.displayName || 'Anonymous',
      },
    });

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.message,
        confirmButtonColor: '#d33',
      });
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error(confirmError);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: confirmError.message,
        confirmButtonColor: '#d33',
      });
    } else {
      console.log(paymentIntent);

      if (paymentIntent.status === 'succeeded') {
        setTransitionId(paymentIntent.id);

        const payment = {
          photo: user.photoURL,
          email: user.email,
          price: totalPrice,
          date: new Date(),
          transitionId: paymentIntent.id,
          cartIds: cart.map((item) => item._id),
          toySuccIds: cart.map((item) => item.toyId),
          status: 'pending...',
        };

        const res = await axiosSecure.post('/payments', payment);
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
          text: 'Your payment has been processed successfully!',
          confirmButtonColor: '#3085d6',
        }).then((res) => {
          console.log(res.data);
          setCart([]);
        });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 py-20 px-4 bg-gray-50">
      <div className="flex flex-wrap gap-4 justify-center items-center text-center">
        <h1 className="text-xl md:text-2xl font-semibold">Items: {cart.length}</h1>
        <h1 className="text-xl md:text-2xl font-semibold">Total Price: $ {totalPrice}</h1>
      </div>
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center">
          Complete Your Payment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border rounded-lg p-3">
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
          </div>
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-200 disabled:opacity-50"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
