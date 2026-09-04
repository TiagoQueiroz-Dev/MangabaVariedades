import { type FormEvent, useMemo, useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowRight,
  BadgePercent,
  Clock,
  MessageCircle,
  PackageSearch,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
} from 'lucide-react'

import { CategoryMosaic } from '../components/catalog/CategoryMosaic'
import { ProductCard } from '../components/catalog/ProductCard'
import { categories, getFeaturedProducts, products } from '../data/catalog'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const featuredProducts = useMemo(() => getFeaturedProducts(), [])
  const deals = products.filter((product) => product.tag === 'oferta')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate({ to: '/produtos', search: { q: query } })
  }

  return (
    <main className="bg-[#f8f8f2]">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-14">
        <div className="flex flex-col justify-center">
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font800 text-[#3f5735] shadow-sm ring-1 ring-black/5">
              <Store className="size-4" />
              Loja de variedades
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e9fb4f] px-4 py-2 text-sm font900 text-[#3f5735]">
              <Sparkles className="size-4" />
              Novidades toda semana
            </span>
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-tight text-[#263021] sm:text-6xl lg:text-7xl">
            Tudo que você precisa em um só lugar.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6759]">
            Encontre achadinhos para casa, cozinha, escola, beleza e presentes. Monte sua lista e consulte a disponibilidade direto com a loja.
          </p>

          <form onSubmit={handleSearch} className="mt-8 flex max-w-xl flex-col gap-3 rounded-[1.4rem] bg-white p-2 shadow-lg ring-1 ring-black/5 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Buscar produtos</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#8a9083]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="O que você procura hoje?"
                className="h-12 w-full rounded-[1rem] border-0 bg-[#f8f8f2] pl-12 pr-4 text-base font700 text-[#263021] outline-none ring-1 ring-transparent transition placeholder:text-[#8a9083] focus:ring-[#99ad17]"
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[1rem] bg-[#f7c51f] px-6 text-sm font900 text-[#263021] transition hover:bg-[#eab80f]"
            >
              Buscar
              <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <TrustItem icon={<BadgePercent className="size-5" />} title="Ofertas fáceis" text="Destaques por preço e procura." />
            <TrustItem icon={<ShieldCheck className="size-5" />} title="Compra segura" text="Confirme antes de fechar." />
            <TrustItem icon={<MessageCircle className="size-5" />} title="Atendimento direto" text="Lista pronta para WhatsApp." />
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-3 shadow-xl ring-1 ring-black/5">
          <CategoryMosaic />
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">
          <StoreMetric value={`${categories.length}+`} label="categorias organizadas" />
          <StoreMetric value="R$ 10" label="atalho para achadinhos" />
          <StoreMetric value="1 lista" label="para consultar vários itens" />
        </div>
      </section>

      <section id="novidades" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font900 uppercase text-[#99ad17]">Novidades</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#263021] sm:text-4xl">
              Produtos que merecem vitrine
            </h2>
          </div>
          <Link
            to="/produtos"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font900 text-[#263021] transition hover:bg-[#e9fb4f]"
          >
            Ver catálogo
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[#263021]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 text-white sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font900 uppercase text-[#e9fb4f]">Achadinhos</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Preço baixo precisa aparecer rápido.</h2>
            <p className="mt-4 leading-7 text-white/72">
              Quem entra numa loja de variedades quer bater o olho e sentir que vale a pena explorar. Por isso deixamos ofertas, novidades e categorias sempre visíveis.
            </p>
            <Link
              to="/produtos"
              search={{ deal: true }}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#f7c51f] px-6 text-sm font900 text-[#263021] transition hover:bg-[#eab80f]"
            >
              Ver ofertas
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {deals.map((product) => (
              <div key={product.id} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10">
                <div className="mb-5 inline-flex rounded-full bg-[#e9fb4f] px-3 py-1 text-xs font900 text-[#3f5735]">
                  Oferta ativa
                </div>
                <h3 className="text-xl font900">{product.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <RetentionCard
          icon={<PackageSearch className="size-6" />}
          title="Busca antes do scroll"
          text="O visitante não precisa caçar o campo de busca. Ele chega e já consegue procurar pelo que veio comprar."
        />
        <RetentionCard
          icon={<BadgePercent className="size-6" />}
          title="Ofertas com atalho"
          text="Promoção, novidade e item popular aparecem como filtros de intenção, não como enfeite."
        />
        <RetentionCard
          icon={<Clock className="size-6" />}
          title="Menos atrito para pedir"
          text="A lista de orçamento guarda itens no navegador e prepara uma mensagem de consulta."
        />
      </section>
    </main>
  )
}

function TrustItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 text-[#99ad17]">{icon}</div>
      <p className="font900 text-[#263021]">{title}</p>
      <p className="mt-1 text-sm leading-5 text-[#68705f]">{text}</p>
    </div>
  )
}

function StoreMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <strong className="text-3xl font-black text-[#3f5735]">{value}</strong>
      <span className="text-sm font800 uppercase text-[#68705f]">{label}</span>
    </div>
  )
}

function RetentionCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-[#e9fb4f] text-[#3f5735]">{icon}</div>
      <h3 className="text-xl font900 text-[#263021]">{title}</h3>
      <p className="mt-3 leading-7 text-[#68705f]">{text}</p>
    </article>
  )
}
