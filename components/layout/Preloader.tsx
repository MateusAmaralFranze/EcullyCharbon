"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { markSiteReady } from "@/lib/ready";
import { useLenis } from "@/components/providers/SmoothScroll";

const STORAGE_KEY = "charbon:intro:v1";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Preloader() {
  const [active, setActive] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useIsomorphicLayoutEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen || prefersReducedMotion()) {
      markSiteReady();
      return;
    }

    setActive(true);
  }, []);

  useEffect(() => {
    if (!active || !lenis) return;
    lenis.stop();
    return () => lenis.start();
  }, [active, lenis]);

  useGSAP(
    () => {
      if (!active || !root.current) return;

      const number = { value: 0 };
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          try {
            window.sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
          setActive(false);
          markSiteReady();
          lenis?.start();
          window.scrollTo(0, 0);
        },
      });

      timeline
        .set(root.current, { visibility: "visible" })
        .fromTo(
          ".preloader-mark",
          { clipPath: "inset(0 0 100% 0)", y: 12 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 1,
            ease: "expo.out",
          }
        )
        .to(
          number,
          {
            value: 100,
            duration: 1.35,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) {
                counter.current.textContent = String(
                  Math.round(number.value)
                ).padStart(3, "0");
              }
            },
          },
          0
        )
        .fromTo(
          progress.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.35, ease: "power2.inOut" },
          0
        )
        .to(
          ".preloader-inner",
          { yPercent: -8, opacity: 0, duration: 0.7, ease: "power2.in" },
          1.2
        )
        .to(
          root.current,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.85,
            ease: "expo.inOut",
          },
          1.35
        );
    },
    { scope: root, dependencies: [active] }
  );

  if (!active) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[110] flex flex-col justify-between bg-carvao px-5 py-6 md:px-10 md:py-8"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="flex items-start justify-between">
        <span className="eyebrow">Ecully Charbon</span>
        <span className="eyebrow hidden sm:block">Perdizes · São Paulo</span>
      </div>

      <div className="preloader-inner flex flex-col items-center gap-8">
        <Image
          src="/brand/charbon-logo-light.png"
          alt="Ecully Charbon"
          width={1600}
          height={396}
          priority
          sizes="(min-width: 768px) 300px, 220px"
          className="preloader-mark h-auto w-[220px] md:w-[300px]"
        />
        <p className="max-w-xs text-center text-[0.68rem] uppercase leading-relaxed tracking-[0.28em] text-creme-2/60">
          Primitivo no fogo
          <br />
          contemporâneo no sabor
        </p>
      </div>

      <div className="flex items-end justify-between gap-8">
        <span className="eyebrow">Acendendo o carvão</span>
        <div className="flex flex-1 flex-col items-end gap-3">
          <span
            ref={counter}
            className="font-display text-5xl leading-none tracking-tight md:text-6xl"
          >
            000
          </span>
          <div className="h-px w-full max-w-[280px] overflow-hidden bg-creme/15">
            <div
              ref={progress}
              className="h-full w-full origin-left bg-brasa"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
