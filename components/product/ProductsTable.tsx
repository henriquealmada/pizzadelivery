import ProductItem from './ProductItem'
import { Product } from '../../types'

type Props = {
  products: Product[]
}

const ProductsTable = ({ products }: Props) => {
  return (
    <div className="overflow-auto">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Id</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map(product => {
            return <ProductItem key={product._id} product={product} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsTable
