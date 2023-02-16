import OrderItem from './OrderItem'
import { Order } from '../../types'

type Props = {
  orders: Order[]
}

const OrdersTable = ({ orders }: Props) => {
  return (
    <div className="overflow-auto">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3">Id</th>
            <th className="px-6 py-3">Costumer</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map(order => {
            return <OrderItem key={order._id} order={order} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersTable
