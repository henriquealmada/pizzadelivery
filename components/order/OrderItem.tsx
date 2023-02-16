import { useState } from 'react'
import { Order } from '../../types'
import { BASE_URL } from '../../utils/requests'

type Props = {
  order: Order
}

const status = ['PAID', 'PREPARING', 'ON THE WAY', 'DELIVERED']

const OrderItem = ({ order }: Props) => {
  const [statusNumber, setStatusNumber] = useState(order.status)

  const nextStageHandler = async () => {
    if (statusNumber === 3) {
      return
    }
    const res = await fetch(`${BASE_URL}/orders/${order._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    const updatedOrder = await res.json()
    setStatusNumber(updatedOrder.status)
  }

  return (
    <tr key={order._id}>
      <td className="px-6 ">{order._id.slice(0, 5).concat('...')}</td>
      <td className="px-6 py-3 ">{order.customer}</td>
      <td className="px-6 ">${order.total.toFixed(2)}</td>
      <td className="px-6 ">{status[statusNumber]}</td>
      <td className="px-6">
        <button
          className="py-[0.2rem] px-[0.5rem] bg-gray-300 rounded-[3px]"
          onClick={nextStageHandler}
        >
          Next Stage
        </button>
      </td>
    </tr>
  )
}

export default OrderItem
