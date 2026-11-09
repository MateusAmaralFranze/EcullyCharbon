import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const gins = ["Gin tônica", "Coal", "Ginger", "Mandarino", "Hibisco"];

export function HappyHour() {
  return (
    <section
      id="happy-hour"
      className="relative overflow-hidden border-y border-carvao/20 bg-brasa py-20 text-carvao md:py-28"
    >
      <div className="pointer-events-none absolute -right-16 -top-20 select-none font-display text-[26rem] leading-none text-carvao/[0.06]">
        HH
      </div>

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal className="mb-7 flex items-center gap-4">
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-carvao/85">
                06
              </span>
              <span className="h-px w-8 bg-carvao/25" />
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-carvao/85">
                Happy hour
              </p>
            </Reveal>

            <Reveal>
              <h2 className="display text-[clamp(2.8rem,6.6vw,6rem)]">
                O fim do dia
                <br />
                <span className="display-italic">pede gin.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-sm leading-relaxed text-carvao/85 md:text-[0.95rem]">
                De terça a sábado, das 17h30 às 19h30, open de Gin &amp; Tônica
                com uma rodada de petiscos especiais. Uma pausa necessária antes
                da noite começar.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                {gins.map((gin) => (
                  <span
                    key={gin}
                    className="rounded-full border border-carvao/25 px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-carvao/85"
                  >
                    {gin}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <Reveal delay={0.1} className="border-t border-carvao/25 pt-6">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-carvao/85">
                Terça a sábado
              </p>
              <p className="mt-2 font-display text-[clamp(3.4rem,7vw,6rem)] leading-none tracking-tight">
                17h30
                <span className="mx-2 text-[0.4em] align-middle">—</span>
                19h30
              </p>

              <div className="mt-7 flex items-end justify-between gap-6 border-t border-carvao/25 pt-5">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-carvao/85">
                    Open de gin + petiscos
                  </p>
                  <p className="mt-1 font-display text-4xl">
                    R$ 72,90
                    <span className="ml-2 font-sans text-[0.6rem] uppercase tracking-[0.18em] text-carvao/85">
                      por pessoa
                    </span>
                  </p>
                </div>
                <Link
                  href="/cardapio#happy-hour"
                  className="btn border-carvao/30 bg-carvao text-creme hover:bg-creme hover:text-carvao"
                >
                  Ver no cardápio
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
