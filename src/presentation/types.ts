export type Category<
  TProduct extends Product = Product,
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-object-type
  TExtras extends Record<string, unknown> = {},
> = {
  path: string
  products: TProduct[]
} & TExtras

export interface Product {
  img: string
  name: string
  quantity: number
  price: number
  people: number
}

export interface ComplementState {
  name: string
  count: number
  total: number
  max: number
  price?: number
}

export interface ComplementEvent {
  type: 'ADD' | 'REMOVE'
  complement: string
}
