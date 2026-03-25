import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import type { ResumoSelecao } from "@/types/cartas";

type SelectionSummaryStickyProps = {
  resumo: ResumoSelecao;
  onOpenModal: () => void;
  onClear: () => void;
};

export function SelectionSummarySticky({
  resumo,
  onOpenModal,
  onClear,
}: SelectionSummaryStickyProps) {
  if (!resumo.quantidade) return null;

  return (
    <aside className="sticky bottom-4 rounded-xl border border-gold-700/70 bg-neutral-950/95 p-4 shadow-lg backdrop-blur lg:top-24 lg:bottom-auto">
      <h3 className="text-sm font-semibold text-gold-300">Cotas selecionadas</h3>

      <dl className="mt-4 space-y-2 text-xs text-neutral-200">
        <div className="flex justify-between gap-4">
          <dt>Administradora</dt>
          <dd>{resumo.administradora ?? "-"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Cartas</dt>
          <dd>{resumo.quantidade}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Crédito total</dt>
          <dd>{formatCurrencyBRL(resumo.totalCredito)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Entrada total</dt>
          <dd>{formatCurrencyBRL(resumo.totalEntrada)}</dd>
        </div>
      </dl>

      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex w-full items-center justify-center rounded-md border border-gold-500 bg-gold-500 px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-gold-400"
        >
          Somar cotas
        </button>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex w-full items-center justify-center rounded-md border border-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-900"
        >
          Limpar cotas
        </button>
      </div>
    </aside>
  );
}
