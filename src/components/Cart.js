import React, { useState } from "react"
import { useShoppingCart, DebugCart } from 'use-shopping-cart'
import cartLogo from '../img/ellsworth-shape-cart.png'
// import { CartItems } from './CartItems'
const Cart = () => {
  /* Gets the totalPrice and a method for redirecting to stripe */
  const shopping_cart = useShoppingCart()
  const {clearCart} = shopping_cart
  const opened = shopping_cart.cartCount > 0 ? "opened" : "";
  return (
    <div className={`cart ${opened}`}>
      {/* This is where we'll render our cart */}
      {shopping_cart.cartCount && shopping_cart.cartCount > 0 ? <div className="cart-stuff"><div className="cart-count">{shopping_cart.cartCount}</div><button onClick={clearCart}>clear cart</button><div className="checkout" onClick={() => shopping_cart.redirectToCheckout()}>checkout</div></div> : ""}
      {false && shopping_cart.formattedTotalPrice ? <div className="cart-price">{shopping_cart.formattedTotalPrice}</div> : ""}
    </div>
  )
}

export const CartCount = () => {
  const {count} = useShoppingCart()
  return count
}



export default Cart
