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
      <Container className="flex h-28 items-center justify-between">
        <Link href="/" className="group flex items-center">
          <span className="relative block h-20 w-[248px] overflow-hidden rounded-lg border border-gold-700/45 bg-neutral-950/90 shadow-[0_8px_24px_rgba(212,169,78,0.12)]">
            <Image
              src="/images/mec-logo.png"
              alt="MEC Consorcio"
              width={1024}
              height={1024}
              className="h-full w-full scale-[1.85] object-contain"
              priority
            />
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
