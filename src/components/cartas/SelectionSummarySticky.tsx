import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import type { ResumoSelecao } from "@/types/cartas";

type SelectionSummaryStickyProps = {
  resumo: ResumoSelecao;
  whatsappLink: string;
};

export function SelectionSummarySticky({
  resumo,
  whatsappLink,
}: SelectionSummaryStickyProps) {
  if (!resumo.quantidade) return null;

  return (
    <aside className="sticky bottom-4 rounded-xl border border-gold-700/70 bg-neutral-950/95 p-4 shadow-lg backdrop-blur lg:top-24 lg:bottom-auto">
      <h3 className="text-sm font-semibold text-gold-300">Resumo da Seleção</h3>

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
          <dt>Total crédito</dt>
          <dd>{formatCurrencyBRL(resumo.totalCredito)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Total entrada</dt>
          <dd>{formatCurrencyBRL(resumo.totalEntrada)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Total transferência</dt>
          <dd>{formatCurrencyBRL(resumo.totalTransferencia)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Saldo devedor</dt>
          <dd>{formatCurrencyBRL(resumo.totalSaldoDevedor)}</dd>
        </div>
      </dl>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold text-gold-300">Composição das parcelas</p>
        <ul className="space-y-1 text-xs text-neutral-200">
          {resumo.parcelasComposicao.map((bloco, index) => (
            <li key={`${bloco.meses}-${index}`} className="flex justify-between gap-3">
              <span>{bloco.meses}x</span>
              <span>{formatCurrencyBRL(bloco.valor)}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-gold-500 bg-gold-500 px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-gold-400"
      >
        Enviar seleção no WhatsApp
      </a>
    </aside>
  );
}
