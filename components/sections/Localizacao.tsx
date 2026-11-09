import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function Localizacao() {
  return (
    <section id="localizacao" className="relative py-24 md:py-36">
      <div className="shell">
        <div className="mb-14 flex flex-col gap-8 md:mb-18 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="text-[0.6rem] uppercase tracking-[0.28em] text-brasa">
                07
              </span>
              <span className="h-px w-8 bg-linha" />
              <p className="eyebrow">Localização</p>
            </Reveal>
            <Reveal>
              <h2 className="display text-[clamp(2.6rem,6vw,5.4rem)]">
                Onde o fogo
                <br />
                <span className="display-italic text-brasa">acontece.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="max-w-sm lg:pb-2">
            <p className="text-sm leading-relaxed text-creme/55">
              Estamos em Perdizes, a poucos passos do coração de São Paulo. Venha
              a pé, de carro ou de delivery — o carvão estará aceso.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="grid gap-8 sm:grid-cols-2">
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
                    <li key={entry.days}>
                      <span className="block text-creme/85">{entry.days}</span>
                      <span className="text-creme/60">{entry.time}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="eyebrow mb-3">Contato</p>
                <a
                  href={site.phoneHref}
                  className="link-line text-sm text-creme/70 hover:text-creme"
                >
                  {site.phone}
                </a>
                <p className="mt-3 text-xs leading-relaxed text-creme/55">
                  Take away pelo telefone.
                  <br />
                  Delivery pelo iFood.
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
                <Link
                  href="/contato#reserva"
                  className="link-line mt-5 flex w-fit text-[0.62rem] uppercase tracking-[0.2em] text-creme/60 hover:text-creme"
                >
                  Reservar mesa <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden border border-linha bg-carvao-3 lg:aspect-[16/11]">
              <iframe
                title="Mapa — Ecully Charbon, Rua Ministro Ferreira Alves, 825"
                src={site.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale contrast-[1.05] opacity-80 transition-all duration-700 hover:opacity-100 hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 border border-creme/10" />
            </div>
            <p className="mt-3 text-[0.58rem] uppercase tracking-[0.22em] text-creme/55">
              {site.address.street} · {site.address.district} · {site.address.city}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
