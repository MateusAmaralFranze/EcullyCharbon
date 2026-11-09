"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  duration = 1,
  start = "top 86%",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;

      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          once,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type LineRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
};

export function LineReveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      const lines = ref.current.querySelectorAll("[data-line]");
      if (!lines.length) return;

      gsap.from(lines, {
        yPercent: 115,
        duration: 1.15,
        delay,
        stagger: 0.09,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

export function ParallaxImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  strength = 6,
  overlay = true,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  strength?: number;
  overlay?: boolean;
  children?: ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrap.current || !inner.current || prefersReducedMotion()) return;

      gsap.fromTo(
        inner.current,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: wrap }
  );

  return (
    <div
      ref={wrap}
      className={cn("relative overflow-hidden bg-carvao-3", className)}
    >
      <div ref={inner} className="absolute inset-[-8%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {overlay ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carvao/55 via-transparent to-carvao/10" />
      ) : null}
      {children}
    </div>
  );
}
