import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import type { Carta } from "@/types/cartas";

type CartaCardProps = {
  carta: Carta;
  selected: boolean;
  onToggle: (id: string) => void;
};

export function CartaCard({ carta, selected, onToggle }: CartaCardProps) {
  return (
    <article className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-gold-400">{carta.id}</p>
          <h3 className="mt-1 text-base font-semibold text-white">{carta.tipo}</h3>
        </div>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(carta.id)}
          className="mt-1 h-4 w-4 accent-[#d4a94e]"
          aria-label={`Selecionar carta ${carta.id}`}
        />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div>
          <dt className="text-neutral-400">Crédito</dt>
          <dd className="font-semibold text-neutral-100">
            {formatCurrencyBRL(carta.valorCredito)}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-400">Entrada</dt>
          <dd className="font-semibold text-neutral-100">{formatCurrencyBRL(carta.entrada)}</dd>
        </div>
        <div>
          <dt className="text-neutral-400">Parcela</dt>
          <dd className="font-semibold text-neutral-100">{formatCurrencyBRL(carta.parcela)}</dd>
        </div>
        <div>
          <dt className="text-neutral-400">Prazo</dt>
          <dd className="font-semibold text-neutral-100">{carta.prazo} meses</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-neutral-400">Administradora: {carta.administradora}</p>
      {carta.descricao ? <p className="mt-2 text-xs text-neutral-300">{carta.descricao}</p> : null}
    </article>
  );
}
