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
        <thead className="bg-neutral-950 text-xs tracking-wide text-neutral-400 uppercase">
          <tr>
            <th className="px-4 py-3">Sel.</th>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Crédito</th>
            <th className="px-4 py-3">Entrada</th>
            <th className="px-4 py-3">Parcela</th>
            <th className="px-4 py-3">Prazo</th>
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
                  aria-label={`Selecionar carta ${carta.id}`}
                />
              </td>
              <td className="px-4 py-3 text-gold-300">{carta.id}</td>
              <td className="px-4 py-3">{carta.tipo}</td>
              <td className="px-4 py-3">{formatCurrencyBRL(carta.valorCredito)}</td>
              <td className="px-4 py-3">{formatCurrencyBRL(carta.entrada)}</td>
              <td className="px-4 py-3">{formatCurrencyBRL(carta.parcela)}</td>
              <td className="px-4 py-3">{carta.prazo} meses</td>
              <td className="px-4 py-3">{carta.administradora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
