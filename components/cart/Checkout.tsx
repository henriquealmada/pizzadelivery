import { useRouter } from 'next/router'
import { FormEvent, useRef, useState } from 'react'
import { BASE_URL } from '../../utils/requests'

type Props = {
  total: number
  onClose: () => void
}

const Checkout = ({ total, onClose }: Props) => {
  const router = useRouter()
  const nameInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const addressInputRef = useRef<HTMLTextAreaElement>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()

    const name = nameInputRef.current!.value
    const phone = phoneInputRef.current!.value
    const address = addressInputRef.current!.value

    if (total === 0) {
      return
    }

    const sendOrder = async () => {
      try {
        setLoading(true)
        setError(false)
        const res = await fetch(`${BASE_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            name,
            phone,
            address,
            total
          })
        })
        if (!res.ok) {
          setError(true)
        }
        const savedOrder = await res.json()
        router.push(`/orders/${savedOrder._id}`)
      } catch (err) {
        setError(true)
      }
      setLoading(false)
    }
    sendOrder()
  }

  return (
    <>
      <div
        className="bg-black opacity-[0.7] w-full h-full fixed top-0 left-0 z-[999]"
        onClick={() => onClose()}
      ></div>
      <div className="fixed right-0 left-0 ml-auto mr-auto top-[100px] bg-white w-[400px] z-[9999] py-[4rem] px-[3rem] rounded-[20px]">
        <form onSubmit={submitHandler}>
          <h1 className="text-[1.5rem] mb-[1rem]">
            You will pay ${total.toFixed(2)} after delivery.
          </h1>
          <div>
            <label className="block" htmlFor="name">
              Name Surname
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="border-[2px] w-full p-[0.3rem]"
              ref={nameInputRef}
              required
            />
          </div>
          <div>
            <label className="block" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="(123) 123-1234"
              className="border-[2px] w-full p-[0.3rem]"
              ref={phoneInputRef}
              required
              pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
            />
          </div>
          <div>
            <label className="block" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Elton St. 505 NY"
              className="border-[2px] w-full p-[0.3rem]"
              ref={addressInputRef}
              required
            ></textarea>
          </div>
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
                Order
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

export default Checkout
