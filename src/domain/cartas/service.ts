import type { SupabaseClient } from "@supabase/supabase-js";

import { fromCartaToDb, fromDbToCarta } from "@/domain/cartas/mapper";
import type {
  Carta,
  CartaDbRow,
  CreateCartaInput,
  UpdateCartaInput,
} from "@/domain/cartas/types";
import { validateCreateCarta, validateUpdateCarta } from "@/domain/cartas/validation";
import {
  calculateSaldoDevedor,
  deriveLegacyParcelFields,
  normalizeParcelas,
} from "@/lib/cartas";

function getBaseQuery(client: SupabaseClient) {
  return client.from("cartas").select("*");
}

function enrichCreateInput(input: CreateCartaInput): CreateCartaInput {
  const parcelas = normalizeParcelas(input.parcelas, input.prazo, input.parcela);
  const legacy = deriveLegacyParcelFields(parcelas);

  return {
    ...input,
    parcelas,
    parcela: legacy.parcela,
    prazo: legacy.prazo,
    saldoDevedor: calculateSaldoDevedor(parcelas),
  };
}

function enrichUpdateInput(input: UpdateCartaInput): UpdateCartaInput {
  if (input.parcelas === undefined) return input;

  const parcelas = normalizeParcelas(input.parcelas, input.prazo ?? 0, input.parcela ?? 0);
  const legacy = deriveLegacyParcelFields(parcelas);

  return {
    ...input,
    parcelas,
    parcela: legacy.parcela,
    prazo: legacy.prazo,
    saldoDevedor: calculateSaldoDevedor(parcelas),
  };
}

export const cartasService = {
  async listPublic(client: SupabaseClient): Promise<Carta[]> {
    const { data, error } = await getBaseQuery(client)
      .eq("status", "ATIVA")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as CartaDbRow[]).map(fromDbToCarta);
  },

  async listAdmin(client: SupabaseClient): Promise<Carta[]> {
    const { data, error } = await getBaseQuery(client).order("created_at", {
      ascending: false,
    });

    if (error) throw error;
    return (data as CartaDbRow[]).map(fromDbToCarta);
  },

  async create(
    client: SupabaseClient,
    ownerId: string,
    input: CreateCartaInput,
  ): Promise<Carta> {
    const enriched = enrichCreateInput(input);
    validateCreateCarta(enriched);
    const payload = fromCartaToDb({ ...enriched, ownerId });
    const { data, error } = await client
      .from("cartas")
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;
    return fromDbToCarta(data as CartaDbRow);
  },

  async update(
    client: SupabaseClient,
    id: string,
    input: UpdateCartaInput,
  ): Promise<Carta | null> {
    const enriched = enrichUpdateInput(input);
    validateUpdateCarta(enriched);
    const payload = fromCartaToDb(enriched);
    const { data, error } = await client
      .from("cartas")
      .update(payload)
      .eq("id", id)
      .select("*")
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    return fromDbToCarta(data as CartaDbRow);
  },

  async remove(client: SupabaseClient, id: string): Promise<boolean> {
    const { error, count } = await client
      .from("cartas")
      .delete({ count: "exact" })
      .eq("id", id);

    if (error) throw error;
    return Boolean(count && count > 0);
  },
};
