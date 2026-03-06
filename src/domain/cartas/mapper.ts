import type { Carta, CartaDbRow, CartaStatus, CartaTipo } from "@/domain/cartas/types";

function toNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined || value === "") return 0;
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
    transferencia: toNumber(row.transferencia),
    administradora: row.administradora,
    logoAdministradora: row.logo_administradora ?? undefined,
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
    ...(carta.transferencia !== undefined ? { transferencia: carta.transferencia } : {}),
    ...(carta.administradora !== undefined ? { administradora: carta.administradora } : {}),
    ...(carta.logoAdministradora !== undefined
      ? { logo_administradora: carta.logoAdministradora }
      : {}),
    ...(carta.descricao !== undefined ? { descricao: carta.descricao } : {}),
    ...(carta.status ? { status: carta.status } : {}),
    ...(carta.ownerId ? { owner_id: carta.ownerId } : {}),
  };
}
