import { CARTA_TIPOS, type CartaTipo, type Filtros } from "@/types/cartas";

type CartasFiltersProps = {
  filtros: Filtros;
  onChange: (next: Filtros) => void;
};

export function CartasFilters({ filtros, onChange }: CartasFiltersProps) {
  function toggleTipo(tipo: CartaTipo) {
    const exists = filtros.tipos.includes(tipo);
    const tipos = exists
      ? filtros.tipos.filter((item) => item !== tipo)
      : [...filtros.tipos, tipo];

    onChange({ ...filtros, tipos });
  }

  function toOptionalNumber(value: string): number | undefined {
    if (!value.trim()) return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  return (
    <div className="space-y-6 rounded-xl border border-neutral-800 bg-neutral-900/50 p-5">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-white">Tipo</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CARTA_TIPOS.map((tipo) => {
            const checked = filtros.tipos.includes(tipo);
            return (
              <label
                key={tipo}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-neutral-700 px-3 py-2 text-xs text-neutral-200"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleTipo(tipo)}
                  className="accent-[#d4a94e]"
                />
                {tipo}
              </label>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-xs text-neutral-300">
          <span>Crédito mínimo</span>
          <input
            type="number"
            min={0}
            value={filtros.valorCreditoMin ?? ""}
            onChange={(event) =>
              onChange({
                ...filtros,
                valorCreditoMin: toOptionalNumber(event.target.value),
              })
            }
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
            placeholder="Ex: 100000"
          />
        </label>

        <label className="space-y-2 text-xs text-neutral-300">
          <span>Crédito máximo</span>
          <input
            type="number"
            min={0}
            value={filtros.valorCreditoMax ?? ""}
            onChange={(event) =>
              onChange({
                ...filtros,
                valorCreditoMax: toOptionalNumber(event.target.value),
              })
            }
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
            placeholder="Ex: 500000"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-xs text-neutral-300">
          <span>Parcela mínima</span>
          <input
            type="number"
            min={0}
            value={filtros.parcelaMin ?? ""}
            onChange={(event) =>
              onChange({ ...filtros, parcelaMin: toOptionalNumber(event.target.value) })
            }
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
            placeholder="Ex: 900"
          />
        </label>

        <label className="space-y-2 text-xs text-neutral-300">
          <span>Parcela máxima</span>
          <input
            type="number"
            min={0}
            value={filtros.parcelaMax ?? ""}
            onChange={(event) =>
              onChange({ ...filtros, parcelaMax: toOptionalNumber(event.target.value) })
            }
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-gold-500"
            placeholder="Ex: 3000"
          />
        </label>
      </div>
    </div>
  );
}
