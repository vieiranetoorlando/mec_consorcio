import Image from "next/image";

import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-900 bg-neutral-950 py-10">
      <Container className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <span className="relative block h-14 w-[180px] overflow-hidden rounded-md border border-neutral-800 bg-black/80">
            <Image
              src="/images/mec-logo.png"
              alt="MEC Consorcio"
              width={540}
              height={154}
              className="h-full w-full object-contain p-1"
            />
          </span>
        </div>

        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} MEC Consorcio. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  );
}
