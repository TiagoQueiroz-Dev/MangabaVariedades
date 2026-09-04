import {
  BookOpen,
  CheckCircle2,
  Heart,
  Home,
  Package,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  Utensils,
} from 'lucide-react'

import type { Product } from '../../data/catalog'
import { getCategory } from '../../data/catalog'
import { formatCurrency } from '../../lib/format'
import { useQuoteCart } from './QuoteCart'

type ProductCardProps = {
  product: Product
}

const categoryIcons = {
  casa: Home,
  cozinha: Utensils,
  escolar: BookOpen,
  maquiagem: Sparkles,
  brinquedos: Package,
  utilidades: ShoppingBag,
}

const tagLabels = {
  novo: 'Novo',
  oferta: 'Oferta',
  'mais-vendido': 'Mais vendido',
}

const availabilityLabels = {
  disponivel: 'Disponível',
  'ultimas-unidades': 'Últimas unidades',
  'sob-consulta': 'Sob consulta',
}

export function ProductCard({ product }: ProductCardProps) {
  const category = getCategory(product.categoryId)
  const Icon = categoryIcons[product.categoryId as keyof typeof categoryIcons] ?? ShoppingBag
  const { addItem, hasItem } = useQuoteCart()
  const isInQuote = hasItem(product.id)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${product.visualTone}`}>
        <div className="absolute left-4 top-4 flex gap-2">
          {product.tag && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font900 text-[#3f5735] shadow-sm">
              <Tag className="size-3" />
              {tagLabels[product.tag]}
            </span>
          )}
        </div>
        <button
          type="button"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 text-[#3f5735] shadow-sm transition hover:bg-white"
          aria-label="Salvar produto"
        >
          <Heart className="size-4" />
        </button>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <div className="rounded-2xl bg-white/88 p-4 shadow-sm backdrop-blur">
            <Icon className="size-12 text-[#3f5735]" strokeWidth={1.8} />
          </div>
          {category && (
            <span className="rounded-full px-3 py-1 text-xs font900 shadow-sm" style={{ background: category.color, color: category.textColor }}>
              {category.shortLabel}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2 text-sm text-[#68705f]">
          <span className="inline-flex items-center gap-1 font800 text-[#3f5735]">
            <Star className="size-4 fill-[#f7c51f] text-[#f7c51f]" />
            {product.rating.toFixed(1)}
          </span>
          <span>({product.reviewCount})</span>
          <span className="ml-auto inline-flex items-center gap-1 text-xs font800">
            <CheckCircle2 className="size-4 text-[#99ad17]" />
            {availabilityLabels[product.availability]}
          </span>
        </div>

        <h3 className="text-lg font900 leading-tight text-[#263021]">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#68705f]">{product.description}</p>

        <ul className="mt-4 grid gap-1.5 text-sm text-[#3f5735]">
          {product.highlights.slice(0, 2).map((highlight) => (
            <li key={highlight} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#99ad17]" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-end gap-2">
            <strong className="text-2xl font-black text-[#263021]">{formatCurrency(product.price)}</strong>
            {product.oldPrice && (
              <span className="pb-1 text-sm font700 text-[#8a9083] line-through">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => addItem(product)}
            className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font900 transition ${
              isInQuote
                ? 'bg-[#3f5735] text-white hover:bg-[#2f4328]'
                : 'bg-[#f7c51f] text-[#263021] hover:bg-[#eab80f]'
            }`}
          >
            <Plus className="size-4" />
            {isInQuote ? 'Adicionar mais um' : 'Adicionar à lista'}
          </button>
        </div>
      </div>
    </article>
  )
}
