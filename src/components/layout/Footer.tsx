import Image from "next/image";

import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-900 bg-neutral-950 py-10">
      <Container className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex">
            <span className="absolute inset-0 scale-110 rounded-full bg-gold-500/20 blur-sm" />
            <span className="relative block h-16 w-16 overflow-hidden rounded-full border-2 border-gold-700/75 bg-black">
              <Image
                src="/images/mec-logo.png"
                alt="MEC Consorcio"
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </span>
          </span>
        </div>

        <p className="text-xs text-neutral-400">
          (c) {new Date().getFullYear()} MEC Consorcio. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  );
}
