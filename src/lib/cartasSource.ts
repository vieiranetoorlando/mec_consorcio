import { cartasService } from "@/domain/cartas/service";
import type { Carta } from "@/domain/cartas/types";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { cartasMock } from "@/data/cartas.mock";

export async function getCartasContempladas(): Promise<Carta[]> {
  try {
    const supabase = await getSupabaseServerClient();
    return await cartasService.listPublic(supabase);
  } catch {
    // Fallback defensivo para evitar quebra da página pública.
    return cartasMock
      .map((item) => ({ ...item, status: item.status ?? "ATIVA" }))
      .filter((item) => item.status === "ATIVA");
  }
}
