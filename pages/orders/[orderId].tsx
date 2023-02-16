import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import PaymentBox from '../../components/cart/PaymentBox'
import { Order } from '../../types'
import { BASE_URL } from '../../utils/requests'

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${BASE_URL}/orders/`)
  const orders: Order[] = await res.json()
  const paths = orders.map(order => ({
    params: { orderId: order._id }
  }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params?.orderId
  const res = await fetch(`${BASE_URL}/orders/${id}`)
  const order: Order = await res.json()
  return {
    props: {
      order
    },
    revalidate: 10
  }
}

type Props = {
  order: Order
}

const statusImg = ['paid', 'bake', 'bike', 'delivered']

const statusNames = ['Paid', 'Preparing', 'On the way', 'Delivered']

const OrderPage = ({ order }: Props) => {
  return (
    <>
      <Head>
        <title>Order</title>
      </Head>
      <section className="py-[3rem] px-[2rem] flex flex-col xl:flex-row justify-center sm:items-center gap-[4rem]">
        <div>
          <div className="overflow-auto">
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-6">Order ID</th>
                  <th className="px-6">Customer</th>
                  <th className="px-6">Address</th>
                  <th className="px-6">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 whitespace-nowrap">{order._id}</td>
                  <td className="px-6 whitespace-nowrap">{order.customer}</td>
                  <td className="px-6 whitespace-nowrap">{order.address}</td>
                  <td className="px-6 whitespace-nowrap">
                    ${order.total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row gap-[5rem] mt-[3rem] pl-[1.5rem] text-center">
            {statusImg.map((status, index) => {
              return (
                <div key={index}>
                  <Image
                    className="m-auto"
                    src={`/images/${status}.png`}
                    width="30"
                    height="30"
                    alt={statusNames[index]}
                  />
                  <p>{statusNames[index]}</p>
                  {order.status === index && (
                    <Image
                      className="m-auto"
                      src="/images/checked.png"
                      width="20"
                      height="20"
                      alt="checked"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <PaymentBox
          subtotal={order.total}
          status={order.status}
          isCheckingout={false}
        />
      </section>
    </>
  )
}

export default OrderPage
