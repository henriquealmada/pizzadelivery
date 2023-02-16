import { useRouter } from 'next/router'
import { FormEvent, useRef, useState } from 'react'
import { Product } from '../../types'
import { BASE_URL } from '../../utils/requests'

const sizes = ['small', 'medium', 'large']

type Props = {
  product: Product
  onClose: () => void
}

const EditProductForm = ({ product, onClose }: Props) => {
  const router = useRouter()
  const titleInputRef = useRef<HTMLInputElement>(null)
  const descInputRef = useRef<HTMLTextAreaElement>(null)
  const extrasTextInputRef = useRef<HTMLInputElement>(null)
  const extrasPriceInputRef = useRef<HTMLInputElement>(null)

  const [selectedImage, setSelectedImage] = useState<string | Blob>('')

  const [smallValue, setSmallValue] = useState(product.prices[0])
  const [mediumValue, setMediumValue] = useState(product.prices[1])
  const [largeValue, setLargeValue] = useState(product.prices[2])

  const [extrasList, setExtrasList] = useState<
    { _id: string; text: string; price: number }[]
  >(product.extras)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const onChangeImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0])
    }
  }

  const onChangePriceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'price1') {
      setSmallValue(+event.target.value)
    } else if (event.target.id === 'price2') {
      setMediumValue(+event.target.value)
    } else {
      setLargeValue(+event.target.value)
    }
  }

  const onAddExtraHandler = () => {
    const extraTextValue = extrasTextInputRef.current!.value
    const extraPriceValue = extrasPriceInputRef.current!.value

    if (
      extraTextValue.trim().length === 0 ||
      extraPriceValue.trim().length === 0
    ) {
      return
    }

    const extraValue = {
      _id: (Math.random() * 10).toString(),
      text: extraTextValue,
      price: +extraPriceValue
    }
    setExtrasList(prev => [...prev, extraValue])
    extrasTextInputRef.current!.value = ''
    extrasPriceInputRef.current!.value = ''
  }

  const onRemoveExtraHandler = (id: string) => {
    setExtrasList(prev => prev.filter(extra => extra._id !== id))
  }

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault()

    const titleValue = titleInputRef.current!.value
    const descValue = descInputRef.current!.value
    const pricesValue = [smallValue, mediumValue, largeValue]

    const formData = new FormData()
    formData.append('image', selectedImage)
    formData.append('title', titleValue)
    formData.append('description', descValue)
    formData.append('prices', JSON.stringify(pricesValue))

    const extrasToSend = extrasList.map(extra => ({
      text: extra.text,
      price: extra.price
    }))

    formData.append('extras', JSON.stringify(extrasToSend))

    try {
      setLoading(true)
      setError(false)
      const res = await fetch(`${BASE_URL}/products/${product._id}`, {
        method: 'PATCH',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: formData
      })
      if (!res.ok) {
        setError(true)
      } else {
        router.push('/admin/')
        onClose()
      }
    } catch (err) {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <>
      <div
        className="bg-black opacity-[0.7] w-full h-full fixed top-0 left-0 z-[999]"
        onClick={() => onClose()}
      ></div>
      <div className="fixed right-0 left-0 ml-auto mr-auto top-[100px] bg-white w-[90%] sm:w-[400px] z-[9999] py-[4rem] px-[3rem] rounded-[20px]">
        <form onSubmit={submitHandler}>
          <h1 className="text-[2rem] mb-[1.5rem] font-bold">Edit pizza</h1>
          <div>
            <label className="block" htmlFor="name">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="border-[2px] w-full p-[0.3rem]"
              onChange={onChangeImageHandler}
            />
          </div>
          <div>
            <label className="block" htmlFor="phone">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="border-[2px] w-full p-[0.3rem]"
              ref={titleInputRef}
              defaultValue={product.title}
              required
            />
          </div>
          <div>
            <label className="block" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border-[2px] w-full p-[0.3rem]"
              ref={descInputRef}
              defaultValue={product.description}
              required
            />
          </div>
          <div>
            <label className="block" htmlFor="price1">
              Prices
            </label>
            <div className="flex gap-[1rem]">
              {sizes.map((size, index) => (
                <input
                  key={index}
                  type="number"
                  id={`price${index + 1}`}
                  className="border-[2px] p-[0.3rem] w-[33%]"
                  placeholder={size}
                  required
                  min={1}
                  step=".01"
                  defaultValue={product.prices[index]}
                  onChange={onChangePriceHandler}
                ></input>
              ))}
            </div>
          </div>
          <div>
            <label className="block" htmlFor="extrasText">
              Extras
            </label>
            <input
              type="text"
              id="extrasText"
              className="border-[2px] p-[0.3rem] w-[33%]"
              ref={extrasTextInputRef}
              placeholder="name"
            ></input>
            <input
              type="number"
              id="extrasPrice"
              className="border-[2px] p-[0.3rem] w-[33%] ml-[0.5rem]"
              ref={extrasPriceInputRef}
              min={1}
              step=".01"
              placeholder="price"
            ></input>
            <button
              type="button"
              className="py-[0.3rem] w-[20%] bg-gray-200 rounded-[5px] ml-[1rem]"
              onClick={onAddExtraHandler}
            >
              Add
            </button>
          </div>
          <ul className="flex gap-[1rem] mt-[0.5rem]">
            {extrasList.map((extra, index) => (
              <li
                key={extra._id}
                className="cursor-pointer border-[2px] border-[orange] py-[0.3rem] px-[0.5rem] rounded-[10px] text-[orange]"
                onClick={() => onRemoveExtraHandler(extra._id)}
              >
                {extra.text}
              </li>
            ))}
          </ul>
          {loading && <p>Loading...</p>}
          {error && (
            <div className="text-center">
              <button
                type="submit"
                onClick={submitHandler}
                className="w-[100px] py-[0.3rem] bg-red-600 text-white rounded-[5px] mt-[1rem]"
              >
                Try again
              </button>
            </div>
          )}
          {!loading && !error && (
            <div className="flex justify-center gap-[0.5rem] mt-[1rem]">
              <button
                className="py-[0.3rem] px-[0.8rem] bg-green-800 text-white rounded-[10px]"
                type="submit"
              >
                Update
              </button>
              <button
                className="py-[0.3rem] px-[0.8rem] bg-red-700 text-white rounded-[10px]"
                onClick={() => onClose()}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default EditProductForm
