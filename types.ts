export type CartProduct = {
  id: string
  image: { path: string; filename: string }
  name: string
  description: string
  quantity: number
  price: number
  extras: { text: string; price: number }[]
}

export type CartState = {
  items: CartProduct[]
  quantityItems: number
}

export type Product = {
  _id: string
  image: { path: string; filename: string }
  title: string
  description: string
  prices: number[]
  extras: { _id: string; text: string; price: number }[]
}

export type Order = {
  _id: string
  customer: string
  address: string
  total: number
  status: number
}
