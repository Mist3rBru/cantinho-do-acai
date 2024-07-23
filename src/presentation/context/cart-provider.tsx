import { exhaustive } from 'exhaustive'
import { createContext, useContext, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { Complement, Product } from '../types'

interface CartItem {
  product: Product
  complements: Complement[]
  quantity: number
  total: number
}

type CartEvent =
  | {
      type: 'ADD'
      item: Omit<CartItem, 'total'>
    }
  | {
      type: 'REMOVE'
      index: number
    }

interface ICartContext {
  addCartEvent: (event: CartEvent) => void
  cart: CartItem[]
}

const CartContext = createContext<ICartContext>({
  cart: [],
  addCartEvent() {},
})

function cartReducer(state: CartItem[], event: CartEvent): CartItem[] {
  return exhaustive(event, 'type', {
    ADD: ({ item }) => {
      let total = item.product.price

      for (const complement of item.complements) {
        total += (complement.price ?? 0) * complement.count
      }

      return [...state, { ...item, total }]
    },
    REMOVE: e => state.filter((_, i) => i !== e.index),
  })
}

export function CartProvider(props: {
  children: ReactNode
}): React.JSX.Element {
  const [cart, addCartEvent] = useReducer(cartReducer, [])

  const context = useMemo<ICartContext>(() => ({ cart, addCartEvent }), [cart])

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  )
}

export function useCart(): ICartContext {
  return useContext(CartContext)
}
