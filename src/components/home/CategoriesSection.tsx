import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const categories = [
  "Imóvel",
  "Automóvel",
  "Caminhões",
  "Maquinários",
  "Capital de giro",
];

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionTitle
          eyebrow="Categorias"
          title="Soluções para diferentes objetivos"
          description="Atendimento consultivo para perfis pessoais e empresariais, com foco em planejamento e resultado."
          centered
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <article
              key={category}
              className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 text-center"
            >
              <p className="text-sm font-semibold text-gold-300">{category}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
