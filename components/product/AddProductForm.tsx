import { useRouter } from 'next/router'
import { FormEvent, useRef, useState } from 'react'
import { BASE_URL } from '../../utils/requests'

const sizes = ['small', 'medium', 'large']

type Props = {
  onClose: () => void
}

const AddProductForm = ({ onClose }: Props) => {
  const router = useRouter()
  const titleInputRef = useRef<HTMLInputElement>(null)
  const descInputRef = useRef<HTMLTextAreaElement>(null)
  const extrasTextInputRef = useRef<HTMLInputElement>(null)
  const extrasPriceInputRef = useRef<HTMLInputElement>(null)

  const [smallValue, setSmallValue] = useState('')
  const [mediumValue, setMediumValue] = useState('')
  const [largeValue, setLargeValue] = useState('')

  const [extras, setExtras] = useState<
    { id: number; text: string; price: number }[]
  >([])

  const [selectedImage, setSelectedImage] = useState<string | Blob>('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const onChangeImageHandler = (event: any) => {
    setSelectedImage(event.target.files[0])
  }

  const onChangePriceHandler = (event: any) => {
    if (event.target.id === 'price1') {
      setSmallValue(event.target.value)
    } else if (event.target.id === 'price2') {
      setMediumValue(event.target.value)
    } else {
      setLargeValue(event.target.value)
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
      id: Math.random() * 10,
      text: extraTextValue,
      price: +extraPriceValue
    }
    setExtras(prev => [...prev, extraValue])
    extrasTextInputRef.current!.value = ''
    extrasPriceInputRef.current!.value = ''
  }

  const onRemoveExtraHandler = (id: number) => {
    setExtras(prev => prev.filter(extra => extra.id !== id))
  }

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault()
    const titleValue = titleInputRef.current!.value
    const descValue = descInputRef.current!.value
    const pricesValue = [+smallValue, +mediumValue, +largeValue]

    const formData = new FormData()
    formData.append('image', selectedImage)
    formData.append('title', titleValue)
    formData.append('description', descValue)
    formData.append('prices', JSON.stringify(pricesValue))

    const extrasToSend = extras.map(extra => ({
      text: extra.text,
      price: extra.price
    }))

    formData.append('extras', JSON.stringify(extrasToSend))

    try {
      setLoading(true)
      setError(false)
      const res = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
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
        <form onSubmit={onSubmitHandler}>
          <h1 className="text-[2rem] mb-[1.5rem] font-bold">Add a new pizza</h1>
          <div>
            <label className="block" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="border-[2px] w-full p-[0.3rem]"
              required
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
            {extras.map((extra, index) => (
              <li
                key={extra.id}
                className="cursor-pointer border-[2px] border-[orange] py-[0.3rem] px-[0.5rem] rounded-[10px] text-[orange]"
                onClick={() => onRemoveExtraHandler(extra.id)}
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
                onClick={onSubmitHandler}
                className="w-[100px] py-[0.3rem] bg-red-600 text-white rounded-[5px] mt-[1rem]"
              >
                Try again
              </button>
            </div>
          )}
          {!loading && !error && (
            <div className="flex justify-center gap-[0.5rem] mt-[2rem]">
              <button
                className="py-[0.3rem] px-[0.8rem] bg-green-800 text-white rounded-[10px]"
                type="submit"
              >
                Create
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

export default AddProductForm
