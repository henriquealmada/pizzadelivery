import PizzaItem from './PizzaItem'
import { Product } from '../../types'

type Props = {
  pizzas: Product[]
}

const PizzasList = ({ pizzas }: Props) => {
  return (
    <ul className="flex flex-wrap m-auto max-w-[1400px] justify-center gap-[4rem]">
      {pizzas.map(pizza => {
        return <PizzaItem key={pizza._id} pizza={pizza} />
      })}
    </ul>
  )
}

export default PizzasList
