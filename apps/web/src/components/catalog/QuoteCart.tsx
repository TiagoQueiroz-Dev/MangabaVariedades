import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { Check, Copy, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'

import type { Product } from '../../data/catalog'
import { formatCurrency } from '../../lib/format'

type QuoteItem = {
  product: Product
  quantity: number
}

type QuoteCartContextValue = {
  items: QuoteItem[]
  totalItems: number
  subtotal: number
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  decreaseItem: (productId: string) => void
  clear: () => void
  hasItem: (productId: string) => boolean
}

const QuoteCartContext = createContext<QuoteCartContextValue | null>(null)
const STORAGE_KEY = 'mangaba-quote-cart'

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    if (typeof window === 'undefined') return []

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as QuoteItem[]) : []
    } catch {
      return []
    }
  })

  function persist(nextItems: QuoteItem[]) {
    setItems(nextItems)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems))
    }
  }

  function addItem(product: Product) {
    const existing = items.find((item) => item.product.id === product.id)
    const nextItems = existing
      ? items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [...items, { product, quantity: 1 }]

    persist(nextItems)
  }

  function removeItem(productId: string) {
    persist(items.filter((item) => item.product.id !== productId))
  }

  function decreaseItem(productId: string) {
    persist(
      items
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function clear() {
    persist([])
  }

  const value = useMemo<QuoteCartContextValue>(
    () => ({
      items,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.product.price * item.quantity, 0),
      addItem,
      removeItem,
      decreaseItem,
      clear,
      hasItem: (productId: string) => items.some((item) => item.product.id === productId),
    }),
    [items],
  )

  return <QuoteCartContext.Provider value={value}>{children}</QuoteCartContext.Provider>
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext)
  if (!context) {
    throw new Error('useQuoteCart must be used within QuoteCartProvider')
  }

  return context
}

export function QuoteDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { items, totalItems, subtotal, addItem, decreaseItem, removeItem, clear } = useQuoteCart()

  const message = buildQuoteMessage(items, subtotal)
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    : undefined

  async function copyMessage() {
    await navigator.clipboard.writeText(message)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative inline-flex h-11 items-center gap-2 rounded-full bg-[#3f5735] px-4 text-sm font800 text-white shadow-sm transition hover:bg-[#2f4328]"
      >
        <ShoppingBag className="size-4" />
        <span className="hidden sm:inline">Orçamento</span>
        {totalItems > 0 && (
          <span className="grid min-w-6 place-items-center rounded-full bg-[#e9fb4f] px-1.5 py-0.5 text-xs font-black text-[#3f5735]">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Fechar orçamento"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/35"
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <div>
                <p className="text-sm font700 uppercase text-[#99ad17]">Minha lista</p>
                <h2 className="text-xl font900 text-[#263021]">Pedido para consulta</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-black/10 text-[#263021] transition hover:bg-black/5"
                aria-label="Fechar"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-black/15 bg-[#f8f8f2] p-8 text-center">
                  <div>
                    <ShoppingBag className="mx-auto mb-4 size-10 text-[#99ad17]" />
                    <h3 className="text-lg font800 text-[#263021]">Sua lista está vazia</h3>
                    <p className="mt-2 text-sm leading-6 text-[#68705f]">
                      Adicione produtos para montar uma consulta rápida de disponibilidade.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
                    >
                      <div className="flex gap-3">
                        <div
                          className={`grid size-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${item.product.visualTone}`}
                        >
                          <ShoppingBag className="size-7 text-[#3f5735]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font800 leading-snug text-[#263021]">{item.product.name}</p>
                          <p className="mt-1 text-sm font700 text-[#3f5735]">
                            {formatCurrency(item.product.price)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-black/10">
                          <button
                            type="button"
                            onClick={() => decreaseItem(item.product.id)}
                            className="grid size-9 place-items-center text-[#263021] transition hover:bg-black/5"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="min-w-8 text-center text-sm font800">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => addItem(item.product)}
                            className="grid size-9 place-items-center text-[#263021] transition hover:bg-black/5"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font700 text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-black/10 bg-[#f8f8f2] p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font700 text-[#68705f]">Estimativa</span>
                <strong className="text-xl font900 text-[#263021]">{formatCurrency(subtotal)}</strong>
              </div>
              <div className="grid gap-2">
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#f7c51f] px-5 text-sm font900 text-[#263021] transition hover:bg-[#eab80f]"
                  >
                    <MessageCircle className="size-5" />
                    Enviar pelo WhatsApp
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#f7c51f]/70 px-5 text-sm font900 text-[#263021]/70"
                    title="Configure VITE_WHATSAPP_NUMBER para ativar o envio direto."
                  >
                    <MessageCircle className="size-5" />
                    WhatsApp a configurar
                  </button>
                )}
                <button
                  type="button"
                  onClick={copyMessage}
                  disabled={items.length === 0}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font800 text-[#263021] transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? 'Lista copiada' : 'Copiar lista'}
                </button>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clear}
                    className="text-sm font700 text-[#68705f] underline-offset-4 hover:text-[#263021] hover:underline"
                  >
                    Limpar lista
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

function buildQuoteMessage(items: QuoteItem[], subtotal: number) {
  if (items.length === 0) {
    return 'Olá! Gostaria de consultar produtos da Mangaba Variedades.'
  }

  const productLines = items
    .map((item) => `- ${item.quantity}x ${item.product.name} (${formatCurrency(item.product.price)})`)
    .join('\n')

  return `Olá! Gostaria de consultar disponibilidade destes produtos:\n\n${productLines}\n\nEstimativa: ${formatCurrency(subtotal)}`
}
