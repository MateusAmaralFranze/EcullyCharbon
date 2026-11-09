import type { Metadata } from "next";
import Link from "next/link";
import { MenuExperience } from "@/components/menu/MenuExperience";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cardápio",
  description:
    "Cardápio completo do Ecully Charbon: entradas, sanduíches de Black Angus, wagyu e pastrami, sobremesas, drinks autorais, cervejas e opções sem álcool.",
  alternates: {
    canonical: "/cardapio",
  },
  openGraph: {
    title: "Cardápio · Ecully Charbon",
    description:
      "Entradas, sanduíches, sobremesas e drinks do Ecully Charbon, em Perdizes.",
    url: "/cardapio",
  },
};

export default function CardapioPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-32 md:pb-14 md:pt-44">
        <div className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-brasa/8 blur-[130px]" />
        <div className="shell relative">
          <Reveal className="mb-7 flex items-center gap-4">
            <span className="text-[0.6rem] uppercase tracking-[0.28em] text-brasa">
              Cardápio
            </span>
            <span className="h-px w-8 bg-linha" />
            <p className="eyebrow">Atualizado em outubro de 2026</p>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <h1 className="display text-[clamp(3.2rem,8.6vw,8rem)]">
                Fogo, técnica
                <br />
                <span className="display-italic text-brasa">e apetite.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:pb-3">
              <p className="max-w-sm text-sm leading-relaxed text-creme/55">
                Tudo o que sai da nossa cozinha e do nosso bar, com o detalhe
                que cada prato merece. Escolha uma categoria, busque um prato
                ou leia com calma — a mesa é sua.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#entradas" className="btn btn-ghost !px-5 !py-2.5">
                  Comidas
                </a>
                <a href="#drinks" className="btn btn-ghost !px-5 !py-2.5">
                  Bebidas
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MenuExperience />

      <section className="shell pb-24 md:pb-32">
        <Reveal className="flex flex-col gap-8 border-y border-linha py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-3">Prefere não escolher sozinho?</p>
            <h2 className="display text-[clamp(2rem,4vw,3.4rem)]">
              Deixe o chef
              <span className="display-italic text-brasa"> decidir.</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-creme/60">
              O Burger do Chef e o Burguer de Wagyu são boas portas de entrada.
              E o Cookie Charbon é a saída que ninguém lamenta.
            </p>
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

        <p className="mt-6 text-[0.58rem] uppercase leading-relaxed tracking-[0.18em] text-creme/55">
          Preços e disponibilidade podem sofrer alterações. Consulte a equipe ·
          {site.address.street}, {site.address.district} · {site.phone}
        </p>
      </section>
    </>
  );
}
