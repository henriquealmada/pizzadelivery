import Head from 'next/head'
import Image from 'next/image'
import PizzasList from '../components/pizza/PizzasList'
import Carousel from 'react-bootstrap/Carousel'
import { useState } from 'react'
import packageInfo from '../public/Items.json'
import { Product } from '../types'
import { BASE_URL } from '../utils/requests'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${BASE_URL}/products`)
  const pizzas: Product[] = await res.json()

  return {
    props: {
      pizzas
    }
  }
}

type Props = {
  pizzas: Product[]
}

export default function Home({ pizzas }: Props) {
  const { bootstrap } = packageInfo.carouselItems
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  return (
    <>
      <Head>
        <title>Lama</title>
        <meta name="description" content="The best pizzas in the country" />
      </Head>
      {/* HERO SECTION */}
      <section className="bg-orange-600">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          indicators={false}
        >
          {bootstrap.map(item => (
            <Carousel.Item key={item.id} interval={4000}>
              <Image
                className="w-[90%] m-auto d-block w-100"
                src={item.imageUrl}
                width="500"
                height="500"
                alt="featured"
                unoptimized={true}
                priority
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
      {/* PIZZAS SECTION */}
      <section className="px-[2rem] pb-[5rem]">
        <div className="text-center m-auto max-w-[1200px] mb-[3rem]">
          <h3 className="text-[2rem] font-bold mb-[3rem] mt-[5rem]">
            THE BEST PIZZA IN TOWN
          </h3>
          <p className="mb-[3rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            recusandae enim harum laudantium adipisci ipsum odit nesciunt
            tenetur perspiciatis sed iste illo dignissimos, ratione magni,
            obcaecati voluptatem molestiae? Tenetur, nemo?
          </p>
        </div>
        <PizzasList pizzas={pizzas} />
      </section>
    </>
  )
}
