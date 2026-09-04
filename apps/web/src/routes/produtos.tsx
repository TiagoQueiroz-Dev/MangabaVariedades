import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { BadgePercent, PackageSearch, Search, SlidersHorizontal, X } from 'lucide-react'

import { ProductCard } from '../components/catalog/ProductCard'
import { categories, getCategory, products } from '../data/catalog'
import { normalizeText } from '../lib/format'

type ProductsSearch = {
  q?: string
  category?: string
  deal?: boolean
}

export const Route = createFileRoute('/produtos')({
  validateSearch: (search: Record<string, unknown>): ProductsSearch => ({
    q: typeof search.q === 'string' ? search.q : '',
    category: typeof search.category === 'string' ? search.category : '',
    deal: search.deal === true || search.deal === 'true',
  }),
  component: ProductsPage,
})

function ProductsPage() {
  const search = Route.useSearch()
  const [query, setQuery] = useState(search.q ?? '')
  const [categoryId, setCategoryId] = useState(search.category ?? '')
  const [dealOnly, setDealOnly] = useState(Boolean(search.deal))
  const [sortBy, setSortBy] = useState<'relevancia' | 'menor-preco' | 'maior-preco' | 'novidades'>('relevancia')

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeText(query)

    return products
      .filter((product) => {
        const category = getCategory(product.categoryId)
        const searchableText = normalizeText(
          [product.name, product.description, category?.name, product.highlights.join(' ')].join(' '),
        )

        return (
          (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
          (!categoryId || product.categoryId === categoryId) &&
          (!dealOnly || product.tag === 'oferta')
        )
      })
      .sort((a, b) => {
        if (sortBy === 'menor-preco') return a.price - b.price
        if (sortBy === 'maior-preco') return b.price - a.price
        if (sortBy === 'novidades') return Number(b.tag === 'novo') - Number(a.tag === 'novo')
        return Number(Boolean(b.tag)) - Number(Boolean(a.tag))
      })
  }, [categoryId, dealOnly, query, sortBy])

  const activeCategory = categoryId ? getCategory(categoryId) : undefined

  function clearFilters() {
    setQuery('')
    setCategoryId('')
    setDealOnly(false)
    setSortBy('relevancia')
  }

  return (
    <main className="min-h-screen bg-[#f8f8f2]">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font900 uppercase text-[#99ad17]">Catálogo</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-[#263021] sm:text-5xl">
                Ache rápido. Compare fácil. Consulte sem enrolação.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#68705f]">
                Produtos organizados por intenção de compra, com preço visível e lista de orçamento sempre à mão.
              </p>
            </div>

            <div className="rounded-3xl bg-[#263021] p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-[#e9fb4f] text-[#3f5735]">
                  <SlidersHorizontal className="size-6" />
                </div>
                <div>
                  <p className="font900">Filtros úteis, não decorativos</p>
                  <p className="mt-1 text-sm text-white/70">Categoria, promoção, busca e ordenação cobrem a primeira versão.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[17rem_1fr] lg:px-8">
        <aside className="h-fit rounded-3xl border border-black/10 bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font900 text-[#263021]">Filtrar</h2>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font800 text-[#68705f] underline-offset-4 hover:text-[#263021] hover:underline"
            >
              Limpar
            </button>
          </div>

          <label className="relative block">
            <span className="sr-only">Buscar no catálogo</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#8a9083]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar produto"
              className="h-12 w-full rounded-2xl border border-black/10 bg-[#f8f8f2] pl-12 pr-4 font700 outline-none transition focus:border-[#99ad17] focus:bg-white"
            />
          </label>

          <div className="mt-6">
            <p className="mb-3 text-sm font900 uppercase text-[#68705f]">Categorias</p>
            <div className="space-y-2">
              <FilterOption label="Todas" checked={!categoryId} onClick={() => setCategoryId('')} />
              {categories.map((category) => (
                <FilterOption
                  key={category.id}
                  label={category.name}
                  checked={categoryId === category.id}
                  onClick={() => setCategoryId(category.id)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-black/10 pt-6">
            <button
              type="button"
              onClick={() => setDealOnly((value) => !value)}
              className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left font800 transition ${
                dealOnly ? 'bg-[#e9fb4f] text-[#3f5735]' : 'bg-[#f8f8f2] text-[#5f6759] hover:bg-[#eef0e6]'
              }`}
            >
              <BadgePercent className="size-5" />
              Somente ofertas
            </button>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font900 text-[#263021]">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {activeCategory && <ActiveChip label={activeCategory.name} onClick={() => setCategoryId('')} />}
                {dealOnly && <ActiveChip label="Ofertas" onClick={() => setDealOnly(false)} />}
                {query && <ActiveChip label={`Busca: ${query}`} onClick={() => setQuery('')} />}
              </div>
            </div>

            <label className="flex items-center gap-3">
              <span className="text-sm font800 text-[#68705f]">Ordenar</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
                className="h-11 rounded-2xl border border-black/10 bg-[#f8f8f2] px-4 text-sm font800 text-[#263021] outline-none transition focus:border-[#99ad17] focus:bg-white"
              >
                <option value="relevancia">Relevância</option>
                <option value="novidades">Novidades</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
              </select>
            </label>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid min-h-96 place-items-center rounded-3xl border border-dashed border-black/15 bg-white p-8 text-center">
              <div>
                <PackageSearch className="mx-auto mb-4 size-12 text-[#99ad17]" />
                <h2 className="text-2xl font900 text-[#263021]">Nenhum produto encontrado</h2>
                <p className="mt-3 max-w-md leading-7 text-[#68705f]">
                  Tente limpar os filtros ou buscar por uma categoria mais ampla.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#f7c51f] px-5 text-sm font900 text-[#263021] transition hover:bg-[#eab80f]"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function FilterOption({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm font800 transition ${
        checked ? 'bg-[#e9fb4f] text-[#3f5735]' : 'text-[#5f6759] hover:bg-[#f8f8f2] hover:text-[#263021]'
      }`}
    >
      {label}
      <span className={`size-3 rounded-full ${checked ? 'bg-[#3f5735]' : 'bg-black/10'}`} />
    </button>
  )
}

function ActiveChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-[#e9fb4f] px-3 py-1 text-xs font900 text-[#3f5735]"
    >
      {label}
      <X className="size-3" />
    </button>
  )
}
