import Link from "next/link";
import { site, reservationLink } from "@/lib/site";
import { ParallaxImage, Reveal } from "@/components/ui/Reveal";

export function ReservaCTA() {
  return (
    <section
      id="reservar"
      className="relative flex min-h-[78vh] items-end overflow-hidden border-t border-linha"
    >
      <ParallaxImage
        src="/images/fogo.webp"
        alt="Brasa e carvão do Ecully Charbon"
        sizes="100vw"
        className="absolute inset-0"
        strength={10}
        overlay={false}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-carvao via-carvao/70 to-carvao/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-carvao via-transparent to-carvao/40" />

      <div className="shell relative z-10 pb-16 pt-32 md:pb-20 md:pt-40">
        <Reveal className="mb-7 flex items-center gap-4">
          <span className="text-[0.6rem] uppercase tracking-[0.28em] text-brasa">
            08
          </span>
          <span className="h-px w-8 bg-creme/25" />
          <p className="eyebrow !text-creme/70">Reservas</p>
        </Reveal>

        <Reveal>
          <h2 className="display max-w-4xl text-[clamp(3rem,8vw,7.4rem)]">
            A mesa
            <br />
            <span className="display-italic text-brasa">está posta.</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-creme/65">
              Reserve pelo WhatsApp ou venha nos encontrar em Perdizes. Para
              delivery, é só chamar no iFood. O fogo espera por você.
            </p>
            <p className="mt-4 text-[0.62rem] uppercase tracking-[0.2em] text-creme/55">
              Reservas sujeitas à confirmação · {site.phone}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-wrap items-center gap-3">
            <a
              href={reservationLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Reservar no WhatsApp
            </a>
            <Link href="/cardapio" className="btn btn-ghost">
              Ver cardápio
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
