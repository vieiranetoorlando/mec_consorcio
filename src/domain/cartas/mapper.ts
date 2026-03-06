import type { Carta, CartaDbRow, CartaStatus, CartaTipo } from "@/domain/cartas/types";

function toNumber(value: number | string): number {
  return typeof value === "number" ? value : Number(value);
}

export function fromDbToCarta(row: CartaDbRow): Carta {
  return {
    id: row.id,
    tipo: row.tipo as CartaTipo,
    valorCredito: toNumber(row.valor_credito),
    entrada: toNumber(row.entrada),
    parcela: toNumber(row.parcela),
    prazo: row.prazo,
    administradora: row.administradora,
    descricao: row.descricao ?? undefined,
    status: row.status as CartaStatus,
    ownerId: row.owner_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function fromCartaToDb(carta: Partial<Carta>) {
  return {
    ...(carta.tipo ? { tipo: carta.tipo } : {}),
    ...(carta.valorCredito !== undefined ? { valor_credito: carta.valorCredito } : {}),
    ...(carta.entrada !== undefined ? { entrada: carta.entrada } : {}),
    ...(carta.parcela !== undefined ? { parcela: carta.parcela } : {}),
    ...(carta.prazo !== undefined ? { prazo: carta.prazo } : {}),
    ...(carta.administradora !== undefined ? { administradora: carta.administradora } : {}),
    ...(carta.descricao !== undefined ? { descricao: carta.descricao } : {}),
    ...(carta.status ? { status: carta.status } : {}),
    ...(carta.ownerId ? { owner_id: carta.ownerId } : {}),
  };
}
