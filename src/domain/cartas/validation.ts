import { CARTA_STATUS, CARTA_TIPOS } from "@/domain/cartas/types";
import type {
  CreateCartaInput,
  ParcelaBloco,
  UpdateCartaInput,
} from "@/domain/cartas/types";

function assertPositive(value: number, field: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${field} inv\u00E1lido`);
  }
}

function validateParcelas(parcelas: ParcelaBloco[]): void {
  if (!Array.isArray(parcelas) || parcelas.length === 0) {
    throw new Error("parcelas inv\u00E1lidas");
  }

  parcelas.forEach((bloco, index) => {
    if (!Number.isInteger(bloco.prazo) || bloco.prazo <= 0) {
      throw new Error(`parcelas[${index}].prazo inv\u00E1lido`);
    }

    assertPositive(bloco.valor, `parcelas[${index}].valor`);
  });
}

export function validateCreateCarta(input: CreateCartaInput): void {
  if (!CARTA_TIPOS.includes(input.tipo)) throw new Error("tipo inv\u00E1lido");
  if (!CARTA_STATUS.includes(input.status)) throw new Error("status inv\u00E1lido");
  if (!input.administradora.trim()) throw new Error("administradora obrigat\u00F3ria");
  assertPositive(input.valorCredito, "valorCredito");
  assertPositive(input.entrada, "entrada");
  validateParcelas(input.parcelas);
  assertPositive(input.parcela, "parcela");
  assertPositive(input.prazo, "prazo");
  assertPositive(input.saldoDevedor, "saldoDevedor");
  assertPositive(input.transferencia, "transferencia");
}

export function validateUpdateCarta(input: UpdateCartaInput): void {
  if (input.tipo && !CARTA_TIPOS.includes(input.tipo)) throw new Error("tipo inv\u00E1lido");
  if (input.status && !CARTA_STATUS.includes(input.status))
    throw new Error("status inv\u00E1lido");
  if (input.valorCredito !== undefined) assertPositive(input.valorCredito, "valorCredito");
  if (input.entrada !== undefined) assertPositive(input.entrada, "entrada");
  if (input.parcelas !== undefined) validateParcelas(input.parcelas);
  if (input.parcela !== undefined) assertPositive(input.parcela, "parcela");
  if (input.prazo !== undefined) assertPositive(input.prazo, "prazo");
  if (input.saldoDevedor !== undefined) assertPositive(input.saldoDevedor, "saldoDevedor");
  if (input.transferencia !== undefined) assertPositive(input.transferencia, "transferencia");
}
