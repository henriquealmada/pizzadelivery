import CartItem from './CartItem'
import { CartProduct } from '../../types'

type Props = {
  cartItems: CartProduct[]
}

const CartList = ({ cartItems }: Props) => {
  if (cartItems.length === 0) {
    return (
      <p className="mb-[1rem] text-[1.2rem] font-bold text-center">
        Your cart is empty!
      </p>
    )
  }

  return (
    <div className="overflow-auto mb-[2rem]">
      <table className="table-auto">
        <thead>
          <tr className="text-center">
            <th className="py-3 px-6">Product</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Extras</th>
            <th className="py-3 px-6">Price</th>
            <th className="py-3 px-6">Quantity</th>
            <th className="py-3 px-6">Total</th>
          </tr>
        </thead>
        <tbody className="text-center divide-y divide-gray-100">
          {cartItems.map((item, index) => {
            return <CartItem key={index} item={item} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CartList
