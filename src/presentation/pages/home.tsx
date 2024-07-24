import { categories, slang } from '@/presentation/data'
import { Link } from 'react-router-dom'

export function HomePage(): React.JSX.Element {
  return (
    <>
      <img
        src="/img/logo.png"
        alt="logo cantinho do açaí"
        className="mx-auto mb-8 h-48 sm:h-56"
      />
      <div className="mx-auto flex w-full flex-col gap-10">
        {Object.entries(categories).map(([name, { path, products }]) => (
          <div key={name}>
            <h1 className="mb-4 border-b-2 border-amber-600 p-1 font-raleway text-2xl text-white/90">
              {name}
            </h1>
            <div className="gap grid grid-cols-1 gap-4 md:grid-cols-2">
              {products.map(product => (
                <Link
                  key={slang(product.name)}
                  to={`${path}/${product.slang}`}
                  className="h-[350px] rounded-xl border-2 border-violet-500/90 p-2 transition hover:-translate-y-1 hover:border-amber-400"
                  title={`Selecionar ${product.name}`}
                >
                  <div className="relative flex h-full justify-center overflow-hidden rounded-xl">
                    <img
                      src={product.img}
                      alt={`Imagem ${product.name}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-zinc-50/80 p-6">
                      <div>
                        <h2 className="text-xl font-bold text-black">
                          {product.name}
                        </h2>
                        <p className="text md:text-base">
                          {product.people === 1
                            ? 'Serve uma pessoa'
                            : `Serve até ${product.people} pessoas`}
                          .{' '}
                          {!!product.quantity && `(aprox.${product.quantity}g)`}
                        </p>
                      </div>
                      <span className="block whitespace-nowrap font-poppins text-xl font-semibold tracking-tighter">
                        R$ {product.price},00
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
