import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça Menderson, especialista em consórcios e cartas contempladas da MEC Consórcio.",
};

export default function SobrePage() {
  return (
    <section className="py-14 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[360px_1fr] lg:items-start">
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
          <Image
            src="/images/menderson.jpg"
            alt="Menderson, consultor da MEC Consórcio"
            width={720}
            height={720}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <SectionTitle
            eyebrow="Sobre o Consultor"
            title="Menderson | MEC Consórcio"
            description="Atendimento especializado para quem busca crescer com planejamento em consórcios."
          />

          <div className="space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
            <p>
              Menderson atua no mercado de consórcios com foco em estratégia patrimonial e
              previsibilidade financeira. O atendimento é consultivo, com análise de perfil e
              objetivo para indicação da carta mais aderente.
            </p>
            <p>
              Especialista em consórcios de imóvel, automóvel, caminhões, maquinários e capital
              de giro, conduz negociações com visão de longo prazo para pessoa física e jurídica.
            </p>
            <p>
              Empresas dos setores de logística, construção, agronegócio e comércio já foram
              atendidas em processos de expansão de ativos e organização financeira.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
