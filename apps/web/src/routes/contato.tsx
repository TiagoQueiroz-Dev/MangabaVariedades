import { createFileRoute } from '@tanstack/react-router'
import { Clock, Instagram, MapPin, MessageCircle, Phone, ShoppingBag } from 'lucide-react'

export const Route = createFileRoute('/contato')({
  component: ContactPage,
})

function ContactPage() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent('Olá! Vim pelo catálogo da Mangaba Variedades.')}`
    : undefined

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
            <button
              type="button"
              disabled
              className="inline-flex h-12 cursor-not-allowed items-center gap-2 rounded-full border border-black/10 bg-white px-6 text-sm font900 text-[#263021]/65"
              title="Informe o telefone real da loja para ativar esse contato."
            >
              <Phone className="size-5" />
              Telefone da loja
            </button>
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
                <ContactInfo icon={<MapPin className="size-5" />} title="Endereço" text="Cadastre o endereço da loja aqui." />
                <ContactInfo icon={<Clock className="size-5" />} title="Horário" text="Informe os dias e horários de atendimento." />
                <ContactInfo icon={<Instagram className="size-5" />} title="Redes sociais" text="Adicione o Instagram oficial da loja." />
              </div>
            </div>
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
