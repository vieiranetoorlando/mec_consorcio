import { PrimaryButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function HeroSection() {
  const link = buildWhatsAppLink(
    "Olá! Quero entender as melhores opções de consórcio e cartas contempladas.",
  );

  return (
    <section className="relative overflow-hidden border-b border-neutral-900 py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7a5b1d22,transparent_48%)]" />
      <Container className="relative">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            MEC Consórcio
          </p>
          <h1 className="text-3xl leading-tight font-bold tracking-tight text-white sm:text-5xl">
            Conquiste seu patrimônio com estratégia e segurança.
          </h1>
          <p className="text-base text-neutral-300 sm:text-lg">
            Especialista em consórcios e cartas contempladas para imóvel, automóvel,
            caminhões, maquinários e capital de giro.
          </p>
          <PrimaryButton href={link}>Falar com especialista no WhatsApp</PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
