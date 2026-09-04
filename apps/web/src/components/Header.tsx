import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Home, Menu, PackageSearch, Phone, Sparkles, X } from 'lucide-react'

import { BrandMark } from './catalog/BrandMark'
import { QuoteDrawer } from './catalog/QuoteCart'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/92 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsOpen(true)}
            className="grid size-11 place-items-center rounded-full border border-black/10 text-[#263021] transition hover:bg-black/5 lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <NavLink to="/">Início</NavLink>
            <NavLink to="/produtos">Produtos</NavLink>
            <a href="/#novidades" className="text-sm font800 text-[#5f6759] transition hover:text-[#263021]">
              Novidades
            </a>
            <NavLink to="/contato">Contato</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/produtos"
              search={{ deal: true }}
              className="hidden h-11 items-center gap-2 rounded-full bg-[#e9fb4f] px-4 text-sm font900 text-[#3f5735] transition hover:bg-[#d9ee38] sm:inline-flex"
            >
              <Sparkles className="size-4" />
              Ofertas
            </Link>
            <QuoteDrawer />
          </div>
        </div>
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

function NavLink({ to, children }: { to: '/' | '/produtos' | '/contato'; children: string }) {
  return (
    <Link
      to={to}
      className="text-sm font800 text-[#5f6759] transition hover:text-[#263021]"
      activeProps={{ className: 'text-sm font900 text-[#263021]' }}
    >
      {children}
    </Link>
  )
}
