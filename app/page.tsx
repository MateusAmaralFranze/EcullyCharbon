import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Fogo } from "@/components/sections/Fogo";
import { Destaques } from "@/components/sections/Destaques";
import { Chefs } from "@/components/sections/Chefs";
import { Galeria } from "@/components/sections/Galeria";
import { HappyHour } from "@/components/sections/HappyHour";
import { Localizacao } from "@/components/sections/Localizacao";
import { ReservaCTA } from "@/components/sections/ReservaCTA";
import { Marquee } from "@/components/ui/Marquee";

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="border-y border-linha bg-carvao-2 py-5 md:py-7">
        <Marquee
          items={[
            "Carvão",
            "Brasa",
            "Black Angus",
            "Mibrasa",
            "Perdizes",
            "Desde 2013",
          ]}
          duration={46}
          itemClassName="display uppercase text-creme/85"
        />
      </div>

      <Manifesto />
      <Fogo />
      <Destaques />
      <Chefs />
      <Galeria />
      <HappyHour />
      <Localizacao />
      <ReservaCTA />
    </>
  );
}
