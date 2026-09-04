import { useMemo } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, BadgePercent, Clock, Flame, PackageSearch, Sparkles, Store } from 'lucide-react'

import { CategoryMosaic } from '../components/catalog/CategoryMosaic'
import { ProductCard } from '../components/catalog/ProductCard'
import { PromoBanners } from '../components/catalog/PromoBanners'
import { QuickFilters } from '../components/catalog/QuickFilters'
import { categories, getDealProducts, getFeaturedProducts, getProductsUnder, products } from '../data/catalog'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const featuredProducts = useMemo(() => getFeaturedProducts(), [])
  const deals = useMemo(() => getDealProducts(), [])
  const underTen = useMemo(() => getProductsUnder(10), [])

  return (
    <main className="bg-[#f8f8f2]">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <QuickFilters />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <PromoBanners />
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        <RetailPill icon={<Store className="size-5" />} title="Retire na loja" text="Consulte disponibilidade antes de sair." />
        <RetailPill icon={<BadgePercent className="size-5" />} title="Ofertas visíveis" text="Produtos com preço bom ganham destaque." />
        <RetailPill icon={<PackageSearch className="size-5" />} title="Busca rápida" text="Encontre por categoria, uso ou produto." />
        <RetailPill icon={<Clock className="size-5" />} title="Lista prática" text="Monte uma consulta em poucos cliques." />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font900 uppercase text-[#f19500]">Departamentos</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-[#263021] sm:text-4xl">
                Entre pelo corredor certo.
              </h1>
            </div>
            <Link
              to="/produtos"
              className="hidden h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font900 text-[#263021] transition hover:bg-[#e9fb4f] sm:inline-flex"
            >
              Todos
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <CategoryMosaic />
        </div>

        <div>
          <SectionHeading eyebrow="Mais procurados" title="Produtos para bater o olho e pedir" to="/produtos" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div className="rounded-3xl bg-[#263021] p-6 text-white">
            <Flame className="mb-5 size-8 text-[#f7c51f]" />
            <p className="text-sm font900 uppercase text-[#e9fb4f]">Garimpo rápido</p>
            <h2 className="mt-2 text-3xl font-black">Achadinhos até R$ 10</h2>
            <p className="mt-3 leading-7 text-white/72">
              Esse bloco existe para compra por impulso boa: item barato, útil e fácil de adicionar à lista.
            </p>
            <Link
              to="/produtos"
              search={{ maxPrice: 10 }}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#f7c51f] px-5 text-sm font900 text-[#263021] transition hover:bg-[#eab80f]"
            >
              Ver até R$ 10
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {underTen.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="novidades" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Promoções"
          title="Ofertas e novidades da semana"
          to="/produtos"
          search={{ deal: true }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...deals, ...products.filter((product) => product.tag === 'novo')].slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#e9fb4f] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Sparkles className="mb-4 size-8 text-[#3f5735]" />
              <h2 className="text-3xl font-black text-[#263021]">Loja de variedades precisa ter atalhos.</h2>
              <p className="mt-3 leading-7 text-[#3f5735]">
                A primeira tela agora entrega busca, departamentos, promoções e produtos. Menos discurso, mais vitrine.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  to="/produtos"
                  search={{ category: category.id }}
                  className="rounded-2xl bg-white/80 p-4 text-[#263021] shadow-sm transition hover:bg-white"
                >
                  <span className="text-sm font900">{category.shortLabel}</span>
                  <span className="mt-1 block text-xs font700 text-[#68705f]">{category.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function RetailPill({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fff1c2] text-[#f19500]">{icon}</div>
      <div>
        <p className="font900 text-[#263021]">{title}</p>
        <p className="mt-1 text-sm leading-5 text-[#68705f]">{text}</p>
      </div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  to,
  search,
}: {
  eyebrow: string
  title: string
  to: '/produtos'
  search?: { category?: string; deal?: boolean; maxPrice?: number; q?: string }
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font900 uppercase text-[#f19500]">{eyebrow}</p>
        <h2 className="mt-1 text-3xl font-black tracking-tight text-[#263021]">{title}</h2>
      </div>
      <Link
        to={to}
        search={search}
        className="hidden h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font900 text-[#263021] transition hover:bg-[#e9fb4f] sm:inline-flex"
      >
        Ver mais
        <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}
