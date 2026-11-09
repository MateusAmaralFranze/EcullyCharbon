"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { useLenis } from "@/components/providers/SmoothScroll";

const footerLinks = [
  { href: "/", label: "Início" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/contato", label: "Contato" },
  { href: "/contato#reserva", label: "Reservas" },
];

export function Footer() {
  const lenis = useLenis();

  return (
    <footer className="relative overflow-hidden border-t border-linha bg-carvao">
      <div className="pointer-events-none absolute -left-40 top-0 h-[360px] w-[360px] rounded-full bg-brasa/8 blur-[110px]" />

      <div className="shell relative py-16 md:py-24">
        <Reveal className="mb-12 flex flex-col gap-8 border-b border-linha pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-5">Ecully Charbon</p>
            <h2 className="display max-w-2xl text-[clamp(2.4rem,6vw,4.6rem)]">
              O fogo continua
              <br />
              <span className="display-italic text-brasa">aceso.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contato#reserva" className="btn btn-primary">
              Reservar mesa
            </Link>
            <a
              href={site.ifood}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              Pedir no iFood
            </a>
          </div>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="eyebrow mb-4">Navegue</p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-line text-sm text-creme/65 hover:text-creme"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Endereço</p>
            <a
              href={site.maps}
              target="_blank"
              rel="noreferrer"
              className="text-sm leading-relaxed text-creme/65 transition-colors hover:text-creme"
            >
              {site.address.street}
              <br />
              {site.address.district} · {site.address.city} — {site.address.state}
              <br />
              {site.address.postalCode}
            </a>
          </div>

          <div>
            <p className="eyebrow mb-4">Horários</p>
            <ul className="space-y-1.5 text-sm text-creme/65">
              {site.hours.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-4">
                  <span>{entry.days}</span>
                  <span className="text-creme/60">{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Contato</p>
            <a
              href={site.phoneHref}
              className="link-line block text-sm text-creme/65 hover:text-creme"
            >
              {site.phone}
            </a>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.65rem] uppercase tracking-[0.2em] text-creme/60">
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
              <a
                href={site.ifood}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brasa"
              >
                iFood
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <Image
            src="/brand/charbon-logo-light.png"
            alt="Ecully Charbon"
            width={1600}
            height={396}
            sizes="100vw"
            className="h-auto w-full opacity-[0.16]"
          />
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-linha pt-8 text-[0.62rem] uppercase tracking-[0.2em] text-creme/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ecully Charbon. Todos os direitos reservados.</p>
          <p className="order-3 sm:order-2">Feito com fogo, em São Paulo.</p>
          <button
            type="button"
            onClick={() => lenis?.scrollTo(0, { duration: 1.4 })}
            className="order-2 flex w-fit items-center gap-2 text-creme/55 transition-colors hover:text-creme sm:order-3"
          >
            Voltar ao topo <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
