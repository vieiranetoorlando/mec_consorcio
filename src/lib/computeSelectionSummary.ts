import type { Carta, ResumoSelecao } from "@/types/cartas";
import { computeParcelComposition } from "@/lib/computeParcelComposition";

export function computeSelectionSummary(cartas: Carta[]): ResumoSelecao {
  const parcelasComposicao = computeParcelComposition(cartas);

  return cartas.reduce<ResumoSelecao>(
    (acc, carta) => ({
      quantidade: acc.quantidade + 1,
      ids: [...acc.ids, carta.id],
      totalCredito: acc.totalCredito + carta.valorCredito,
      totalEntrada: acc.totalEntrada + carta.entrada,
      totalTransferencia: acc.totalTransferencia + carta.transferencia,
      totalSaldoDevedor: acc.totalSaldoDevedor + carta.saldoDevedor,
      totalParcelas: acc.totalParcelas + carta.parcela,
      maiorPrazo: Math.max(acc.maiorPrazo, carta.prazo),
      administradora: acc.administradora ?? carta.administradora,
      parcelasComposicao,
    }),
    {
      quantidade: 0,
      ids: [],
      totalCredito: 0,
      totalEntrada: 0,
      totalTransferencia: 0,
      totalSaldoDevedor: 0,
      totalParcelas: 0,
      maiorPrazo: 0,
      administradora: undefined,
      parcelasComposicao,
    },
  );
}
