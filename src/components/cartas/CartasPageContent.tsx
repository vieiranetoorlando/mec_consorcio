"use client";

import { useMemo, useState } from "react";

import { CartaCard } from "@/components/cartas/CartaCard";
import { CartasFilters } from "@/components/cartas/CartasFilters";
import { CartasTable } from "@/components/cartas/CartasTable";
import { SelectionSummarySticky } from "@/components/cartas/SelectionSummarySticky";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buildWhatsAppMessage } from "@/lib/buildWhatsAppMessage";
import { computeSelectionSummary } from "@/lib/computeSelectionSummary";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Carta, Filtros } from "@/types/cartas";

type CartasPageContentProps = {
  cartas: Carta[];
};

const filtrosIniciais: Filtros = {
  tipos: [],
  valorCreditoMin: undefined,
  valorCreditoMax: undefined,
  parcelaMin: undefined,
  parcelaMax: undefined,
};

export function CartasPageContent({ cartas }: CartasPageContentProps) {
  const [filtros, setFiltros] = useState<Filtros>(filtrosIniciais);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const cartasFiltradas = useMemo(() => {
    return cartas.filter((carta) => {
      const tipoOk = filtros.tipos.length === 0 || filtros.tipos.includes(carta.tipo);

      const creditoMinOk =
        filtros.valorCreditoMin === undefined || carta.valorCredito >= filtros.valorCreditoMin;

      const creditoMaxOk =
        filtros.valorCreditoMax === undefined || carta.valorCredito <= filtros.valorCreditoMax;

      const parcelaMinOk =
        filtros.parcelaMin === undefined || carta.parcela >= filtros.parcelaMin;

      const parcelaMaxOk =
        filtros.parcelaMax === undefined || carta.parcela <= filtros.parcelaMax;

      return tipoOk && creditoMinOk && creditoMaxOk && parcelaMinOk && parcelaMaxOk;
    });
  }, [cartas, filtros]);

  const selectedCartas = useMemo(
    () => cartas.filter((carta) => selectedIds.includes(carta.id)),
    [cartas, selectedIds],
  );

  const resumo = useMemo(() => computeSelectionSummary(selectedCartas), [selectedCartas]);

  const whatsappLink = useMemo(() => {
    const mensagem = buildWhatsAppMessage(selectedCartas, resumo);
    return buildWhatsAppLink(mensagem);
  }, [selectedCartas, resumo]);

  function handleToggle(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow="Cartas Contempladas"
          title="Encontre a melhor combinação para seu objetivo"
          description="Filtre por tipo, crédito e parcela. Selecione múltiplas cartas e envie o resumo no WhatsApp."
        />

        <CartasFilters filtros={filtros} onChange={setFiltros} />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <p className="text-sm text-neutral-300">{cartasFiltradas.length} carta(s) encontrada(s)</p>

            <div className="grid gap-4 md:hidden">
              {cartasFiltradas.map((carta) => (
                <CartaCard
                  key={carta.id}
                  carta={carta}
                  selected={selectedIds.includes(carta.id)}
                  onToggle={handleToggle}
                />
              ))}
            </div>

            <div className="hidden md:block">
              <CartasTable
                cartas={cartasFiltradas}
                selectedIds={selectedIds}
                onToggle={handleToggle}
              />
            </div>
          </div>

          <SelectionSummarySticky resumo={resumo} whatsappLink={whatsappLink} />
        </div>
      </Container>
    </section>
  );
}
