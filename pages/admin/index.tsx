import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import AddProductForm from '../../components/product/AddProductForm'
import OrdersTable from '../../components/order/OrdersTable'
import ProductsTable from '../../components/product/ProductsTable'
import { Order } from '../../types'
import { Product } from '../../types'
import { BASE_URL } from '../../utils/requests'

type Props = {
  products: Product[]
  orders: Order[]
}

const Admin = ({ products, orders }: Props) => {
  const [addProductOpen, setAddProductOpen] = useState(false)

  const closeAddFormHandler = () => {
    setAddProductOpen(false)
  }

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <section className="py-[5rem] px-[2rem]">
        <div className="flex flex-col xl:flex-row justify-center gap-[4rem]">
          <div>
            <div className="flex gap-[1rem] items-end mb-[3rem]">
              <h2 className="text-[2rem] font-bold ">Products</h2>
              <button
                className="text-red-600 font-bold"
                onClick={() => setAddProductOpen(true)}
              >
                Add New
              </button>
            </div>
            <ProductsTable products={products} />
          </div>
          <div>
            <h2 className="text-[2rem] font-bold mb-[3rem] pl-6">Orders</h2>
            <OrdersTable orders={orders} />
          </div>
        </div>
        {addProductOpen && <AddProductForm onClose={closeAddFormHandler} />}
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cookie = context.req.cookies || ''

  if (cookie.token !== process.env.NEXT_PUBLIC_TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    }
  }
  const productRes = await fetch(`${BASE_URL}/products`)
  const orderRes = await fetch(`${BASE_URL}/orders`)
  const products: Product[] = await productRes.json()
  const orders: Order[] = await orderRes.json()

  return {
    props: {
      products,
      orders
    }
  }
}

export default Admin
