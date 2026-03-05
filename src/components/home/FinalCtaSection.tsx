import { PrimaryButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function FinalCtaSection() {
  const link = buildWhatsAppLink(
    "Olá! Quero simular uma opção de carta contemplada com você.",
  );

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="rounded-2xl border border-gold-700/60 bg-neutral-900 p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Pronto para escolher sua carta contemplada?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-300 sm:text-base">
            Receba orientação personalizada para encontrar a melhor opção de crédito para
            seu objetivo.
          </p>
          <PrimaryButton href={link} className="mt-7">
            Iniciar atendimento no WhatsApp
          </PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
