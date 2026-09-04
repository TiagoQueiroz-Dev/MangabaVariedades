import { Link } from '@tanstack/react-router'
import {
  BadgePercent,
  Bath,
  BookOpen,
  Gift,
  Home,
  Package,
  Paintbrush,
  Shirt,
  Sparkles,
  Utensils,
} from 'lucide-react'

type Shortcut = {
  label: string
  hint: string
  icon: React.ReactNode
  search: {
    q?: string
    category?: string
    deal?: boolean
    maxPrice?: number
  }
  tone: string
}

const shortcuts: Shortcut[] = [
  {
    label: 'Ofertas',
    hint: 'preço melhor',
    icon: <BadgePercent className="size-5" />,
    search: { deal: true },
    tone: 'bg-[#fff1c2] text-[#6b4600]',
  },
  {
    label: 'Até R$ 10',
    hint: 'achadinhos',
    icon: <Sparkles className="size-5" />,
    search: { maxPrice: 10 },
    tone: 'bg-[#e9fb4f] text-[#3f5735]',
  },
  {
    label: 'Casa',
    hint: 'organização',
    icon: <Home className="size-5" />,
    search: { category: 'casa' },
    tone: 'bg-[#eef6e9] text-[#3f5735]',
  },
  {
    label: 'Cozinha',
    hint: 'utensílios',
    icon: <Utensils className="size-5" />,
    search: { category: 'cozinha' },
    tone: 'bg-[#eaf7f0] text-[#31563e]',
  },
  {
    label: 'Banheiro',
    hint: 'acessórios',
    icon: <Bath className="size-5" />,
    search: { category: 'banheiro' },
    tone: 'bg-[#e7f5ff] text-[#21465f]',
  },
  {
    label: 'Festa',
    hint: 'lembranças',
    icon: <Gift className="size-5" />,
    search: { category: 'festa' },
    tone: 'bg-[#fff0db] text-[#8a4a00]',
  },
  {
    label: 'Escolar',
    hint: 'papelaria',
    icon: <BookOpen className="size-5" />,
    search: { category: 'escolar' },
    tone: 'bg-[#edf2ff] text-[#34436b]',
  },
  {
    label: 'Lavanderia',
    hint: 'limpeza',
    icon: <Shirt className="size-5" />,
    search: { category: 'lavanderia' },
    tone: 'bg-[#edfbea] text-[#3f5735]',
  },
  {
    label: 'Decoração',
    hint: 'ambiente',
    icon: <Paintbrush className="size-5" />,
    search: { category: 'decoracao' },
    tone: 'bg-[#fff2d8] text-[#6b4600]',
  },
  {
    label: 'Brinquedos',
    hint: 'presentes',
    icon: <Package className="size-5" />,
    search: { category: 'brinquedos' },
    tone: 'bg-[#f4f0ff] text-[#493775]',
  },
]

export function QuickFilters({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className={`grid min-w-max grid-flow-col gap-3 ${compact ? 'auto-cols-[8.6rem]' : 'auto-cols-[9.7rem]'}`}>
        {shortcuts.map((shortcut) => (
          <Link
            key={shortcut.label}
            to="/produtos"
            search={shortcut.search}
            className={`group flex items-center gap-3 rounded-2xl p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md ${shortcut.tone}`}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/70">
              {shortcut.icon}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font900">{shortcut.label}</span>
              <span className="block truncate text-xs font800 opacity-70">{shortcut.hint}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
