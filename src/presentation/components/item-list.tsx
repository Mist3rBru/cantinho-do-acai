import { formatCurrency } from '@brazilian-utils/brazilian-utils'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { ComplementEvent, ComplementState } from '../pages'

export interface ItemListProps {
  title: string
  complements: ComplementState[]
  addComplementEvent: (event: ComplementEvent) => void
}

export function ItemList(props: ItemListProps): JSX.Element {
  const { title, complements, addComplementEvent } = props

  return (
    <div className="flex flex-col gap-2 rounded border border-amber-400/90 p-2 even:border-amber-700">
      <div className="m-1 text-white">
        <h2 className="text-xl font-bold">{title}:</h2>
        <p className="text-sm">Escolha até {complements[0].max} opções</p>
      </div>
      {complements.map(complement => (
        <div
          key={complement.name}
          className="flex justify-between gap-2 rounded border border-black bg-zinc-100 p-2"
        >
          <p>{complement.name}</p>
          <div className="flex gap-1">
            {complement.price && (
              <div>
                {complement.count > 0 && '+'}R$
                {formatCurrency(
                  complement.count > 0
                    ? complement.price * complement.count
                    : complement.price
                )}
              </div>
            )}
            <button
              onClick={() =>
                addComplementEvent({
                  type: 'REMOVE',
                  complement: complement.name
                })
              }
            >
              <BiMinus size={20} className="text-red-500" />
            </button>
            <span>{complement.count}</span>
            <button
              onClick={() =>
                addComplementEvent({
                  type: 'ADD',
                  complement: complement.name
                })
              }
            >
              <BiPlus size={20} className="text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
