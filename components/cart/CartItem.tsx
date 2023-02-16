import Image from 'next/image'
import { CartProduct } from '../../types'

type Props = {
  item: CartProduct
}

const CartItem = ({ item }: Props) => {
  return (
    <tr>
      <td className="py-3 px-6 whitespace-nowrap">
        <Image src={item.image.path} width="150" height="150" alt="pizza" />
      </td>
      <td className="py-3 px-6 whitespace-nowrap">
        <h4 className="text-[1.2rem] text-red-800 font-bold">{item.name}</h4>
      </td>
      <td className="py-3 px-6 whitespace-nowrap">
        {item.extras.map((extra, index) => (
          <span key={index}>
            {extra.text}
            {index !== item.extras.length - 1 && ', '}{' '}
          </span>
        ))}
      </td>
      <td className="py-3 px-6 whitespace-nowrap">
        <p>${item.price.toFixed(2)}</p>
      </td>
      <td className="py-3 px-6 whitespace-nowrap">
        <p>{item.quantity}</p>
      </td>
      <td className="py-3 px-6 whitespace-nowrap">
        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
      </td>
    </tr>
  )
}

export default CartItem
