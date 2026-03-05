"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/Container";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/cartas", label: "Cartas Contempladas" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-neutral-900 bg-neutral-950/95 backdrop-blur">
      <Container className="flex h-30 items-center justify-between">
        <Link href="/" className="group flex items-center gap-4">
          <span className="relative inline-flex">
            <span className="absolute inset-0 scale-110 rounded-full bg-gold-500/25 blur-md transition group-hover:bg-gold-500/35" />
            <span className="relative block h-24 w-24 overflow-hidden rounded-full border-2 border-gold-600/80 bg-black shadow-[0_8px_24px_rgba(212,169,78,0.25)]">
            <Image
              src="/images/mec-logo.png"
              alt="MEC Consorcio"
              width={192}
              height={192}
              className="h-full w-full object-cover"
              priority
            />
            </span>
          </span>
          <span className="hidden text-xs font-semibold tracking-[0.24em] text-gold-300 sm:block">
            MEC CONSORCIO
          </span>
          <span className="sr-only">MEC Consorcio</span>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-neutral-800/90 bg-neutral-950/85 p-1.5 sm:gap-3">
          {navLinks.map((link) => (
            (() => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "rounded-full px-4 py-2 text-xs font-semibold transition sm:px-5 sm:text-sm",
                    isActive
                      ? "bg-gold-500 text-neutral-950 shadow-[0_4px_14px_rgba(212,169,78,0.35)]"
                      : "text-neutral-200 hover:bg-neutral-900 hover:text-gold-300",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })()
          ))}
        </nav>
      </Container>
    </header>
  );
}
