import Link from "next/link";
import { LineReveal, ParallaxImage, Reveal } from "@/components/ui/Reveal";

const milestones = [
  {
    year: "2013",
    title: "Ecully",
    text: "O casal abre o restaurante Ecully, em São Paulo.",
  },
  {
    year: "2015",
    title: "Bib Gourmand",
    text: "A casa recebe a distinção do Guia Michelin.",
  },
  {
    year: "Hoje",
    title: "Charbon",
    text: "O fogo ganha uma hamburgueria só dele, em Perdizes.",
  },
];

export function Chefs() {
  return (
    <section
      id="chefs"
      className="relative overflow-hidden border-y border-linha bg-carvao-2 py-24 md:py-36"
    >
      <div className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-brasa/8 blur-[130px]" />

      <div className="shell relative">
        <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="text-[0.6rem] uppercase tracking-[0.28em] text-brasa">
                04
              </span>
              <span className="h-px w-8 bg-linha" />
              <p className="eyebrow">Nossos chefs</p>
            </Reveal>

            <LineReveal className="display text-[clamp(2.6rem,6vw,5.4rem)]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-line className="block">
                  Dois chefs,
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-line className="block">
                  uma mesma{" "}
                  <span className="display-italic text-brasa">chama.</span>
                </span>
              </span>
            </LineReveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="text-sm leading-relaxed text-creme/60">
              Juliana Amorim e Guilherme Tse Candido se conheceram no curso de
              culinária do Institut Paul Bocuse, na França. De lá para cá, o fogo
              virou o centro de tudo o que fazem.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-6">
            <ParallaxImage
              src="/images/foto-05.webp"
              alt="Chef Juliana Amorim"
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="aspect-[4/5] w-[86%]"
              strength={7}
            />
            <ParallaxImage
              src="/images/foto-06.webp"
              alt="Chef Guilherme Tse Candido"
              sizes="(max-width: 1024px) 45vw, 20vw"
              className="absolute -bottom-10 right-0 aspect-[3/4] w-[46%] border-4 border-carvao-2"
              strength={12}
            />
            <p className="mt-16 text-[0.58rem] uppercase tracking-[0.24em] text-creme/55">
              Juliana Amorim &amp; Guilherme Tse Candido
            </p>
          </div>

          <div className="lg:col-span-6 lg:pl-10">
            <Reveal className="space-y-5 text-sm leading-relaxed text-creme/65 md:text-[0.95rem]">
              <p>
                Depois do curso, Juliana trabalhou no La Alquería, em Sevilla, na
                Espanha, e no Terreiro do Paço, em Lisboa. Guilherme também passou
                pelo La Alquería e pelo La Credenza, no Piemonte, na Itália.
              </p>
              <p>
                Já no Brasil, abriram em 2013 o Restaurante Ecully, em São Paulo,
                classificado desde 2015 como Bib Gourmand pelo Guia Michelin. Hoje,
                são eles que cuidam do Charbon.
              </p>
              <p>
                A história da hamburgueria começou entre amigos: os hambúrgueres
                preparados em casa faziam tanto sucesso que o pedido foi aceito sem
                muito esforço. O resto é carvão, brasa e tempo.
              </p>
            </Reveal>

            <div className="mt-10 border-t border-linha pt-8">
              <ul className="space-y-5">
                {milestones.map((milestone, index) => (
                  <li key={milestone.year}>
                    <Reveal
                      delay={index * 0.06}
                      className="grid grid-cols-[64px_1fr] gap-4 md:grid-cols-[90px_1fr]"
                    >
                      <span className="font-display text-lg text-brasa">
                        {milestone.year}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-creme">
                          {milestone.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-creme/60">
                          {milestone.text}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <Reveal delay={0.1} className="mt-9">
              <Link
                href="/contato#reserva"
                className="link-line text-[0.66rem] uppercase tracking-[0.22em] text-creme/70 hover:text-creme"
              >
                Venha conhecer <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
