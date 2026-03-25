import { PrimaryButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function HeroSection() {
  const link = buildWhatsAppLink(
    "OlÃ¡! Quero entender as melhores opÃ§Ãµes de consÃ³rcio e cartas contempladas.",
  );

  return (
    <section className="relative overflow-hidden border-b border-neutral-900 py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7a5b1d22,transparent_48%)]" />
      <Container className="relative">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex max-w-2xl rounded-full border border-gold-500/30 bg-neutral-900/70 px-4 py-2 text-xs text-gold-100/90">
            "Entrega o teu caminho ao Senhor; confia nele, e o mais ele farÃ¡." Salmos 37:5
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            MEC ConsÃ³rcio
          </p>
          <h1 className="text-3xl leading-tight font-bold tracking-tight text-white sm:text-5xl">
            Conquiste seu patrimÃ´nio com estratÃ©gia e seguranÃ§a.
          </h1>
          <p className="text-base text-neutral-300 sm:text-lg">
            Especialista em consÃ³rcios e cartas contempladas para imÃ³vel, automÃ³vel,
            caminhÃµes, maquinÃ¡rios e capital de giro.
          </p>
          <PrimaryButton href={link}>Falar com especialista no WhatsApp</PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
