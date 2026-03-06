import { CARTA_STATUS, CARTA_TIPOS } from "@/domain/cartas/types";
import type { CreateCartaInput, UpdateCartaInput } from "@/domain/cartas/types";

function assertPositive(value: number, field: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${field} inválido`);
  }
}

export function validateCreateCarta(input: CreateCartaInput): void {
  if (!CARTA_TIPOS.includes(input.tipo)) throw new Error("tipo inválido");
  if (!CARTA_STATUS.includes(input.status)) throw new Error("status inválido");
  if (!input.administradora.trim()) throw new Error("administradora obrigatória");
  assertPositive(input.valorCredito, "valorCredito");
  assertPositive(input.entrada, "entrada");
  assertPositive(input.parcela, "parcela");
  assertPositive(input.prazo, "prazo");
  assertPositive(input.transferencia, "transferencia");
}

export function validateUpdateCarta(input: UpdateCartaInput): void {
  if (input.tipo && !CARTA_TIPOS.includes(input.tipo)) throw new Error("tipo inválido");
  if (input.status && !CARTA_STATUS.includes(input.status)) throw new Error("status inválido");
  if (input.valorCredito !== undefined) assertPositive(input.valorCredito, "valorCredito");
  if (input.entrada !== undefined) assertPositive(input.entrada, "entrada");
  if (input.parcela !== undefined) assertPositive(input.parcela, "parcela");
  if (input.prazo !== undefined) assertPositive(input.prazo, "prazo");
  if (input.transferencia !== undefined) assertPositive(input.transferencia, "transferencia");
}
