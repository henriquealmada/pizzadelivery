import Head from 'next/head'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartList from '../components/cart/CartList'
import Checkout from '../components/cart/Checkout'
import PaymentBox from '../components/cart/PaymentBox'
import { cartActions } from '../store/cart-slice'
import { CartState } from '../types'

const Cart = () => {
  const cartItems = useSelector((state: CartState) => state.items)
  const dispatch = useDispatch()
  const [isCheckout, setIsCheckout] = useState(false)

  let subtotal = 0
  for (let item of cartItems) {
    subtotal += item.price * item.quantity
  }

  const openCheckoutHandler = () => {
    setIsCheckout(true)
  }

  const closeCheckoutHandler = () => {
    setIsCheckout(false)
  }

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <section className="py-[4rem] px-[2rem] lg:flex items-center gap-[2rem] justify-center">
        <CartList cartItems={cartItems} />
        {cartItems.length > 0 && (
          <PaymentBox
            onOpen={openCheckoutHandler}
            subtotal={subtotal}
            isCheckingout={true}
          />
        )}
        {cartItems.length > 0 && (
          <button
            className="py-[0.3rem] px-[0.8rem] bg-[red] rounded-[3px] text-white"
            onClick={() => dispatch(cartActions.clearCart())}
          >
            Clear cart
          </button>
        )}
        {isCheckout && (
          <Checkout total={subtotal} onClose={closeCheckoutHandler} />
        )}
      </section>
    </>
  )
}

export default Cart
