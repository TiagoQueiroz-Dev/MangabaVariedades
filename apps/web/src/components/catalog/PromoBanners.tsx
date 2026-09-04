import { ArrowRight, BadgePercent, Clock, Gift, PackageCheck } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function PromoBanners() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
      <Link
        to="/produtos"
        search={{ deal: true }}
        className="group relative min-h-[18rem] overflow-hidden rounded-3xl bg-[#f19500] p-6 text-white shadow-lg ring-1 ring-black/5 sm:p-8"
      >
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font900 text-[#263021]">
            <BadgePercent className="size-4" />
            Semana dos achadinhos
          </span>
          <h1 className="mt-6 text-4xl font-black leading-none sm:text-5xl lg:text-6xl">
            Variedades para garimpar sem perder tempo.
          </h1>
          <p className="mt-4 max-w-lg text-base font700 leading-7 text-white/88">
            Atalhos por departamento, ofertas em destaque e lista rápida para consultar disponibilidade.
          </p>
          <span className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#e9fb4f] px-6 text-sm font900 text-[#263021] transition group-hover:translate-x-1">
            Ver ofertas
            <ArrowRight className="size-4" />
          </span>
        </div>
        <div className="absolute -bottom-16 -right-10 size-64 rounded-full bg-[#3dae3f]" />
        <div className="absolute bottom-8 right-8 hidden rounded-[2rem] bg-white/95 p-5 text-[#263021] shadow-xl sm:block">
          <PackageCheck className="mb-3 size-12 text-[#3f5735]" />
          <p className="text-3xl font-black">até R$ 10</p>
          <p className="text-sm font800 text-[#68705f]">itens de giro rápido</p>
        </div>
      </Link>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <SmallBanner
          title="Casa em ordem"
          text="Organizadores, panos, potes e utilidades."
          icon={<Gift className="size-7" />}
          search={{ category: 'casa' }}
          tone="bg-[#3f5735] text-white"
        />
        <SmallBanner
          title="Chegou novidade"
          text="Itens novos para olhar antes de acabar."
          icon={<Clock className="size-7" />}
          search={{ q: 'novo' }}
          tone="bg-[#e9fb4f] text-[#263021]"
        />
      </div>
    </section>
  )
}

function SmallBanner({
  title,
  text,
  icon,
  search,
  tone,
}: {
  title: string
  text: string
  icon: React.ReactNode
  search: { q?: string; category?: string; deal?: boolean; maxPrice?: number }
  tone: string
}) {
  return (
    <Link
      to="/produtos"
      search={search}
      className={`group relative overflow-hidden rounded-3xl p-6 shadow-sm ring-1 ring-black/5 ${tone}`}
    >
      <div className="relative z-10">
        <div className="mb-6 grid size-12 place-items-center rounded-2xl bg-white/22">{icon}</div>
        <h2 className="text-2xl font-black">{title}</h2>
        <p className="mt-2 max-w-xs text-sm font700 leading-6 opacity-75">{text}</p>
      </div>
      <ArrowRight className="absolute bottom-6 right-6 size-5 transition group-hover:translate-x-1" />
    </Link>
  )
}
