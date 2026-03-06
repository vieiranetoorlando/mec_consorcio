import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import type { Carta, ResumoSelecao } from "@/types/cartas";

export function buildWhatsAppMessage(cartas: Carta[], resumo: ResumoSelecao): string {
  const ids = resumo.ids.join(", ");
  const composicao = resumo.parcelasComposicao
    .map((bloco) => `${bloco.meses}x ${formatCurrencyBRL(bloco.valor)}`)
    .join(" | ");

  return [
    "Olá, MEC Consórcio!",
    "Tenho interesse na seleção de cartas contempladas:",
    `Administradora: ${resumo.administradora ?? "-"}`,
    `Cartas: ${ids}`,
    "",
    `Crédito total: ${formatCurrencyBRL(resumo.totalCredito)}`,
    `Entrada total: ${formatCurrencyBRL(resumo.totalEntrada)}`,
    `Transferência total: ${formatCurrencyBRL(resumo.totalTransferencia)}`,
    `Composição das parcelas: ${composicao}`,
  ].join("\n");
}
