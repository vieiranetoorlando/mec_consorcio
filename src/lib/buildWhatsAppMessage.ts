import { toCartaReference } from "@/lib/cartaReference";
import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import type { Carta, ResumoSelecao } from "@/types/cartas";

export function buildWhatsAppMessage(cartas: Carta[], resumo: ResumoSelecao): string {
  const referencias = cartas
    .map((carta) => toCartaReference(carta.id, carta.codigo))
    .join(", ");
  const composicao = resumo.parcelasComposicao
    .map((bloco) => `${bloco.meses}x ${formatCurrencyBRL(bloco.valor)}`)
    .join(" | ");

  return [
    "Ola, MEC Consorcio!",
    "Tenho interesse na selecao de cartas contempladas:",
    `Administradora: ${resumo.administradora ?? "-"}`,
    `Cartas: ${referencias}`,
    "",
    `Credito total: ${formatCurrencyBRL(resumo.totalCredito)}`,
    `Entrada total: ${formatCurrencyBRL(resumo.totalEntrada)}`,
    `Transferencia total: ${formatCurrencyBRL(resumo.totalTransferencia)}`,
    `Saldo devedor total: ${formatCurrencyBRL(resumo.totalSaldoDevedor)}`,
    `Composicao das parcelas: ${composicao}`,
  ].join("\n");
}
