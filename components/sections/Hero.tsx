"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { whenSiteReady } from "@/lib/ready";
import { site } from "@/lib/site";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const background = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!section.current || prefersReducedMotion()) return;

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out" },
      });

      timeline
        .from(
          background.current,
          { scale: 1.14, duration: 1.8, ease: "expo.out" },
          0
        )
        .from(
          section.current.querySelectorAll("[data-hero-line]"),
          { yPercent: 120, duration: 1.3, stagger: 0.1 },
          0.15
        )
        .from(
          section.current.querySelectorAll("[data-hero-meta]"),
          { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 },
          0.75
        )
        .from(
          cue.current,
          { opacity: 0, y: 10, duration: 0.8 },
          1.15
        );

      const stop = whenSiteReady(() => timeline.play());

      const parallax = gsap.to(background.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const fade = gsap.to(content.current, {
        yPercent: -14,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        stop();
        parallax.kill();
        fade.kill();
      };
    },
    { scope: section }
  );

  return (
    <section
      ref={section}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
      aria-label="Ecully Charbon — hamburgueria na brasa em Perdizes"
    >
      <div
        ref={background}
        className="absolute inset-[-8%] scale-[1.02] will-change-transform"
      >
        <Image
          src="/images/ambiente.webp"
          alt="Ambiente do Ecully Charbon, em Perdizes"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-carvao/85 via-carvao/35 to-carvao" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_35%,transparent_10%,rgba(11,10,9,0.55)_90%)]" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-brasa/10 blur-[130px]" />

      <div
        ref={content}
        className="shell relative z-10 flex flex-1 flex-col justify-end pb-8 pt-32 md:pb-10 md:pt-36"
      >
        <div className="mb-8 flex items-center gap-4 md:mb-10" data-hero-meta>
          <span className="h-px w-10 bg-brasa" />
          <p className="eyebrow !text-creme/75">
            Perdizes · São Paulo · Desde 2013
          </p>
        </div>

        <h1 className="display text-[clamp(3rem,9vw,8.4rem)] uppercase">
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-hero-line className="block">
              Primitivo
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-hero-line className="block">
              <span className="display-italic normal-case text-brasa">no fogo,</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-hero-line className="block">
              contemporâneo
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-hero-line className="block">
              <span className="display-italic normal-case">no sabor.</span>
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1fr_auto] md:items-end">
          <p
            data-hero-meta
            className="max-w-md text-sm leading-relaxed text-creme/65 md:text-[0.95rem]"
          >
            Black Angus, carvão e a técnica de dois chefs formados no Institut
            Paul Bocuse. Uma hamburgueria que se leva a sério — sem perder a
            leveza.
          </p>

          <div data-hero-meta className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link href="/cardapio" className="btn btn-primary">
                Ver cardápio
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contato#reserva" className="btn btn-ghost">
                Reservar mesa
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between gap-6 border-t border-linha pt-5">
          <div data-hero-meta className="hidden gap-10 text-[0.62rem] uppercase tracking-[0.2em] text-creme/60 sm:flex">
            <span>{site.address.street}</span>
            <span>Ter–Sáb · 17h–23h</span>
          </div>

          <div
            ref={cue}
            className="ml-auto flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.24em] text-creme/60"
          >
            Role para descobrir
            <span className="relative flex h-10 w-5 items-start justify-center rounded-full border border-creme/25 pt-2">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brasa" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
