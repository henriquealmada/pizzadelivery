import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../../types'

type Props = {
  pizza: Product
}

const PizzaItem = ({ pizza }: Props) => {
  return (
    <Link href={`/pizzas/${pizza._id}`}>
      <div className="w-[300px] h-[350px] text-center flex flex-col justify-between">
        <Image
          className="m-auto"
          src={pizza.image.path}
          width="200"
          height="200"
          alt={pizza.title}
        />
        <h4 className="text-red-800 font-bold text-[1.2rem] my-[1rem]">
          {pizza.title}
        </h4>
        <span className="font-bold text-[1.3rem]">${pizza.prices[0]}</span>
        <p className="mt-[1rem]">{pizza.description}</p>
      </div>
    </Link>
  )
}

export default PizzaItem
