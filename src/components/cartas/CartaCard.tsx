import { CARTA_STATUS_LABELS, CARTA_TIPOS } from "@/domain/cartas/types";
import { toCartaReference } from "@/lib/cartaReference";
import { formatParcelasFlow } from "@/lib/cartas";
import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import type { Carta } from "@/types/cartas";

type CartaCardProps = {
  carta: Carta;
  selected: boolean;
  onToggle: (id: string) => void;
};

function getTipoAccentClasses(tipo: Carta["tipo"]): string {
  if (tipo === CARTA_TIPOS[0]) return "border-l-amber-400";
  if (tipo === CARTA_TIPOS[1]) return "border-l-sky-400";
  if (tipo === CARTA_TIPOS[2] || tipo === CARTA_TIPOS[3]) return "border-l-emerald-400";
  return "border-l-neutral-500";
}

export function CartaCard({ carta, selected, onToggle }: CartaCardProps) {
  const referencia = toCartaReference(carta.id, carta.codigo);

  return (
    <article
      className={[
        "rounded-xl border border-neutral-800 border-l-4 bg-neutral-900/60 p-4",
        getTipoAccentClasses(carta.tipo),
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-gold-400">{referencia}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-white">{carta.tipo}</h3>
            <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-[11px] text-neutral-200">
              {CARTA_STATUS_LABELS[carta.status]}
            </span>
          </div>
        </div>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(carta.id)}
          className="mt-1 h-4 w-4 accent-[#d4a94e]"
          aria-label={`Selecionar carta ${referencia}`}
        />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="col-span-2 rounded-md border border-neutral-800 bg-neutral-950/70 p-3">
          <dt className="text-neutral-400">Credito</dt>
          <dd className="mt-1 text-lg font-bold text-white">
            {formatCurrencyBRL(carta.valorCredito)}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-400">Entrada</dt>
          <dd className="font-semibold text-neutral-100">{formatCurrencyBRL(carta.entrada)}</dd>
        </div>
        <div>
          <dt className="text-neutral-400">Parcela</dt>
          <dd className="font-bold text-gold-300">{formatCurrencyBRL(carta.parcela)}</dd>
        </div>
        <div>
          <dt className="text-neutral-400">Prazo</dt>
          <dd className="font-semibold text-neutral-100">{carta.prazo} meses</dd>
        </div>
        <div>
          <dt className="text-neutral-400">Transferencia</dt>
          <dd className="font-semibold text-neutral-100">
            {formatCurrencyBRL(carta.transferencia)}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-neutral-400">Saldo devedor</dt>
          <dd className="font-semibold text-neutral-100">
            {formatCurrencyBRL(carta.saldoDevedor)}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-neutral-400">Fluxo</dt>
          <dd className="font-semibold text-neutral-100">{formatParcelasFlow(carta.parcelas)}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-neutral-400">Administradora: {carta.administradora}</p>
      {carta.descricao ? <p className="mt-2 text-xs text-neutral-300">{carta.descricao}</p> : null}
    </article>
  );
}
