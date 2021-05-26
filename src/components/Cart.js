import React, { useState } from "react"
import { useShoppingCart, DebugCart } from 'use-shopping-cart'
// import { CartItems } from './CartItems'
const productData = [
  {
    name: 'Bananas',
    price_id: 'price_GBJ2Ep8246qeeT',
    price: 400,
    image: 'https://www.fillmurray.com/300/300',
    currency: 'USD'
  },
  {
    name: 'Tangerines',
    price_id: 'price_GBJ2WWfMaGNC2Z',
    price: 100,
    image: 'https://www.fillmurray.com/300/300',
    currency: 'USD'
  }
]
const Cart = () => {
  /* Gets the totalPrice and a method for redirecting to stripe */
  const shopping_cart = useShoppingCart()
  return (
    <div className="cart">
      {/* This is where we'll render our cart */}
      <div className="cart-count">{shopping_cart.cartCount}</div>
      <div onClick={() => shopping_cart.redirectToCheckout()}>Checkout</div>
      {false && shopping_cart.formattedTotalPrice ? <div className="cart-price">{shopping_cart.formattedTotalPrice}</div> : ""}
    </div>
  )
}

export default Cart
