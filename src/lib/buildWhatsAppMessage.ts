import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import type { Carta, ResumoSelecao } from "@/types/cartas";

export function buildWhatsAppMessage(
  cartas: Carta[],
  resumo: ResumoSelecao,
): string {
  const linhasCartas = cartas
    .map((carta) => {
      return `- ${carta.id} | ${carta.tipo} | ${formatCurrencyBRL(carta.valorCredito)}`;
    })
    .join("\n");

  return [
    "Olá, MEC Consórcio!",
    "Tenho interesse nas cartas contempladas abaixo:",
    linhasCartas,
    "",
    `Total de crédito: ${formatCurrencyBRL(resumo.totalCredito)}`,
    `Total de entrada: ${formatCurrencyBRL(resumo.totalEntrada)}`,
    `Total de parcelas: ${formatCurrencyBRL(resumo.totalParcelas)}`,
    `Maior prazo: ${resumo.maiorPrazo} meses`,
  ].join("\n");
}
