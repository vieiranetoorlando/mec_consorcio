"use client";

import { useMemo, useState } from "react";

import { CartaCard } from "@/components/cartas/CartaCard";
import { CartasFilters } from "@/components/cartas/CartasFilters";
import { CartasTable } from "@/components/cartas/CartasTable";
import { SelectionSummarySticky } from "@/components/cartas/SelectionSummarySticky";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CARTA_TIPOS } from "@/domain/cartas/types";
import { buildWhatsAppMessage } from "@/lib/buildWhatsAppMessage";
import { toCartaReference } from "@/lib/cartaReference";
import { computeSelectionSummary } from "@/lib/computeSelectionSummary";
import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import { validateSameAdministradora } from "@/lib/validateSameAdministradora";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Carta, Filtros, ResumoSelecao } from "@/types/cartas";

type CartasPageContentProps = {
  cartas: Carta[];
};

type CartasGroup = {
  title: string;
  cartas: Carta[];
};

const filtrosIniciais: Filtros = {
  tipos: [],
  valorCreditoMin: undefined,
  valorCreditoMax: undefined,
  parcelaMin: undefined,
  parcelaMax: undefined,
};

const grupoPesados = "Pesados";

function getGroupTitle(tipo: Carta["tipo"]): string {
  if (tipo === CARTA_TIPOS[2] || tipo === CARTA_TIPOS[3]) return grupoPesados;
  return tipo;
}

function sortByCredito(cartas: Carta[]): Carta[] {
  return [...cartas].sort((a, b) => a.valorCredito - b.valorCredito);
}

function buildVisibleGroups(cartas: Carta[]): CartasGroup[] {
  const grouped = new Map<string, Carta[]>();

  for (const carta of cartas) {
    const title = getGroupTitle(carta.tipo);
    const current = grouped.get(title) ?? [];
    current.push(carta);
    grouped.set(title, current);
  }

  const orderedTitles = [CARTA_TIPOS[0], CARTA_TIPOS[1], grupoPesados, CARTA_TIPOS[4]];

  return orderedTitles
    .map((title) => ({
      title,
      cartas: sortByCredito(grouped.get(title) ?? []),
    }))
    .filter((group) => group.cartas.length > 0);
}

function buildParcelasResumo(resumo: ResumoSelecao): string {
  if (!resumo.parcelasComposicao.length) return "Sem parcelas informadas.";

  return resumo.parcelasComposicao
    .map((bloco, index) =>
      index === 0
        ? `${bloco.meses}x de ${formatCurrencyBRL(bloco.valor)}`
        : `depois ${bloco.meses}x de ${formatCurrencyBRL(bloco.valor)}`,
    )
    .join(", ");
}

