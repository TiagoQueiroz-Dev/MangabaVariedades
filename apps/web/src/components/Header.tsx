import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ChevronDown, Headphones, Home, Menu, PackageSearch, Phone, Search, Sparkles, Truck, X } from 'lucide-react'

import { BrandMark } from './catalog/BrandMark'
import { QuoteDrawer } from './catalog/QuoteCart'
import { categories } from '../data/catalog'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate({ to: '/produtos', search: { q: query } })
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white">
        <div className="hidden border-b border-black/10 bg-[#f8f8f2] text-xs font800 uppercase text-[#5f6759] lg:block">
          <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-8">
            <span className="inline-flex items-center gap-2">
              <Truck className="size-3.5" />
              Retire na loja ou consulte entrega
            </span>
            <span className="inline-flex items-center gap-5">
              <Link to="/contato" className="hover:text-[#263021]">Ajuda e suporte</Link>
              <a href="/#novidades" className="hover:text-[#263021]">Novidades da semana</a>
            </span>
          </div>
        </div>

        <div className="mx-auto grid min-h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[15rem_1fr_auto] lg:px-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-black/10 text-[#263021] transition hover:bg-black/5 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </button>

            <Link to="/" className="flex items-center">
              <BrandMark />
            </Link>
          </div>

          <form onSubmit={handleSearch} className="order-3 col-span-3 flex rounded-xl border border-black/10 bg-white shadow-sm lg:order-none lg:col-span-1">
            <label className="relative flex-1">
              <span className="sr-only">Buscar produtos</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar utilidades, presentes, cozinha..."
                className="h-12 w-full rounded-l-xl border-0 px-4 pr-12 text-sm font700 text-[#263021] outline-none placeholder:text-[#8a9083]"
              />
            </label>
            <button
              type="submit"
              className="grid h-12 w-14 place-items-center rounded-r-xl bg-[#f7c51f] text-[#263021] transition hover:bg-[#eab80f]"
              aria-label="Buscar"
            >
              <Search className="size-5" />
            </button>
          </form>

          <div className="flex items-center gap-3">
            <Link
              to="/produtos"
              search={{ deal: true }}
              className="hidden h-11 items-center gap-2 rounded-full bg-[#e9fb4f] px-4 text-sm font900 text-[#3f5735] transition hover:bg-[#d9ee38] md:inline-flex"
            >
              <Sparkles className="size-4" />
              Ofertas
            </Link>
            <Link
              to="/contato"
              className="hidden h-11 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font900 text-[#263021] transition hover:bg-[#f8f8f2] xl:inline-flex"
            >
              <Headphones className="size-4" />
              Atendimento
            </Link>
            <QuoteDrawer />
          </div>
        </div>

        <nav className="hidden bg-[#f19500] text-white shadow-sm lg:block">
          <div className="mx-auto flex h-12 max-w-7xl items-center gap-1 px-8">
            <div className="group relative h-full">
              <Link
                to="/produtos"
                className="flex h-full items-center gap-2 px-4 text-sm font900 uppercase transition hover:bg-black/10"
              >
                Departamentos
                <ChevronDown className="size-4" />
              </Link>
              <div className="invisible absolute left-0 top-12 z-50 w-[52rem] translate-y-2 rounded-b-2xl bg-white p-6 text-[#263021] opacity-0 shadow-2xl ring-1 ring-black/10 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="grid grid-cols-3 gap-6">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to="/produtos"
                      search={{ category: category.id }}
                      className="rounded-2xl p-4 transition hover:bg-[#f8f8f2]"
                    >
                      <span className="font900">{category.name}</span>
                      <span className="mt-2 block text-sm leading-6 text-[#68705f]">{category.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                to="/produtos"
                search={{ category: category.id }}
                className="flex h-full items-center gap-1 px-3 text-sm font900 uppercase transition hover:bg-black/10"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-80 max-w-[88vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 p-4">
          <BrandMark />
          <button
            onClick={() => setIsOpen(false)}
            className="grid size-10 place-items-center rounded-full border border-black/10 text-[#263021] transition hover:bg-black/5"
            aria-label="Fechar menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-2xl p-3 font800 text-[#5f6759] transition hover:bg-[#f8f8f2] hover:text-[#263021]"
            activeProps={{
              className:
                'flex items-center gap-3 rounded-2xl bg-[#e9fb4f] p-3 font900 text-[#3f5735]',
            }}
          >
            <Home className="size-5" />
            Inicio
          </Link>
          <Link
            to="/produtos"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-2xl p-3 font800 text-[#5f6759] transition hover:bg-[#f8f8f2] hover:text-[#263021]"
            activeProps={{
              className:
                'flex items-center gap-3 rounded-2xl bg-[#e9fb4f] p-3 font900 text-[#3f5735]',
            }}
          >
            <PackageSearch className="size-5" />
            Produtos
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/produtos"
              search={{ category: category.id }}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-2xl p-3 font800 text-[#5f6759] transition hover:bg-[#f8f8f2] hover:text-[#263021]"
            >
              <span className="size-2 rounded-full" style={{ background: category.color }} />
              {category.name}
            </Link>
          ))}
          <Link
            to="/contato"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-2xl p-3 font800 text-[#5f6759] transition hover:bg-[#f8f8f2] hover:text-[#263021]"
            activeProps={{
              className:
                'flex items-center gap-3 rounded-2xl bg-[#e9fb4f] p-3 font900 text-[#3f5735]',
            }}
          >
            <Phone className="size-5" />
            Contato
          </Link>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/35"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
