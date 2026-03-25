import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function SpecialistSection() {
  return (
    <section className="border-y border-neutral-900 bg-neutral-900/35 py-16 sm:py-20">
      <Container className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-center">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
          <Image
            src="/images/menderson.jpg"
            alt="Consultor Menderson - MEC ConsÃ³rcio"
            width={720}
            height={840}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="space-y-5">
          <SectionTitle
            eyebrow="Atendimento Institucional"
            title="Confiança construída com proximidade e clareza"
            description="Espaço institucional pensado para apresentar a imagem do consultor e da família com sobriedade, reforçando credibilidade no primeiro contato."
          />
          <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
            O atendimento é direto, consultivo e focado em orientar uma decisão segura.
            Cada carta é analisada com atenção ao crédito, à entrada, ao prazo e ao
            fluxo de parcelas para manter coerência com o objetivo do cliente.
          </p>
          <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
            A estrutura desta área foi mantida simples para permitir a troca da imagem
            atual por uma foto institucional da família sem exigir mudança de layout.
          </p>
        </div>
      </Container>
    </section>
  );
}
