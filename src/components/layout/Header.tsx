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
      <Container className="flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="relative block h-16 w-[220px] overflow-hidden rounded-md border border-neutral-800 bg-black/80">
            <Image
              src="/images/mec-logo.png"
              alt="MEC Consorcio"
              width={660}
              height={192}
              className="h-full w-full object-contain p-1"
              priority
            />
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
