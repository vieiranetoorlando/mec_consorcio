import type { ParcelaBloco } from "@/domain/cartas/types";

function toNumber(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

export function normalizeParcelas(
  value: unknown,
  fallbackPrazo = 0,
  fallbackParcela = 0,
): ParcelaBloco[] {
  let source: unknown = [];

  if (Array.isArray(value)) {
    source = value;
  } else if (typeof value === "string" && value.trim()) {
    try {
      source = JSON.parse(value);
    } catch {
      source = [];
    }
  }

  if (Array.isArray(source)) {
    const parcelas = source
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const prazo = toNumber((item as { prazo?: unknown }).prazo);
        const valor = toNumber((item as { valor?: unknown }).valor);
        if (!Number.isInteger(prazo) || prazo <= 0 || valor < 0) return null;
        return { prazo, valor };
      })
      .filter((item): item is ParcelaBloco => item !== null);

    if (parcelas.length > 0) return parcelas;
  }

  if (fallbackPrazo > 0) {
    return [{ prazo: fallbackPrazo, valor: fallbackParcela }];
  }

  return [];
}

export function deriveLegacyParcelFields(parcelas: ParcelaBloco[]): {
  parcela: number;
  prazo: number;
} {
  return parcelas.reduce(
    (acc, bloco) => ({
      parcela: acc.parcela + bloco.valor,
      prazo: Math.max(acc.prazo, bloco.prazo),
    }),
    { parcela: 0, prazo: 0 },
  );
}

export function calculateSaldoDevedor(parcelas: ParcelaBloco[]): number {
  return parcelas.reduce((sum, bloco) => sum + bloco.prazo * bloco.valor, 0);
}

export function formatParcelasFlow(parcelas: ParcelaBloco[]): string {
  return parcelas
    .map((bloco) => `${bloco.prazo}x ${bloco.valor.toLocaleString("pt-BR")}`)
    .join(" | ");
}
