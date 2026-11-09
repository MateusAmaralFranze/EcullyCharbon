import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type GalleryImage = {
  src: string;
  alt: string;
};

const rowA: GalleryImage[] = [
  { src: "/images/ambiente.webp", alt: "Salão do Ecully Charbon" },
  { src: "/images/foto-01.webp", alt: "Prato servido no Charbon" },
  { src: "/images/foto-04.webp", alt: "Hambúrguer finalizado na brasa" },
  { src: "/images/foto-06.webp", alt: "Detalhe do preparo na cozinha" },
];

const rowB: GalleryImage[] = [
  { src: "/images/fogo.webp", alt: "Brasa e carvão" },
  { src: "/images/foto-03.webp", alt: "Sanduíche do cardápio" },
  { src: "/images/foto-02.webp", alt: "Ambiente e detalhes da casa" },
  { src: "/images/foto-05.webp", alt: "Preparo dos pratos" },
];

function GalleryRow({
  images,
  reverse = false,
  duration = 58,
}: {
  images: GalleryImage[];
  reverse?: boolean;
  duration?: number;
}) {
  const sequence = [...images, ...images];

  return (
    <div className="marquee-pausable overflow-hidden">
      <div
        className={cn(
          "marquee-track gap-4 md:gap-6",
          reverse && "marquee-reverse"
        )}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {sequence.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            aria-hidden={index >= images.length}
            className="group relative h-[220px] w-[290px] shrink-0 overflow-hidden bg-carvao-3 md:h-[320px] md:w-[430px]"
          >
            <Image
              src={image.src}
              alt={index >= images.length ? "" : image.alt}
              fill
              sizes="(max-width: 768px) 290px, 430px"
              className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carvao/35 to-transparent opacity-60" />
            <figcaption className="absolute bottom-4 left-4 text-[0.55rem] uppercase tracking-[0.24em] text-creme/0 transition-colors duration-300 group-hover:text-creme/70">
              Ecully Charbon
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Galeria() {
  return (
    <section id="galeria" className="relative overflow-hidden py-24 md:py-36">
      <div className="shell mb-12 flex flex-col gap-8 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal className="mb-6 flex items-center gap-4">
            <span className="text-[0.6rem] uppercase tracking-[0.28em] text-brasa">
              05
            </span>
            <span className="h-px w-8 bg-linha" />
            <p className="eyebrow">Galeria</p>
          </Reveal>
          <Reveal>
            <h2 className="display text-[clamp(2.6rem,6vw,5.4rem)]">
              A casa,
              <br />
              <span className="display-italic text-brasa">por dentro.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pb-2">
          <p className="mb-4 max-w-xs text-sm leading-relaxed text-creme/55">
            Fogo, mesa, detalhes. Um pouco do que acontece todas as noites em
            Perdizes.
          </p>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="link-line text-[0.66rem] uppercase tracking-[0.22em] text-creme/70 hover:text-creme"
          >
            Ver no Instagram <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </div>

      <div className="space-y-4 md:space-y-6">
        <GalleryRow images={rowA} duration={64} />
        <GalleryRow images={rowB} reverse duration={78} />
      </div>
    </section>
  );
}
