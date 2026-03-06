import { cartasService } from "@/domain/cartas/service";
import type { Carta } from "@/domain/cartas/types";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function getCartasContempladas(): Promise<Carta[]> {
  const supabase = await getSupabaseServerClient();
  return cartasService.listPublic(supabase);
}
