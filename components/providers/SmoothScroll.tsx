"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const instance = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      autoRaf: false,
      anchors: false,
    });

    instance.current = lenisInstance;
    setLenis(lenisInstance);

    const onScroll = () => ScrollTrigger.update();
    lenisInstance.on("scroll", onScroll);

    const raf = (time: number) => lenisInstance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      lenisInstance.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenisInstance.destroy();
      instance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector<HTMLElement>(hash);
      if (target) {
        const offset = target.classList.contains("menu-section") ? 0 : -96;
        requestAnimationFrame(() => {
          lenis.scrollTo(target, { offset, immediate: true });
          ScrollTrigger.refresh();
        });
        return;
      }
    }

    lenis.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  useEffect(() => {
    if (!lenis) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey) return;

      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();
      const offset = target.classList.contains("menu-section") ? 0 : -96;
      lenis.scrollTo(target, { offset });
      window.history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
