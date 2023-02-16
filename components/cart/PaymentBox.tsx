type Props = {
  onOpen?: () => void
  subtotal: number
  isCheckingout: boolean
  status?: number
}

const PaymentBox = ({ onOpen, subtotal, isCheckingout, status }: Props) => {
  return (
    <div className="bg-[#333] py-[3rem] px-[3.5rem] text-white sm:w-[400px] w-full h-[320px] mb-[2rem]">
      <h3 className="text-[1.5rem] sm:text-[2rem] font-bold mb-[2rem]">
        CART TOTAL
      </h3>
      <h4 className="mb-[0.5rem]">
        <span className="font-bold">Subtotal: </span>${subtotal.toFixed(2)}
      </h4>
      <h4 className="mb-[0.5rem]">
        <span className="font-bold">Discount: </span>$0.00
      </h4>
      <h4 className="mb-[1.8rem]">
        <span className="font-bold">Total: </span>${subtotal.toFixed(2)}
      </h4>
      <button
        className="bg-gray-200 text-red-500 font-bold w-full py-[0.5rem] rounded-[3px]"
        onClick={() => isCheckingout && onOpen && onOpen()}
      >
        {isCheckingout && 'CHECKOUT NOW!'}
        {!isCheckingout && status === 0 && 'PAID'}
        {!isCheckingout && status === 1 && 'PREPARING'}
        {!isCheckingout && status === 2 && 'ON THE WAY'}
        {!isCheckingout && status === 3 && 'DELIVERED'}
      </button>
    </div>
  )
}

export default PaymentBox
