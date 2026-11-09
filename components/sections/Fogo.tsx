"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const panels = [
  {
    id: "carvao",
    index: "01",
    title: "Carvão",
    kicker: "O ponto de partida",
    text: "Carvão vegetal e lenha de árvores frutíferas. É daí que vem o defumado que atravessa cada corte — sem pressa, sem atalho.",
    image: "/images/fogo.webp",
    alt: "Carvão e brasa no preparo dos hambúrgueres",
  },
  {
    id: "brasa",
    index: "02",
    title: "Brasa",
    kicker: "Temperatura e tempo",
    text: "A brasa pede atenção. O ponto é lido no calor, no som e no cheiro. É o tipo de cozinha que não se automatiza.",
    image: "/images/foto-01.webp",
    alt: "Carne sendo assada na brasa",
  },
  {
    id: "mibrasa",
    index: "03",
    title: "Mibrasa",
    kicker: "O forno espanhol",
    text: "Mais econômico e ecológico, o forno Mibrasa assa os hambúrgueres por igual e leva à mesa o sabor que só o carvão entrega.",
    image: "/images/ambiente.webp",
    alt: "Ambiente do restaurante com o forno a carvão",
  },
];

export function Fogo() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!section.current || !track.current || prefersReducedMotion()) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const distance = () => Math.max(0, track.current!.scrollWidth - window.innerWidth);

        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress.current) {
                progress.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          tween.kill();
        };
      });

      return () => media.revert();
    },
    { scope: section }
  );

  return (
    <section
      ref={section}
      id="fogo"
      className="relative overflow-hidden border-y border-linha bg-carvao-2"
    >
      <div className="shell pt-20 lg:hidden">
        <div className="mb-6 flex items-center gap-4">
          <span className="text-[0.6rem] uppercase tracking-[0.28em] text-brasa">
            02
          </span>
          <span className="h-px w-8 bg-linha" />
          <p className="eyebrow">O fogo</p>
        </div>
        <h2 className="display text-[clamp(2.4rem,9vw,4rem)]">
          O fogo é
          <br />
          <span className="display-italic text-brasa">o tempero.</span>
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-creme/60">
          Três etapas, um mesmo princípio: respeitar o tempo do carvão. Arraste
          para o lado para acompanhar.
        </p>
      </div>

      <div className="flex items-center py-10 lg:h-screen lg:py-0">
        <div
          ref={track}
          className="flex w-full flex-col gap-6 px-5 md:px-10 lg:w-max lg:flex-row lg:gap-8 lg:px-0 lg:pr-[8vw]"
        >
          <div className="hidden w-[38vw] shrink-0 flex-col justify-center px-[4vw] lg:flex">
            <div className="mb-8 flex items-center gap-4">
              <span className="text-[0.6rem] uppercase tracking-[0.28em] text-brasa">
                02
              </span>
              <span className="h-px w-8 bg-linha" />
              <p className="eyebrow">O fogo</p>
            </div>
            <h2 className="display text-[clamp(3rem,5.4vw,5.6rem)]">
              O fogo é
              <br />
              <span className="display-italic text-brasa">o tempero.</span>
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-creme/60">
              Três etapas, um mesmo princípio: respeitar o tempo do carvão.
              Nenhum atalho industrial cabe aqui.
            </p>

            <div className="mt-12 w-full max-w-xs">
              <div className="h-px w-full overflow-hidden bg-creme/15">
                <div
                  ref={progress}
                  className="h-full w-full origin-left scale-x-0 bg-brasa"
                />
              </div>
              <div className="mt-3 flex justify-between text-[0.58rem] uppercase tracking-[0.22em] text-creme/55">
                <span>Carvão</span>
                <span>Mibrasa</span>
              </div>
            </div>
          </div>

          {panels.map((panel) => (
            <article
              key={panel.id}
              className="group relative w-full shrink-0 overflow-hidden border border-linha bg-carvao lg:h-[72vh] lg:w-[52vw]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carvao via-carvao/25 to-transparent" />
              </div>

              <div className="relative p-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-[0.6rem] uppercase tracking-[0.28em] text-brasa">
                    {panel.index}
                  </span>
                  <span className="h-px w-6 bg-creme/25" />
                  <span className="text-[0.58rem] uppercase tracking-[0.24em] text-creme/60">
                    {panel.kicker}
                  </span>
                </div>
                <h3 className="display text-[clamp(2.2rem,4vw,3.8rem)]">
                  {panel.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-creme/65">
                  {panel.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
