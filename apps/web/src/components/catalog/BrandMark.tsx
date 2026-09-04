type BrandMarkProps = {
  compact?: boolean
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className="flex items-center">
      <img
        src={compact ? '/mangaba-icon.svg' : '/mangaba-logo.svg'}
        alt="Mangaba Variedades"
        className={compact ? 'h-11 w-11 object-contain' : 'h-12 w-36 object-contain sm:h-14 sm:w-48'}
      />
    </div>
  )
}
