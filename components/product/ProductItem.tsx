import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import EditProductForm from './EditProductForm'
import { Product } from '../../types'
import { BASE_URL } from '../../utils/requests'

type Props = {
  product: Product
}

const ProductItem = ({ product }: Props) => {
  const router = useRouter()

  const [editProductOpen, setEditProductOpen] = useState(false)

  const closeEditFormHandler = () => {
    setEditProductOpen(false)
  }

  const deleteProductHandler = async (id: string) => {
    await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    router.push('/admin/')
  }

  return (
    <>
      <tr>
        <td className="py-3 ">
          <Image
            className="m-auto"
            src={product.image.path}
            width="70"
            height="70"
            alt="pizza"
          />
        </td>
        <td className="px-6 ">{product._id.slice(0, 5).concat('...')}</td>
        <td className="px-6 ">{product.title}</td>
        <td className="px-6 ">${product.prices[0]}</td>
        <td className="px-6 ">
          <div className="flex">
            <button
              className="py-[0.2rem] px-[0.5rem] bg-green-700 text-white mr-[0.8rem]"
              onClick={() => setEditProductOpen(true)}
            >
              Edit
            </button>
            <button
              className="py-[0.2rem] px-[0.5rem] bg-red-600 text-white"
              onClick={() => deleteProductHandler(product._id)}
            >
              Delete
            </button>
          </div>
          {editProductOpen && (
            <EditProductForm product={product} onClose={closeEditFormHandler} />
          )}
        </td>
      </tr>
    </>
  )
}

export default ProductItem
