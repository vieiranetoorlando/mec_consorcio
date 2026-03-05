import type { Carta, ResumoSelecao } from "@/types/cartas";

export function computeSelectionSummary(cartas: Carta[]): ResumoSelecao {
  return cartas.reduce<ResumoSelecao>(
    (acc, carta) => ({
      quantidade: acc.quantidade + 1,
      ids: [...acc.ids, carta.id],
      totalCredito: acc.totalCredito + carta.valorCredito,
      totalEntrada: acc.totalEntrada + carta.entrada,
      totalParcelas: acc.totalParcelas + carta.parcela,
      maiorPrazo: Math.max(acc.maiorPrazo, carta.prazo),
    }),
    {
      quantidade: 0,
      ids: [],
      totalCredito: 0,
      totalEntrada: 0,
      totalParcelas: 0,
      maiorPrazo: 0,
    },
  );
}
