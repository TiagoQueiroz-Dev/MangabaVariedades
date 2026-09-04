export type Category = {
  id: string
  name: string
  description: string
  shortLabel: string
  color: string
  textColor: string
  featured?: boolean
}

export type Product = {
  id: string
  name: string
  categoryId: string
  price: number
  oldPrice?: number
  tag?: 'novo' | 'oferta' | 'mais-vendido'
  rating: number
  reviewCount: number
  availability: 'disponivel' | 'ultimas-unidades' | 'sob-consulta'
  description: string
  highlights: string[]
  visualTone: string
}

export const categories: Category[] = [
  {
    id: 'casa',
    name: 'Casa, mesa e banho',
    shortLabel: 'Casa',
    description: 'Itens praticos para organizar, decorar e cuidar do dia a dia.',
    color: '#e9fb4f',
    textColor: '#344a32',
    featured: true,
  },
  {
    id: 'cozinha',
    name: 'Cozinha',
    shortLabel: 'Cozinha',
    description: 'Utensilios para preparar, servir e conservar melhor.',
    color: '#39563a',
    textColor: '#ffffff',
    featured: true,
  },
  {
    id: 'escolar',
    name: 'Material escolar',
    shortLabel: 'Escolar',
    description: 'Basicos de estudo, papelaria e organizacao.',
    color: '#55764d',
    textColor: '#ffffff',
    featured: true,
  },
  {
    id: 'maquiagem',
    name: 'Maquiagem',
    shortLabel: 'Beleza',
    description: 'Achadinhos de beleza para montar o kit sem gastar muito.',
    color: '#bfd91f',
    textColor: '#344a32',
  },
  {
    id: 'brinquedos',
    name: 'Brinquedos',
    shortLabel: 'Brinquedos',
    description: 'Opcoes simples para presentear e distrair as criancas.',
    color: '#99ad17',
    textColor: '#ffffff',
    featured: true,
  },
  {
    id: 'utilidades',
    name: 'Utilidades',
    shortLabel: 'Utilidades',
    description: 'Produtos pequenos que resolvem problemas grandes.',
    color: '#f7c51f',
    textColor: '#3f3921',
  },
  {
    id: 'festa',
    name: 'Festa e descartáveis',
    shortLabel: 'Festa',
    description: 'Itens para decorar, servir e montar lembrancinhas.',
    color: '#ff8a00',
    textColor: '#ffffff',
  },
  {
    id: 'banheiro',
    name: 'Banheiro',
    shortLabel: 'Banheiro',
    description: 'Organização, limpeza e acessórios para o banheiro.',
    color: '#b9e4ff',
    textColor: '#263021',
  },
  {
    id: 'lavanderia',
    name: 'Lavanderia',
    shortLabel: 'Lavanderia',
    description: 'Cestos, prendedores, panos e utilidades de limpeza.',
    color: '#d7f5ce',
    textColor: '#263021',
  },
  {
    id: 'decoracao',
    name: 'Decoração',
    shortLabel: 'Decoração',
    description: 'Detalhes simples para renovar ambientes sem gastar muito.',
    color: '#ffe2a8',
    textColor: '#263021',
  },
]

