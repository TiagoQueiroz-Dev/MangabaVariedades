import { createFileRoute } from '@tanstack/react-router'
import { Clock, ExternalLink, Instagram, MapPin, MessageCircle, Phone, ShoppingBag } from 'lucide-react'

import { getStoreAddress, getStoreInstagramUrl, getStorePhone, storeInfo } from '../data/store'

export const Route = createFileRoute('/contato')({
  component: ContactPage,
})

function ContactPage() {
  const storeAddress = getStoreAddress()
  const storePhone = getStorePhone()
  const instagramUrl = getStoreInstagramUrl()
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent('Olá! Vim pelo catálogo da Mangaba Variedades.')}`
    : undefined
  const mapQuery = storeAddress ? encodeURIComponent(storeAddress) : ''
  const mapSrc = mapQuery ? `https://maps.google.com/maps?q=${mapQuery}&output=embed` : ''
  const mapsHref = mapQuery ? `https://www.google.com/maps/search/?api=1&query=${mapQuery}` : ''

  return (
    <main className="min-h-screen bg-[#f8f8f2]">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="text-sm font900 uppercase text-[#99ad17]">Contato</p>
          <h1 className="mt-2 text-5xl font-black leading-tight tracking-tight text-[#263021]">
            Fale com a loja antes de sair de casa.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#68705f]">
            Consulte disponibilidade, tire dúvidas sobre produtos e combine a melhor forma de comprar.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#f7c51f] px-6 text-sm font900 text-[#263021] transition hover:bg-[#eab80f]"
              >
                <MessageCircle className="size-5" />
                Chamar no WhatsApp
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex h-12 cursor-not-allowed items-center gap-2 rounded-full bg-[#f7c51f]/70 px-6 text-sm font900 text-[#263021]/70"
                title="Configure VITE_WHATSAPP_NUMBER para ativar o envio direto."
              >
                <MessageCircle className="size-5" />
                WhatsApp a configurar
              </button>
            )}
            {storePhone ? (
              <a
                href={`tel:${storePhone.replace(/\D/g, '')}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white px-6 text-sm font900 text-[#263021] transition hover:bg-[#e9fb4f]"
              >
                <Phone className="size-5" />
                Ligar para loja
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex h-12 cursor-not-allowed items-center gap-2 rounded-full border border-black/10 bg-white px-6 text-sm font900 text-[#263021]/65"
                title="Informe o telefone real da loja para ativar esse contato."
              >
                <Phone className="size-5" />
                Telefone da loja
              </button>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-4 shadow-xl ring-1 ring-black/5">
          <div className="grid min-h-[30rem] place-items-center rounded-[1.5rem] bg-[#263021] p-8 text-white">
            <div className="max-w-md">
              <div className="mb-8 grid size-20 place-items-center rounded-[1.5rem] bg-[#f7c51f] text-[#3f5735]">
                <ShoppingBag className="size-10" />
              </div>
              <h2 className="text-3xl font-black">Mangaba Variedades</h2>
              <p className="mt-4 leading-7 text-white/72">
                Catálogo pensado para aproximar vitrine digital e atendimento humano.
              </p>

              <div className="mt-8 grid gap-4">
                <ContactInfo
                  icon={<MapPin className="size-5" />}
                  title="Endereço"
                  text={storeAddress || 'Cadastre o endereço da loja aqui.'}
                />
                <ContactInfo icon={<Clock className="size-5" />} title="Horário" text={storeInfo.businessHours} />
                <ContactInfo
                  icon={<Instagram className="size-5" />}
                  title="Redes sociais"
                  text={instagramUrl || 'Adicione o Instagram oficial da loja.'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5">
          <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="bg-[#f19500] p-6 text-white sm:p-8">
              <p className="text-sm font900 uppercase text-white/75">Localização</p>
              <h2 className="mt-2 text-3xl font-black">Encontre a Mangaba</h2>
              <p className="mt-4 leading-7 text-white/82">
                O mapa usa o endereço configurado para a loja. Quando o endereço real for preenchido, a busca aponta direto para ele.
              </p>
              {mapsHref ? (
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font900 text-[#263021] transition hover:bg-[#e9fb4f]"
                >
                  Abrir no Google Maps
                  <ExternalLink className="size-4" />
                </a>
              ) : (
                <p className="mt-6 rounded-2xl bg-white/18 p-4 text-sm font800 leading-6">
                  Endereço da loja ainda não informado.
                </p>
              )}
            </div>

            {mapSrc ? (
              <iframe
                title="Mapa da Mangaba Variedades"
                src={mapSrc}
                className="h-[24rem] w-full border-0 lg:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="grid min-h-[24rem] place-items-center bg-[#f8f8f2] p-8 text-center">
                <div>
                  <MapPin className="mx-auto mb-4 size-12 text-[#f19500]" />
                  <h3 className="text-2xl font900 text-[#263021]">Mapa aguardando endereço</h3>
                  <p className="mt-3 max-w-md leading-7 text-[#68705f]">
                    Assim que o endereço da loja for adicionado, esta área passa a carregar o mapa automaticamente.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function ContactInfo({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
      <div className="text-[#e9fb4f]">{icon}</div>
      <div>
        <p className="font900">{title}</p>
        <p className="mt-1 text-sm leading-6 text-white/70">{text}</p>
      </div>
    </div>
  )
}
