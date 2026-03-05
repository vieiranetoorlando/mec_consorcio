import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function SpecialistSection() {
  return (
    <section className="border-y border-neutral-900 bg-neutral-900/35 py-16 sm:py-20">
      <Container className="grid gap-8 lg:grid-cols-[320px_1fr] lg:items-center">
        <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
          <Image
            src="/images/menderson.jpg"
            alt="Consultor Menderson - MEC Consórcio"
            width={640}
            height={640}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="space-y-5">
          <SectionTitle
            eyebrow="Especialista em Consórcios"
            title="Atendimento direto com Menderson"
          />
          <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
            Mais do que vender uma carta, o trabalho é orientar decisões com visão de
            longo prazo. O objetivo é alinhar valor de crédito, prazo, entrada e parcela
            para construir patrimônio com previsibilidade.
          </p>
          <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
            Com experiência prática em negociações e estruturação de carteira, Menderson
            atende pessoas físicas e empresas que buscam crescimento com disciplina
            financeira.
          </p>
        </div>
      </Container>
    </section>
  );
}