export const products: Product[] = [
  {
    id: 'potes-hermeticos',
    name: 'Jogo de potes hermeticos',
    categoryId: 'cozinha',
    price: 24.9,
    oldPrice: 32.9,
    tag: 'oferta',
    rating: 4.8,
    reviewCount: 42,
    availability: 'disponivel',
    description: 'Kit para conservar mantimentos e deixar a cozinha mais organizada.',
    highlights: ['Tampas com boa vedacao', 'Empilhavel', 'Facil de limpar'],
    visualTone: 'from-lime-100 via-white to-emerald-100',
  },
  {
    id: 'garrafa-termica',
    name: 'Garrafa termica inox 500ml',
    categoryId: 'utilidades',
    price: 39.9,
    tag: 'mais-vendido',
    rating: 4.9,
    reviewCount: 61,
    availability: 'ultimas-unidades',
    description: 'Boa para escola, trabalho e passeios curtos.',
    highlights: ['Mantem temperatura', 'Tampa segura', 'Design compacto'],
    visualTone: 'from-yellow-100 via-white to-stone-200',
  },
  {
    id: 'caderno-universitario',
    name: 'Caderno universitario capa dura',
    categoryId: 'escolar',
    price: 18.9,
    tag: 'novo',
    rating: 4.7,
    reviewCount: 28,
    availability: 'disponivel',
    description: 'Caderno resistente para rotina de estudos e anotacoes.',
    highlights: ['Capa dura', 'Folhas pautadas', 'Otimo custo-beneficio'],
    visualTone: 'from-green-100 via-white to-yellow-100',
  },
  {
    id: 'kit-pinceis',
    name: 'Kit de pinceis para maquiagem',
    categoryId: 'maquiagem',
    price: 22.5,
    oldPrice: 27.9,
    tag: 'oferta',
    rating: 4.6,
    reviewCount: 34,
    availability: 'disponivel',
    description: 'Conjunto versatil para uso diario e acabamento mais caprichado.',
    highlights: ['Cerdas macias', 'Estojo simples', 'Bom para iniciantes'],
    visualTone: 'from-rose-100 via-white to-yellow-100',
  },
  {
    id: 'organizador-multiuso',
    name: 'Organizador multiuso transparente',
    categoryId: 'casa',
    price: 16.9,
    tag: 'mais-vendido',
    rating: 4.8,
    reviewCount: 53,
    availability: 'disponivel',
    description: 'Ajuda a separar banheiro, cozinha, lavanderia ou escritorio.',
    highlights: ['Visual limpo', 'Leve e resistente', 'Varios usos'],
    visualTone: 'from-slate-100 via-white to-lime-100',
  },
  {
    id: 'toalha-banho',
    name: 'Toalha de banho algodao',
    categoryId: 'casa',
    price: 29.9,
    rating: 4.5,
    reviewCount: 19,
    availability: 'sob-consulta',
    description: 'Modelo macio para reposicao do enxoval.',
    highlights: ['Toque confortavel', 'Boa absorcao', 'Cores variadas'],
    visualTone: 'from-lime-100 via-white to-sky-100',
  },
  {
    id: 'escorredor-louca',
    name: 'Escorredor de louca compacto',
    categoryId: 'cozinha',
    price: 34.9,
    rating: 4.6,
    reviewCount: 25,
    availability: 'disponivel',
    description: 'Compacto para bancadas pequenas sem perder praticidade.',
    highlights: ['Ocupa pouco espaco', 'Base removivel', 'Facil higienizacao'],
    visualTone: 'from-emerald-100 via-white to-zinc-100',
  },
  {
    id: 'carrinho-infantil',
    name: 'Carrinho infantil sortido',
    categoryId: 'brinquedos',
    price: 12.9,
    tag: 'novo',
    rating: 4.7,
    reviewCount: 31,
    availability: 'disponivel',
    description: 'Presente simples, colorido e facil de levar.',
    highlights: ['Modelos sortidos', 'Boa opcao de lembranca', 'Leve'],
    visualTone: 'from-yellow-100 via-white to-lime-100',
  },
  {
    id: 'prendedores-roupa',
    name: 'Kit prendedores de roupa',
    categoryId: 'lavanderia',
    price: 8.9,
    tag: 'oferta',
    rating: 4.5,
    reviewCount: 17,
    availability: 'disponivel',
    description: 'Pacote prático para reposição em casa.',
    highlights: ['Item de giro rápido', 'Pacote econômico', 'Uso diário'],
    visualTone: 'from-lime-100 via-white to-teal-100',
  },
  {
    id: 'sacola-presente',
    name: 'Sacola para presente estampada',
    categoryId: 'festa',
    price: 4.9,
    tag: 'mais-vendido',
    rating: 4.6,
    reviewCount: 22,
    availability: 'disponivel',
    description: 'Opção rápida para embalar lembranças e presentes.',
    highlights: ['Estampas sortidas', 'Vários tamanhos', 'Boa apresentação'],
    visualTone: 'from-orange-100 via-white to-yellow-100',
  },
  {
    id: 'porta-sabonete',
    name: 'Porta-sabonete com tampa',
    categoryId: 'banheiro',
    price: 7.9,
    rating: 4.4,
    reviewCount: 13,
    availability: 'disponivel',
    description: 'Acessório simples para manter a pia mais organizada.',
    highlights: ['Compacto', 'Fácil de lavar', 'Cores variadas'],
    visualTone: 'from-sky-100 via-white to-lime-100',
  },
  {
    id: 'vaso-decorativo',
    name: 'Vaso decorativo pequeno',
    categoryId: 'decoracao',
    price: 14.9,
    tag: 'novo',
    rating: 4.8,
    reviewCount: 16,
    availability: 'ultimas-unidades',
    description: 'Peça pequena para mesa, estante ou aparador.',
    highlights: ['Acabamento fosco', 'Tamanho versátil', 'Combina com plantas'],
    visualTone: 'from-amber-100 via-white to-lime-100',
  },
  {
    id: 'pano-microfibra',
    name: 'Pano multiuso microfibra',
    categoryId: 'utilidades',
    price: 6.9,
    tag: 'oferta',
    rating: 4.7,
    reviewCount: 39,
    availability: 'disponivel',
    description: 'Produto coringa para limpeza de cozinha, móveis e vidros.',
    highlights: ['Secagem rápida', 'Não risca', 'Ótimo para reposição'],
    visualTone: 'from-yellow-100 via-white to-emerald-100',
  },
  {
    id: 'estojo-escolar',
    name: 'Estojo escolar simples',
    categoryId: 'escolar',
    price: 9.9,
    rating: 4.5,
    reviewCount: 20,
    availability: 'disponivel',
    description: 'Modelo básico para organizar lápis, canetas e pequenos itens.',
    highlights: ['Leve', 'Cores sortidas', 'Bom para volta às aulas'],
    visualTone: 'from-green-100 via-white to-zinc-100',
  },
  {
    id: 'forma-silicone',
    name: 'Forma de silicone para cozinha',
    categoryId: 'cozinha',
    price: 19.9,
    tag: 'novo',
    rating: 4.6,
    reviewCount: 18,
    availability: 'disponivel',
    description: 'Boa para receitas pequenas e preparo prático.',
    highlights: ['Flexível', 'Fácil desenforme', 'Cores sortidas'],
    visualTone: 'from-rose-100 via-white to-yellow-100',
  },
  {
    id: 'caixa-organizadora',
    name: 'Caixa organizadora com tampa',
    categoryId: 'casa',
    price: 21.9,
    tag: 'mais-vendido',
    rating: 4.9,
    reviewCount: 47,
    availability: 'disponivel',
    description: 'Para guardar brinquedos, documentos, roupas ou miudezas.',
    highlights: ['Tampa firme', 'Empilhável', 'Transparente'],
    visualTone: 'from-slate-100 via-white to-yellow-100',
  },
]

export function getCategory(categoryId: string) {
  return categories.find((category) => category.id === categoryId)
}

export function getFeaturedProducts() {
  return products.filter((product) => product.tag === 'novo' || product.tag === 'mais-vendido').slice(0, 8)
}

export function getDealProducts() {
  return products.filter((product) => product.tag === 'oferta')
}

export function getProductsUnder(maxPrice: number) {
  return products.filter((product) => product.price <= maxPrice)
}
