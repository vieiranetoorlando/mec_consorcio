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
      <Container className="flex flex-col gap-3 py-3 sm:h-28 sm:flex-row sm:items-center sm:justify-between sm:py-0">
        <Link href="/" className="group flex items-center">
          <span className="relative block h-14 w-[190px] overflow-hidden rounded-lg border border-gold-700/45 bg-neutral-950/90 shadow-[0_8px_24px_rgba(212,169,78,0.12)] sm:h-20 sm:w-[248px]">
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

        <nav className="w-full overflow-x-auto sm:w-auto sm:overflow-visible">
          <div className="mx-auto flex w-max items-center gap-2 rounded-full border border-neutral-800/90 bg-neutral-950/85 p-1.5 sm:gap-3">
            {navLinks.map((link) => (
              (() => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "rounded-full px-3 py-2 text-[11px] font-semibold transition sm:px-5 sm:text-sm",
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
          </div>
        </nav>
      </Container>
    </header>
  );
}
