import { ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { categories } from '../../data/catalog'

export function CategoryMosaic() {
  const featured = categories.filter((category) => category.featured)

  return (
    <div className="grid min-h-[21rem] grid-cols-6 grid-rows-5 gap-2">
      {featured.map((category, index) => (
        <Link
          key={category.id}
          to="/produtos"
          search={{ category: category.id }}
          className={`group relative overflow-hidden rounded-2xl p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg ${
            index === 0
              ? 'col-span-4 row-span-2'
              : index === 1
                ? 'col-span-2 row-span-3'
                : index === 2
                  ? 'col-span-3 row-span-2'
                  : 'col-span-3 row-span-1'
          }`}
          style={{ background: category.color, color: category.textColor }}
        >
          <span className="relative z-10 block max-w-44 text-xl font-black leading-tight sm:text-2xl">
            {category.name}
          </span>
          <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-white/85 text-[#3f5735] transition group-hover:translate-x-1">
            <ArrowRight className="size-4" />
          </span>
          <span className="absolute -right-8 -top-8 size-28 rounded-full bg-white/15" />
        </Link>
      ))}
    </div>
  )
}
