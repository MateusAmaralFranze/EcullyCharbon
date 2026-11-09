"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/providers/SmoothScroll";

const links = [
  { href: "/", label: "Início", index: "01" },
  { href: "/cardapio", label: "Cardápio", index: "02" },
  { href: "/contato", label: "Contato", index: "03" },
];

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => {
      setScrolled(lenis.scroll > 24);
      setHidden(
        pathname === "/" && lenis.direction === 1 && lenis.scroll > 420 && !open
      );
    };

    lenis.on("scroll", onScroll);
    onScroll();

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis, open, pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-500",
          hidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "border-b border-linha bg-carvao/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="shell flex h-[72px] items-center justify-between md:h-20">
          <Link
            href="/"
            aria-label="Ecully Charbon — início"
            className="relative z-10 shrink-0"
          >
            <Image
              src="/brand/charbon-logo-light.png"
              alt="Ecully Charbon"
              width={1600}
              height={396}
              priority
              sizes="130px"
              className="h-[26px] w-auto md:h-8"
            />
          </Link>

          <nav
            aria-label="Navegação principal"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex"
          >
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={active}
                  className={cn(
                    "link-line text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors",
                    active ? "text-creme" : "text-creme/60 hover:text-creme"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contato#reserva"
              className="btn btn-primary hidden !px-5 !py-2.5 !text-[0.65rem] sm:inline-flex"
            >
              Reservar
            </Link>

            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
              className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span
                className={cn(
                  "h-px w-6 bg-creme transition-transform duration-300",
                  open && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-6 bg-creme transition-transform duration-300",
                  open && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    if (open) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const node = root.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !node) return;
      const focusables = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(() => {
      node?.querySelector<HTMLElement>("[data-close]")?.focus();
    }, 300);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
      previous?.focus();
    };
  }, [open, onClose]);

  useGSAP(
    () => {
      if (!root.current) return;

      const overlay = root.current;
      const timeline = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      if (open) {
        timeline
          .set(overlay, { visibility: "visible", pointerEvents: "auto" })
          .fromTo(
            overlay,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.9,
              ease: "expo.inOut",
            }
          )
          .fromTo(
            overlay.querySelectorAll("[data-overlay-link]"),
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.45"
          )
          .fromTo(
            overlay.querySelectorAll("[data-overlay-meta]"),
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.05,
              ease: "power3.out",
            },
            "-=0.55"
          )
          .fromTo(
            overlay.querySelector("[data-overlay-image]"),
            { clipPath: "inset(100% 0 0 0)", scale: 1.12 },
            {
              clipPath: "inset(0% 0 0 0)",
              scale: 1,
              duration: 1.1,
              ease: "expo.out",
            },
            "-=0.8"
          );
      } else {
        timeline
          .to(overlay, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.65,
            ease: "expo.inOut",
          })
          .set(overlay, { visibility: "hidden", pointerEvents: "none" });
      }
    },
    { scope: root, dependencies: [open, pathname] }
  );

  return (
    <div
      id="site-menu"
      ref={root}
      aria-hidden={!open}
      className="invisible fixed inset-0 z-[60] flex flex-col bg-carvao"
      style={{ clipPath: "inset(0 0 100% 0)", pointerEvents: "none" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full bg-brasa/10 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-vinho/20 blur-[100px]" />
      </div>

      <div className="shell relative z-10 flex h-[72px] shrink-0 items-center justify-between md:h-20">
        <Link href="/" aria-label="Ecully Charbon — início">
          <Image
            src="/brand/charbon-logo-light.png"
            alt="Ecully Charbon"
            width={1600}
            height={396}
            sizes="130px"
            className="h-[26px] w-auto md:h-8"
          />
        </Link>
        <button
          type="button"
          data-close
          onClick={onClose}
          className="group flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.24em] text-creme/70 transition-colors hover:text-creme"
        >
          Fechar
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-linha transition-colors group-hover:border-creme/50">
            <span className="absolute h-px w-3.5 rotate-45 bg-current" />
            <span className="absolute h-px w-3.5 -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <div className="shell relative z-10 grid flex-1 grid-cols-1 items-center gap-12 pb-10 pt-6 lg:grid-cols-[1.35fr_0.65fr] lg:pb-16">
        <nav aria-label="Menu" className="flex flex-col">
          {links.map((link) => (
            <div key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                data-overlay-link
                onClick={onClose}
                className="group flex items-baseline gap-4 py-1.5 md:gap-8"
              >
                <span className="eyebrow w-8 shrink-0 !text-[0.6rem]">
                  {link.index}
                </span>
                <span className="display text-[clamp(2.75rem,9vw,7.5rem)] text-creme transition-colors duration-300 group-hover:text-brasa">
                  {link.label}
                </span>
                <span className="mb-2 hidden translate-x-[-10px] text-2xl opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
                  ↗
                </span>
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <div
            data-overlay-image
            className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden justify-self-end"
          >
            <Image
              src="/images/foto-02.webp"
              alt="Detalhe do ambiente do Ecully Charbon"
              fill
              sizes="320px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carvao/60 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-[0.6rem] uppercase leading-relaxed tracking-[0.24em] text-creme/70">
              Fogo, carvão e tempo.
              <br />
              Desde 2013, em Perdizes.
            </p>
          </div>
        </div>
      </div>

      <div className="shell relative z-10 shrink-0 border-t border-linha py-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div data-overlay-meta>
            <p className="eyebrow mb-2">Endereço</p>
            <p className="text-sm leading-relaxed text-creme/75">
              {site.address.street}
              <br />
              {site.address.district} · {site.address.city}
            </p>
          </div>
          <div data-overlay-meta>
            <p className="eyebrow mb-2">Horários</p>
            <p className="text-sm leading-relaxed text-creme/75">
              Ter a sáb · 17h às 23h
              <br />
              Dom · 16h às 23h
            </p>
          </div>
          <div data-overlay-meta className="flex flex-col gap-2">
            <p className="eyebrow mb-2">Contato</p>
            <a
              href={site.phoneHref}
              className="link-line w-fit text-sm text-creme/75 hover:text-creme"
            >
              {site.phone}
            </a>
            <div className="flex gap-4 text-[0.65rem] uppercase tracking-[0.2em] text-creme/55">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brasa"
              >
                Instagram
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brasa"
              >
                Facebook
              </a>
              <a
                href={site.ifood}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brasa"
              >
                iFood
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
