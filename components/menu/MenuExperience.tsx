"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import {
  allSections,
  drinkSections,
  featuredItems,
  foodSections,
  formatPrice,
  type MenuItem,
  type MenuSection,
} from "@/lib/menu";
import { useLenis } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

const groups = [
  { label: "Comidas", sections: foodSections },
  { label: "Bebidas", sections: drinkSections },
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const sectionByItem = new Map<string, string>();
allSections.forEach((section) =>
  section.items.forEach((item) => sectionByItem.set(item.id, section.id))
);

export function MenuExperience() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(allSections[0]?.id ?? "");
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const normalizedQuery = normalize(query.trim());

  const filteredGroups = useMemo(() => {
    if (!normalizedQuery) return groups;

    return groups.map((group) => ({
      label: group.label,
      sections: group.sections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            normalize(
              [item.name, item.description, item.tags?.join(" ")]
                .filter(Boolean)
                .join(" ")
            ).includes(normalizedQuery)
          ),
        }))
        .filter((section) => section.items.length > 0),
    }));
  }, [normalizedQuery]);

  const resultCount = filteredGroups.reduce(
    (total, group) =>
      total +
      group.sections.reduce((sum, section) => sum + section.items.length, 0),
    0
  );

  useEffect(() => {
    const ids = allSections.map((section) => section.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      if (!normalizedQuery) return;

      const items = root.current.querySelectorAll(".menu-item");
      if (!items.length) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.015,
          ease: "power2.out",
          overwrite: true,
        }
      );
    },
    { scope: root, dependencies: [normalizedQuery] }
  );

  const scrollToSection = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    const element = document.getElementById(id);
    if (!element || !lenis) return;
    event.preventDefault();
    // o alvo tem scroll-margin-top; o Lenis já desconta essa margem
    lenis.scrollTo(element, { offset: 0 });
    window.history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  const printMenu = () => {
    setQuery("");
    window.setTimeout(() => window.print(), 120);
  };

  return (
    <div ref={root} className="menu-print">
      <div className="sticky top-[72px] z-30 border-y border-linha bg-carvao/92 backdrop-blur-xl md:top-20">
        <div className="shell flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <nav
            aria-label="Categorias do cardápio"
            className="no-scrollbar -mx-1 flex items-center gap-1 overflow-x-auto"
          >
            {allSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(event) => scrollToSection(event, section.id)}
                aria-current={active === section.id ? "true" : undefined}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-2 text-[0.6rem] uppercase tracking-[0.16em] transition-colors",
                  active === section.id
                    ? "bg-creme text-carvao"
                    : "text-creme/60 hover:text-creme"
                )}
              >
                {section.title}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <label className="relative flex-1 lg:w-64 lg:flex-none">
              <span className="sr-only">Buscar no cardápio</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-creme/55"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16.5 16.5 4 4" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar prato, drink..."
                className="w-full border-b border-linha bg-transparent py-2 pl-6 pr-2 text-xs text-creme placeholder:text-creme/55 focus:border-brasa focus:outline-none"
              />
            </label>

            <button
              type="button"
              onClick={printMenu}
              className="no-print shrink-0 rounded-full border border-linha px-3.5 py-2 text-[0.58rem] uppercase tracking-[0.16em] text-creme/55 transition-colors hover:border-creme/40 hover:text-creme"
            >
              Imprimir
            </button>
          </div>
        </div>
      </div>

      <div className="shell pb-24 pt-14 md:pb-32 md:pt-20">
        {normalizedQuery ? (
          <p className="mb-10 text-xs uppercase tracking-[0.2em] text-creme/60">
            {resultCount} {resultCount === 1 ? "resultado" : "resultados"} para
            <span className="text-creme"> “{query}”</span>
          </p>
        ) : (
          <FeaturedStrip />
        )}

        {filteredGroups.map((group) =>
          group.sections.length ? (
            <div key={group.label} className="mb-16 md:mb-24">
              <div className="mb-10 flex items-end justify-between border-b border-linha pb-4">
                <h2 className="display text-3xl md:text-4xl">{group.label}</h2>
                <span className="text-[0.58rem] uppercase tracking-[0.22em] text-creme/55">
                  {group.sections.length}{" "}
                  {group.sections.length === 1 ? "categoria" : "categorias"}
                </span>
              </div>

              <div className="space-y-16 md:space-y-24">
                {group.sections.map((section) => (
                  <MenuSectionBlock key={section.id} section={section} />
                ))}
              </div>
            </div>
          ) : null
        )}

        {normalizedQuery && resultCount === 0 ? (
          <div className="border-y border-linha py-20 text-center">
            <p className="display text-3xl text-creme/80">
              Nada encontrado por aqui.
            </p>
            <p className="mt-3 text-sm text-creme/60">
              Tente outro termo ou fale com a gente pelo WhatsApp.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="btn btn-ghost mt-6"
            >
              Limpar busca
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FeaturedStrip() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    captured: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    moved: 0,
  });

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const element = scroller.current;
    if (!element) return;

    drag.current = {
      active: true,
      captured: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: element.scrollLeft,
      moved: 0,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = scroller.current;
    if (!element || !drag.current.active) return;

    const distance = event.clientX - drag.current.startX;

    // só assume o ponteiro depois de um movimento real, para não bloquear cliques
    if (!drag.current.captured && Math.abs(distance) > 4) {
      drag.current.captured = true;
      element.setPointerCapture(event.pointerId);
      element.style.scrollSnapType = "none";
      element.style.cursor = "grabbing";
      element.style.userSelect = "none";
    }

    if (!drag.current.captured) return;

    drag.current.moved = Math.max(drag.current.moved, Math.abs(distance));
    element.scrollLeft = drag.current.startScroll - distance;
  };

  const endDrag = () => {
    const element = scroller.current;
    if (!element || !drag.current.active) return;

    drag.current.active = false;
    drag.current.captured = false;
    element.style.scrollSnapType = "";
    element.style.cursor = "";
    element.style.userSelect = "";
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (scroller.current?.hasPointerCapture?.(event.pointerId)) {
      scroller.current.releasePointerCapture(event.pointerId);
    }
    endDrag();
  };

  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (drag.current.moved > 6) {
      event.preventDefault();
      event.stopPropagation();
    }
    drag.current.moved = 0;
  };

  return (
    <section aria-labelledby="sugestoes" className="mb-16 md:mb-24">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-2">Para começar bem</p>
          <h2 id="sugestoes" className="display text-3xl md:text-4xl">
            Sugestões da casa
          </h2>
        </div>
        <span className="hidden items-center gap-2 text-[0.58rem] uppercase tracking-[0.22em] text-creme/55 sm:flex">
          <span aria-hidden="true">↔</span> Arraste para o lado
        </span>
      </div>

      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 md:mx-0 md:cursor-grab md:px-0"
      >
        {featuredItems.map((item) => (
          <a
            key={item.id}
            href={`#${sectionByItem.get(item.id) ?? ""}`}
            className="card-hover group w-[220px] shrink-0 snap-start md:w-[280px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-carvao-3">
              <Image
                src={item.image ?? "/images/foto-04.webp"}
                alt={item.imageAlt ?? item.name}
                fill
                sizes="280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carvao/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-xl leading-tight">{item.name}</p>
                <p className="mt-1 text-xs text-brasa">{formatPrice(item.price)}</p>
              </div>
              {item.tags?.[0] ? (
                <span className="absolute left-3 top-3 rounded-full border border-creme/25 bg-carvao/50 px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.18em] text-creme/75 backdrop-blur-sm">
                  {item.tags[0]}
                </span>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function MenuSectionBlock({ section }: { section: MenuSection }) {
  return (
    <section
      id={section.id}
      className="menu-section scroll-mt-40"
      aria-labelledby={`${section.id}-title`}
    >
      <div className="mb-7 grid gap-4 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="eyebrow mb-3 text-brasa">{section.kicker}</p>
          <h3
            id={`${section.id}-title`}
            className="display text-[clamp(2.2rem,4vw,3.4rem)]"
          >
            {section.title}
          </h3>
        </div>
        {section.intro ? (
          <p className="max-w-sm text-sm leading-relaxed text-creme/60 md:col-span-5 md:justify-self-end">
            {section.intro}
          </p>
        ) : null}
      </div>

      {section.note ? (
        <p className="mb-6 border-l border-brasa/60 pl-4 text-xs leading-relaxed text-creme/55">
          {section.note}
        </p>
      ) : null}

      <div className="divide-y divide-linha border-t border-linha">
        {section.items.map((item) => (
          <MenuItemRow key={item.id} item={item} accent={section.id === "happy-hour"} />
        ))}
      </div>

      {section.extras?.length ? (
        <div className="mt-7 border border-linha bg-carvao-2 p-5 md:p-6">
          <p className="eyebrow mb-4">Adicionais</p>
          <ul className="grid gap-x-8 gap-y-2 text-xs text-creme/55 sm:grid-cols-2 lg:grid-cols-3">
            {section.extras.map((extra) => (
              <li key={extra.label} className="flex items-baseline justify-between gap-4">
                <span>{extra.label}</span>
                <span className="whitespace-nowrap text-creme/75">
                  {formatPrice(extra.price)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function MenuItemRow({ item, accent }: { item: MenuItem; accent?: boolean }) {
  return (
    <article className="menu-item group py-6 md:py-7">
      <div className="flex items-baseline gap-4 md:gap-6">
        <h4
          className={cn(
            "font-display text-xl leading-tight md:text-2xl",
            accent && "text-brasa"
          )}
        >
          {item.name}
        </h4>
        <span className="leader-fill" aria-hidden="true" />
        <span className="shrink-0 text-right">
          <span className="block text-sm text-creme md:text-[0.95rem]">
            {formatPrice(item.price)}
          </span>
          {item.unit ? (
            <span className="mt-0.5 block text-[0.55rem] uppercase tracking-[0.16em] text-creme/55">
              {item.unit}
            </span>
          ) : null}
        </span>
      </div>

      {item.description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-creme/60">
          {item.description}
        </p>
      ) : null}

      {item.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-linha px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.16em] text-creme/60"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {item.details?.length ? (
        <ul className="mt-4 grid gap-x-8 gap-y-1.5 text-xs leading-relaxed text-creme/55 sm:grid-cols-2">
          {item.details.map((detail) => (
            <li key={detail} className="flex gap-2">
              <span className="mt-[0.42rem] h-1 w-1 shrink-0 rounded-full bg-brasa/70" />
              {detail}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
