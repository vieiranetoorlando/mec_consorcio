import type { SupabaseClient } from "@supabase/supabase-js";

import { fromCartaToDb, fromDbToCarta } from "@/domain/cartas/mapper";
import type {
  Carta,
  CartaDbRow,
  CreateCartaInput,
  UpdateCartaInput,
} from "@/domain/cartas/types";
import { validateCreateCarta, validateUpdateCarta } from "@/domain/cartas/validation";

function getBaseQuery(client: SupabaseClient) {
  return client.from("cartas").select("*");
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
    validateCreateCarta(input);
    const payload = fromCartaToDb({ ...input, ownerId });
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
    validateUpdateCarta(input);
    const payload = fromCartaToDb(input);
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
