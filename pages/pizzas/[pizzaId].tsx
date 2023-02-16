import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React, { FormEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cart-slice'
import { Product } from '../../types'
import { BASE_URL } from '../../utils/requests'

type Pizza = Product

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${BASE_URL}/products`)
  const pizzas: Product[] = await res.json()

  const paths = pizzas.map((pizza: Pizza) => ({
    params: { pizzaId: pizza._id }
  }))
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params!.pizzaId
  const res = await fetch(`${BASE_URL}/products/${id}`)
  const pizza: Pizza = await res.json()
  return {
    props: {
      pizza
    }
  }
}

type Props = {
  pizza: Pizza
}

const Details: React.FC<Props> = ({ pizza }: Props) => {
  const dispatchCart = useDispatch()
  const quantityInput = useRef<HTMLInputElement>(null)

  const [size, setSize] = useState(pizza.prices[0])
  const [extras, setExtras] = useState<{ text: string; price: number }[]>([])

  let sumExtras = 0
  for (let extra of extras) {
    sumExtras += extra.price
  }

  const total = size + sumExtras

  const sizes = ['small', 'medium', 'large']

  const addToCartHandler = (event: FormEvent) => {
    event.preventDefault()

    const newItem = {
      id: pizza._id,
      image: pizza.image,
      name: pizza.title,
      price: total,
      description: pizza.description,
      quantity: +quantityInput.current!.value,
      extras: extras
    }
    dispatchCart(cartActions.addItemToCart(newItem))
  }

  const onChangeSizeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(+event.target.value)
  }

  const onChangeExtrasHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    text: string,
    price: number
  ) => {
    if (event.target.checked) {
      setExtras(prev => {
        const prevExtras = [...prev]
        prevExtras.push({ text, price })
        return prevExtras
      })
    } else {
      setExtras(prev => {
        const prevExtras = [...prev]
        return prevExtras.filter(extra => extra.text !== text)
      })
    }
  }

  return (
    <>
      <Head>
        <title>{pizza.title}</title>
        <meta name="description" content={pizza.description} />
      </Head>
      <section className="md:flex md:gap-[5rem] m-auto max-w-[1400px] items-center py-[5rem] px-[2rem] min-h-[80vh]">
        <div className="flex-1">
          <Image
            className="w-full"
            src={pizza.image.path}
            width="500"
            height="500"
            alt="pizza"
          />
        </div>
        <form onSubmit={addToCartHandler} className="flex-1">
          <span className="text-[1.5rem] text-red-700">
            ${total.toFixed(2)}
          </span>
          <p className="text-[1.2rem]">{pizza.description}</p>
          <h4 className="text-[1.8rem] font-bold">Choose the size</h4>
          {pizza.prices.map((price, index) => (
            <div key={index}>
              <input
                className="mr-[0.5rem]"
                type="radio"
                id={sizes[index]}
                name="size"
                value={price}
                defaultChecked={index === 0 ? true : false}
                onChange={onChangeSizeHandler}
              />
              <label htmlFor={sizes[index]}>{sizes[index]}</label>
            </div>
          ))}
          {pizza.extras.length > 0 && (
            <h4 className="text-[1.8rem] font-bold">
              Choose additional ingredients
            </h4>
          )}
          {pizza.extras.map((extra, index) => (
            <div key={index}>
              <input
                className="mr-[0.5rem]"
                type="checkbox"
                id={extra.text}
                value={extra.price}
                onChange={e =>
                  onChangeExtrasHandler(e, extra.text, extra.price)
                }
              />
              <label htmlFor="spicy">{extra.text}</label>
            </div>
          ))}
          <div className="flex items-center mt-[1rem]">
            <input
              className="border-[1px] border-black w-[60px] mr-[0.5rem] p-[0.3rem]"
              type="number"
              name="qty"
              id="qty"
              min="1"
              defaultValue={1}
              ref={quantityInput}
            />
            <button className="bg-orange-600 text-white py-[0.4rem] px-[0.8rem] rounded-[5px]">
              Add to Cart
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Details
