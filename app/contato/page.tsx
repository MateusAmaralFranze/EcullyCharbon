import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ReservationForm } from "@/components/contact/ReservationForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contato e reservas",
  description:
    "Reserve sua mesa no Ecully Charbon, em Perdizes, São Paulo. Endereço, horários, telefone, reservas pelo WhatsApp e delivery pelo iFood.",
  alternates: {
    canonical: "/contato",
  },
  openGraph: {
    title: "Contato e reservas · Ecully Charbon",
    description:
      "Reserve sua mesa no Ecully Charbon, em Perdizes. Ter–Sáb 17h–23h, Dom 16h–23h.",
    url: "/contato",
  },
};

export default function ContatoPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-44">
        <div className="pointer-events-none absolute -right-28 top-8 h-[380px] w-[380px] rounded-full bg-brasa/8 blur-[130px]" />
        <div className="shell relative">
          <Reveal className="mb-7 flex items-center gap-4">
            <span className="text-[0.6rem] uppercase tracking-[0.28em] text-brasa">
              Contato
            </span>
            <span className="h-px w-8 bg-linha" />
            <p className="eyebrow">Perdizes · São Paulo</p>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <h1 className="display text-[clamp(3.2rem,8.6vw,8rem)]">
                Fale com
                <br />
                <span className="display-italic text-brasa">a gente.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4 lg:pb-3">
              <p className="max-w-sm text-sm leading-relaxed text-creme/55">
                Reservas, take away, delivery ou uma dúvida sobre o cardápio. O
                caminho mais rápido é o WhatsApp — mas o telefone também funciona
                muito bem.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell pb-24 md:pb-32">
        <div className="grid scroll-mt-28 gap-12 lg:grid-cols-12 lg:gap-14" id="reserva">
          <div className="lg:col-span-4">
            <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-1">
              <Reveal>
                <p className="eyebrow mb-3">Endereço</p>
                <a
                  href={site.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm leading-relaxed text-creme/70 transition-colors hover:text-creme"
                >
                  {site.address.street}
                  <br />
                  {site.address.district}
                  <br />
                  {site.address.city} — {site.address.state}
                  <br />
                  {site.address.postalCode}
                </a>
                <a
                  href={site.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line mt-4 inline-flex text-[0.62rem] uppercase tracking-[0.2em] text-brasa"
                >
                  Abrir no mapa <span aria-hidden="true">↗</span>
                </a>
              </Reveal>

              <Reveal delay={0.06}>
                <p className="eyebrow mb-3">Horários</p>
                <ul className="space-y-2 text-sm text-creme/70">
                  {site.hours.map((entry) => (
                    <li key={entry.days} className="flex justify-between gap-4">
                      <span>{entry.days}</span>
                      <span className="text-creme/55">{entry.time}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="eyebrow mb-3">Telefone</p>
                <a
                  href={site.phoneHref}
                  className="link-line text-sm text-creme/70 hover:text-creme"
                >
                  {site.phone}
                </a>
                <p className="mt-3 text-xs leading-relaxed text-creme/55">
                  Take away pelo telefone.
                  <br />
                  Para grupos grandes, fale com a equipe.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="eyebrow mb-3">Delivery</p>
                <a
                  href={site.ifood}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost !px-5 !py-3"
                >
                  Pedir no iFood
                </a>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[0.6rem] uppercase tracking-[0.2em] text-creme/60">
                  <a
                    href={site.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-brasa"
                  >
                    Instagram
                  </a>
                  <a
                    href={site.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-brasa"
                  >
                    Facebook
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.08} className="lg:col-span-8">
            <ReservationForm />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-linha">
        <div className="shell py-16 md:py-24">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-3">Como chegar</p>
              <h2 className="display text-[clamp(2rem,4vw,3.4rem)]">
                Rua Ministro Ferreira Alves, 825
              </h2>
            </div>
            <a
              href={site.maps}
              target="_blank"
              rel="noreferrer"
              className="link-line w-fit text-[0.62rem] uppercase tracking-[0.2em] text-creme/60 hover:text-creme"
            >
              Abrir no Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-linha bg-carvao-3 md:aspect-[21/9]">
            <iframe
              title="Mapa — Ecully Charbon, Rua Ministro Ferreira Alves, 825"
              src={site.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale contrast-[1.05] opacity-80 transition-all duration-700 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
