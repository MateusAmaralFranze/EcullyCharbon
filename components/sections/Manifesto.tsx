import Link from "next/link";
import { LineReveal, ParallaxImage, Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "Black Angus", label: "Cortes nobres, marmorizados" },
  { value: "Mibrasa", label: "Forno espanhol a carvão" },
  { value: "2013", label: "A história começou aqui" },
];

export function Manifesto() {
  return (
    <section id="proposta" className="relative overflow-hidden py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pr-10">
            <Reveal className="mb-8 flex items-center gap-4">
              <span className="text-[0.6rem] uppercase tracking-[0.28em] text-brasa">
                01
              </span>
              <span className="h-px w-8 bg-linha" />
              <p className="eyebrow">Nossa proposta</p>
            </Reveal>

            <LineReveal className="display mb-8 text-[clamp(2.4rem,4.4vw,4.2rem)]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-line className="block">
                  O carvão não é
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-line className="block">
                  um detalhe.
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-line className="display-italic block text-brasa">
                  É o método.
                </span>
              </span>
            </LineReveal>

            <Reveal delay={0.1} className="space-y-5 text-sm leading-relaxed text-creme/65 md:text-[0.95rem]">
              <p>
                Assamos cortes de Black Angus no carvão e na lenha de árvores
                frutíferas. O forno espanhol Mibrasa dá o ponto, o defumado e o
                tempo certo. Nada de atalhos industriais: acompanhamentos, pães,
                pastrami e leitão são feitos aqui.
              </p>
              <p>
                Écully é uma cidade perto de Lyon, onde fica o Institut Paul
                Bocuse. Charbon é carvão, em francês. O nome resume a cozinha dos
                chefs Juliana Amorim e Guilherme Tse Candido: origem francesa,
                fogo brasileiro.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <Link
                href="/contato"
                className="link-line text-[0.68rem] uppercase tracking-[0.22em] text-creme/70 hover:text-creme"
              >
                Conheça a casa <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="relative lg:col-span-7">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <ParallaxImage
                src="/images/foto-04.webp"
                alt="Prato do Ecully Charbon"
                sizes="(max-width: 1024px) 80vw, 45vw"
                className="col-span-8 aspect-[4/5]"
                strength={7}
              />
              <ParallaxImage
                src="/images/foto-03.webp"
                alt="Detalhe de hambúrguer preparado na brasa"
                sizes="(max-width: 1024px) 40vw, 22vw"
                className="col-span-4 mt-16 aspect-[3/4] self-start"
                strength={11}
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-6 border-t border-linha pt-5">
              <p className="max-w-[220px] text-[0.6rem] uppercase leading-relaxed tracking-[0.22em] text-creme/55">
                Fogo, carvão e tempo.
                <br />
                Nada além disso.
              </p>

              <div className="relative hidden h-24 w-24 shrink-0 items-center justify-center md:flex">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full animate-[spin_26s_linear_infinite] text-creme/55"
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    />
                  </defs>
                  <text
                    fill="currentColor"
                    fontSize="7"
                    letterSpacing="3.2"
                    fontFamily="var(--font-sans)"
                  >
                    <textPath href="#circlePath">
                      FOGO · BRASA · CARVÃO · FOGO · BRASA ·
                    </textPath>
                  </text>
                </svg>
                <span className="display text-2xl text-brasa">C</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-linha pt-8 sm:grid-cols-3 md:mt-24">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <p className="font-display text-xl text-creme md:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-creme/55">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