export function CartasPageContent({ cartas }: CartasPageContentProps) {
  const [filtros, setFiltros] = useState<Filtros>(filtrosIniciais);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const cartasFiltradas = useMemo(() => {
    const filtered = cartas.filter((carta) => {
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

    return sortByCredito(filtered);
  }, [cartas, filtros]);

  const visibleGroups = useMemo(
    () => (filtros.tipos.length === 0 ? buildVisibleGroups(cartasFiltradas) : []),
    [cartasFiltradas, filtros.tipos.length],
  );

  const selectedCartas = useMemo(
    () => cartas.filter((carta) => selectedIds.includes(carta.id)),
    [cartas, selectedIds],
  );

  const resumo = useMemo(() => computeSelectionSummary(selectedCartas), [selectedCartas]);

  const whatsappMessage = useMemo(
    () => buildWhatsAppMessage(selectedCartas, resumo),
    [selectedCartas, resumo],
  );

  const whatsappLink = useMemo(
    () => buildWhatsAppLink(whatsappMessage),
    [whatsappMessage],
  );

  const shareSupported =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  function handleToggle(id: string) {
    setSelectedIds((current) => {
      const isSelected = current.includes(id);
      if (isSelected) {
        setSelectionError(null);
        return current.filter((item) => item !== id);
      }

      const nextIds = [...current, id];
      const nextCartas = cartas.filter((carta) => nextIds.includes(carta.id));
      const validation = validateSameAdministradora(nextCartas);
      if (!validation.ok) {
        setSelectionError(validation.message ?? null);
        return current;
      }

      setSelectionError(null);
      return nextIds;
    });
  }

  function handleClearSelection() {
    setSelectedIds([]);
    setSelectionError(null);
    setCopyFeedback(null);
    setIsSummaryModalOpen(false);
  }

  async function handleCopySummary() {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopyFeedback("Resumo copiado.");
    } catch {
      setCopyFeedback("Não foi possível copiar o resumo.");
    }
  }

  async function handleShareSummary() {
    if (!shareSupported) return;

    try {
      await navigator.share({
        title: "Soma de cotas",
        text: whatsappMessage,
      });
    } catch {
      // Ignora cancelamento do usuário e falhas do compartilhamento nativo.
    }
  }

  return (
    <section className="py-12 sm:py-16">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow="Cartas Contempladas"
          title="Encontre a melhor combinação para seu objetivo"
          description="Filtre por tipo, crédito e parcela. Selecione múltiplas cartas e monte um resumo claro para atendimento."
        />

        <CartasFilters filtros={filtros} onChange={setFiltros} />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <p className="text-sm text-neutral-300">{cartasFiltradas.length} carta(s) encontrada(s)</p>
            {selectionError ? (
              <p className="text-xs font-medium text-amber-300">{selectionError}</p>
            ) : null}

            {filtros.tipos.length === 0 ? (
              <>
                <div className="space-y-6 md:hidden">
                  {visibleGroups.map((group) => (
                    <GroupedCardsSection
                      key={group.title}
                      title={group.title}
                      cartas={group.cartas}
                      selectedIds={selectedIds}
                      onToggle={handleToggle}
                    />
                  ))}
                </div>

                <div className="hidden space-y-6 md:block">
                  {visibleGroups.map((group) => (
                    <GroupedTableSection
                      key={group.title}
                      title={group.title}
                      cartas={group.cartas}
                      selectedIds={selectedIds}
                      onToggle={handleToggle}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          <SelectionSummarySticky
            resumo={resumo}
            onOpenModal={() => {
              setCopyFeedback(null);
              setIsSummaryModalOpen(true);
            }}
            onClear={handleClearSelection}
          />
        </div>
      </Container>

      {isSummaryModalOpen ? (
        <SelectionSummaryModal
          cartas={selectedCartas}
          resumo={resumo}
          whatsappLink={whatsappLink}
          shareSupported={shareSupported}
          copyFeedback={copyFeedback}
          onClose={() => setIsSummaryModalOpen(false)}
          onCopy={handleCopySummary}
          onShare={handleShareSummary}
        />
      ) : null}
    </section>
  );
}

type GroupedSectionProps = {
  title: string;
  cartas: Carta[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

function GroupedCardsSection({ title, cartas, selectedIds, onToggle }: GroupedSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="text-xs text-neutral-400">{cartas.length} carta(s)</span>
      </div>

      <div className="grid gap-4">
        {cartas.map((carta) => (
          <CartaCard
            key={carta.id}
            carta={carta}
            selected={selectedIds.includes(carta.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}

function GroupedTableSection({ title, cartas, selectedIds, onToggle }: GroupedSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="text-xs text-neutral-400">{cartas.length} carta(s)</span>
      </div>

      <CartasTable cartas={cartas} selectedIds={selectedIds} onToggle={onToggle} />
    </section>
  );
}

type SelectionSummaryModalProps = {
  cartas: Carta[];
  resumo: ResumoSelecao;
  whatsappLink: string;
  shareSupported: boolean;
  copyFeedback: string | null;
  onClose: () => void;
  onCopy: () => void;
  onShare: () => void;
};

function SelectionSummaryModal({
  cartas,
  resumo,
  whatsappLink,
  shareSupported,
  copyFeedback,
  onClose,
  onCopy,
  onShare,
}: SelectionSummaryModalProps) {
  const parcelasResumo = buildParcelasResumo(resumo);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/75 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              Soma de cotas
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white">Resumo da seleção</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-neutral-700 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-900"
          >
            Fechar
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryBox label="Administradora" value={resumo.administradora ?? "-"} />
          <SummaryBox label="Crédito total" value={formatCurrencyBRL(resumo.totalCredito)} />
          <SummaryBox label="Entrada total" value={formatCurrencyBRL(resumo.totalEntrada)} />
          <SummaryBox
            label="Saldo devedor total"
            value={formatCurrencyBRL(resumo.totalSaldoDevedor)}
          />
        </div>

        <section className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-white">Cartas selecionadas</h4>
            <span className="text-xs text-neutral-400">{cartas.length} carta(s)</span>
          </div>

          <div className="mt-4 space-y-3">
            {cartas.map((carta) => (
              <div
                key={carta.id}
                className="rounded-lg border border-neutral-800 bg-neutral-950/70 p-3 text-sm text-neutral-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="text-gold-300">
                    {toCartaReference(carta.id, carta.codigo)}
                  </strong>
                  <span>{formatCurrencyBRL(carta.valorCredito)}</span>
                </div>
                <p className="mt-1 text-xs text-neutral-400">
                  {carta.administradora} | {formatCurrencyBRL(carta.entrada)} de entrada
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
          <h4 className="text-sm font-semibold text-white">Resumo das parcelas</h4>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300">{parcelasResumo}</p>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-gold-500 bg-gold-500 px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-gold-400"
          >
            WhatsApp
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="rounded-md border border-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-900"
          >
            Copiar resumo
          </button>
          {shareSupported ? (
            <button
              type="button"
              onClick={onShare}
              className="rounded-md border border-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-900"
            >
              Compartilhar
            </button>
          ) : null}
        </div>

        {copyFeedback ? <p className="mt-3 text-xs text-gold-300">{copyFeedback}</p> : null}
      </div>
    </div>
  );
}

type SummaryBoxProps = {
  label: string;
  value: string;
};

function SummaryBox({ label, value }: SummaryBoxProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
      <p className="text-xs text-neutral-400">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
