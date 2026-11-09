import Image from "next/image";
import Link from "next/link";
import { foodSections, formatPrice, type MenuItem } from "@/lib/menu";
import { Reveal } from "@/components/ui/Reveal";

const highlightIds: Array<{ id: string; section: string }> = [
  { id: "wagyu", section: "sanduiches" },
  { id: "original", section: "sanduiches" },
  { id: "pastrami", section: "sanduiches" },
  { id: "cookie-charbon", section: "sobremesas" },
];

const items = highlightIds
  .map(({ id, section }) => {
    const item = foodSections
      .flatMap((group) => group.items)
      .find((candidate) => candidate.id === id);
    return item ? { ...item, section } : null;
  })
  .filter((item): item is MenuItem & { section: string } => Boolean(item));

export function Destaques() {
  return (
    <section id="destaques" className="relative overflow-hidden py-24 md:py-36">
      <div className="shell">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="text-[0.6rem] uppercase tracking-[0.28em] text-brasa">
                03
              </span>
              <span className="h-px w-8 bg-linha" />
              <p className="eyebrow">Assinaturas</p>
            </Reveal>
            <Reveal>
              <h2 className="display max-w-3xl text-[clamp(2.6rem,6vw,5.4rem)]">
                Do carvão
                <br />
                <span className="display-italic text-brasa">à mesa.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="max-w-sm lg:pb-2">
            <p className="text-sm leading-relaxed text-creme/60">
              Alguns pratos resumem a casa melhor do que qualquer discurso. Wagyu,
              Black Angus, pastrami feito aqui — e um cookie que justifica a
              sobremesa.
            </p>
            <Link
              href="/cardapio"
              className="link-line mt-5 inline-flex text-[0.66rem] uppercase tracking-[0.22em] text-creme/75 hover:text-creme"
            >
              Cardápio completo <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 0.06}
              className={index % 2 === 1 ? "lg:mt-16" : ""}
            >
              <Link
                href={`/cardapio#${item.section}`}
                className="card-hover group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-carvao-3">
                  <Image
                    src={item.image ?? "/images/foto-04.webp"}
                    alt={item.imageAlt ?? item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carvao/80 via-transparent to-transparent" />

                  {item.tags?.[0] ? (
                    <span className="absolute left-4 top-4 rounded-full border border-creme/25 bg-carvao/40 px-3 py-1 text-[0.55rem] uppercase tracking-[0.2em] text-creme/80 backdrop-blur-sm">
                      {item.tags[0]}
                    </span>
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <div>
                      <p className="text-[0.58rem] uppercase tracking-[0.22em] text-creme/60">
                        0{index + 1}
                      </p>
                      <h3 className="mt-1 font-display text-2xl leading-tight text-creme">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-brasa">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-creme/30 text-sm text-creme transition-colors duration-300 group-hover:border-brasa group-hover:bg-brasa group-hover:text-carvao">
                      ↗
                    </span>
                  </div>
                </div>
                <p className="mt-4 line-clamp-2 text-[0.8rem] leading-relaxed text-creme/60">
                  {item.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
