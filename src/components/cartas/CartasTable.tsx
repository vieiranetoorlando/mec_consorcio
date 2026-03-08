import { toCartaReference } from "@/lib/cartaReference";
import { formatParcelasFlow } from "@/lib/cartas";
import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import type { Carta } from "@/types/cartas";

type CartasTableProps = {
  cartas: Carta[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export function CartasTable({ cartas, selectedIds, onToggle }: CartasTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-neutral-950 text-xs uppercase tracking-wide text-neutral-400">
          <tr>
            <th className="px-4 py-3">Sel.</th>
            <th className="px-4 py-3">Ref.</th>
            <th className="px-4 py-3">Tipo</th>
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
                  aria-label={`Selecionar carta ${toCartaReference(carta.id)}`}
                />
              </td>
              <td className="px-4 py-3 font-medium text-gold-300">
                {toCartaReference(carta.id)}
              </td>
              <td className="px-4 py-3">{carta.tipo}</td>
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
