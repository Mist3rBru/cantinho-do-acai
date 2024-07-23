import { useMemo } from 'react'
import { ComplementList, OrderButton } from '../components'
import { useCart } from '../context'
import { paletaCategory } from '../data'
import { useComplements } from '../hooks'

export function PaletaPage(): React.JSX.Element {
  const paleta = paletaCategory.products[0]

  const { addCartEvent } = useCart()

  const [flavors, addFlavorEvent] = useComplements(paletaCategory.flavors, 20)

  const total = useMemo(() => {
    let result = 0

    for (const flavor of flavors.complements) {
      if (flavor.price !== undefined) {
        result += flavor.count * flavor.price
      }
    }

    return result
  }, [flavors])

  return (
    <>
      <div className="flex flex-col gap-8">
        <ComplementList
          addComplementEvent={addFlavorEvent}
          ctx={flavors}
          title="Sabores"
        />
      </div>
      <OrderButton
        product={paleta}
        totalPrice={total}
        onOrder={quantity =>
          addCartEvent({
            type: 'ADD',
            item: {
              product: paleta,
              complements: flavors.complements.filter(f => f.count > 0),
              quantity,
            },
          })
        }
      />
    </>
  )
}
