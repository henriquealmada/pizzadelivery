import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CartState } from '../../types'

const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const quantityItems = useSelector((state: CartState) => state.quantityItems)

  return (
    <header className="py-[2rem] px-[3rem] bg-orange-600 sticky top-0 left-0 right-0 z-50">
      {/* DESKTOP MENU */}
      <nav className="hidden lg:flex justify-between items-center text-white">
        <div className="flex items-center">
          <div className="mr-[1rem] text-black p-[10px] bg-white rounded-[50%]">
            <Image
              src="/images/telephone.png"
              width="30"
              height="30"
              alt="cart button"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[0.9rem]">ORDER NOW!</span>
            <span className="text-[1.3rem] font-bold">012 345 678</span>
          </div>
        </div>

        <ul className="flex gap-[2rem] items-center text-[1.2rem]">
          <li>
            <Link href="/">Homepage</Link>
          </li>
          <li>
            <Link href="#">Products</Link>
          </li>
          <li>
            <Link href="#">Menu</Link>
          </li>
          <li className="text-[1.5rem]">
            <Link href="/">
              <Image
                className="h-auto"
                src="/images/logo.png"
                width="120"
                height="120"
                alt="logo"
              />
            </Link>
          </li>
          <li>
            <Link href="#">Events</Link>
          </li>
          <li>
            <Link href="#">Blog</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
        </ul>

        <Link href="/cart">
          <div className="relative">
            <Image
              src="/images/cart.png"
              width="25"
              height="25"
              alt="cart button"
            />
            <div className="absolute top-[-15px] right-[-4px] text-black font-bold">
              {quantityItems}
            </div>
          </div>
        </Link>
      </nav>
      {/* MOBILE MENU */}
      <nav className="lg:hidden flex justify-between items-center">
        <Link href="/">
          <Image src="/images/logo.png" width="130" height="130" alt="logo" />
        </Link>
        <div
          onClick={() => setToggle(prev => !prev)}
          className="w-[30px] h-[30px] flex flex-col gap-[5px] cursor-pointer z-[99]"
        >
          <span className="bg-white h-[3px]"></span>
          <span className="bg-white h-[3px]"></span>
          <span className="bg-white h-[3px]"></span>
        </div>
      </nav>
      <ul
        className={`bg-orange-600 text-white fixed top-0 right-0 p-[2rem] h-[100vh] w-[60%] flex flex-col items-center pt-[7rem] gap-[4rem] lg:hidden text-[1.5rem] ${
          toggle ? 'translate-x-0' : 'translate-x-[100%]'
        } transition-all`}
      >
        <li className="mt-[3rem]">
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="#">Products</Link>
        </li>
        <li>
          <Link href="#">Menu</Link>
        </li>
        <li>
          <Link href="#">Events</Link>
        </li>
        <li>
          <Link href="#">Blog</Link>
        </li>
        <li>
          <Link href="#">Contact</Link>
        </li>
        <li onClick={() => setToggle(false)}>
          <Link href="/cart">
            <div className="relative">
              <Image
                src="/images/cart.png"
                width="25"
                height="25"
                alt="cart button"
              />
              <div className="absolute top-[-15px] right-[-4px] text-black font-bold">
                {quantityItems}
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Navbar
