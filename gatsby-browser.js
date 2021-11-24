const loadStripe = require('@stripe/stripe-js').loadStripe
const CartProvider = require('use-shopping-cart').CartProvider
const React = require("react")

const stripePromise = loadStripe(process.env.STRIPE_PUB)//process.env.REACT_APP_STRIPE_API_PUBLIC)

exports.wrapRootElement = ({ element }) => {
  return (
    <CartProvider
    mode="client-only"
    stripe={stripePromise}
    successUrl="https://henryvd.com"
    cancelUrl="https://henryvd.com"
    currency="USD"
    allowedCountries={['US', 'CA']}
    billingAddressCollection={true}
  >
    {element}
  </CartProvider>
  )
}
