import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

function Payment () {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm></CheckoutForm>
    </Elements>
  )
}

export default Payment
