import type { Metadata } from "next";

import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { SpecialistSection } from "@/components/home/SpecialistSection";

export const metadata: Metadata = {
  title: "Início",
  description:
    "MEC Consórcio oferece consórcios e cartas contempladas com atendimento consultivo para acelerar sua conquista.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <SpecialistSection />
      <FinalCtaSection />
    </>
  );
}
