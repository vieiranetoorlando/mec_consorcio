import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/cartas", label: "Cartas Contempladas" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  return (
    <header className="border-b border-neutral-900 bg-neutral-950/95 backdrop-blur">
      <Container className="flex h-32 items-center justify-between">
        <Link href="/" className="group flex items-center gap-4">
          <span className="relative inline-flex">
            <span className="absolute inset-0 scale-110 rounded-full bg-gold-500/20 blur-md transition group-hover:bg-gold-500/30" />
            <span className="relative block h-28 w-28 overflow-hidden rounded-full border-2 border-gold-600/80 bg-neutral-950 shadow-[0_10px_28px_rgba(212,169,78,0.25)]">
              <Image
                src="/images/mec-logo.png"
                alt="MEC Consorcio"
                width={224}
                height={224}
                className="h-full w-full object-cover"
                priority
              />
            </span>
          </span>
          <span className="hidden text-xs font-semibold tracking-[0.22em] text-gold-300 md:block">
            MEC CONSORCIO
          </span>
          <span className="sr-only">MEC Consorcio</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-xs font-medium text-neutral-200 transition hover:bg-neutral-900 hover:text-gold-300 sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
