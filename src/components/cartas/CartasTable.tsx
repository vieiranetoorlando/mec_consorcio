import { CARTA_STATUS_LABELS, CARTA_TIPOS } from "@/domain/cartas/types";
import { toCartaReference } from "@/lib/cartaReference";
import { formatParcelasFlow } from "@/lib/cartas";
import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import type { Carta } from "@/types/cartas";

type CartasTableProps = {
  cartas: Carta[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

function getTipoDotClass(tipo: Carta["tipo"]): string {
  if (tipo === CARTA_TIPOS[0]) return "bg-amber-400";
  if (tipo === CARTA_TIPOS[1]) return "bg-sky-400";
  if (tipo === CARTA_TIPOS[2] || tipo === CARTA_TIPOS[3]) return "bg-emerald-400";
  return "bg-neutral-500";
}

export function CartasTable({ cartas, selectedIds, onToggle }: CartasTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-neutral-950 text-xs uppercase tracking-wide text-neutral-400">
          <tr>
            <th className="px-4 py-3">Sel.</th>
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Credito</th>
            <th className="px-4 py-3 text-right">Entrada</th>
            <th className="px-4 py-3 text-right">Parcela</th>
            <th className="px-4 py-3">Prazo</th>
            <th className="px-4 py-3 text-right">Saldo Devedor</th>
            <th className="px-4 py-3">Fluxo</th>
            <th className="px-4 py-3 text-right">Transferencia</th>
            <th className="px-4 py-3">Administradora</th>
          </tr>
        </thead>
        <tbody>
          {cartas.map((carta) => (
            <tr key={carta.id} className="border-t border-neutral-800 text-neutral-100">
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(carta.id)}
                  onChange={() => onToggle(carta.id)}
                  className="h-4 w-4 accent-[#d4a94e]"
                  aria-label={`Selecionar carta ${toCartaReference(carta.id, carta.codigo)}`}
                />
              </td>
              <td className="px-4 py-3 font-medium text-gold-300">
                {toCartaReference(carta.id, carta.codigo)}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${getTipoDotClass(carta.tipo)}`} />
                  <span>{carta.tipo}</span>
                </span>
              </td>
              <td className="px-4 py-3">{CARTA_STATUS_LABELS[carta.status]}</td>
              <td className="px-4 py-3 text-right tabular-nums">
                {formatCurrencyBRL(carta.valorCredito)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">
                {formatCurrencyBRL(carta.entrada)}
              </td>
              <td className="px-4 py-3 text-right font-semibold text-gold-300 tabular-nums">
                {formatCurrencyBRL(carta.parcela)}
              </td>
              <td className="px-4 py-3">{carta.prazo} meses</td>
              <td className="px-4 py-3 text-right tabular-nums">
                {formatCurrencyBRL(carta.saldoDevedor)}
              </td>
              <td className="px-4 py-3">{formatParcelasFlow(carta.parcelas)}</td>
              <td className="px-4 py-3 text-right tabular-nums">
                {formatCurrencyBRL(carta.transferencia)}
              </td>
              <td className="px-4 py-3">{carta.administradora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
