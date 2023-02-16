import { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main className="min-h-[70vh]">
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}

export default Layout
