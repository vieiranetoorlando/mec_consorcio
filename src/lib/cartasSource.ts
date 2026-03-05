import { cartasService } from "@/domain/cartas/service";
import type { Carta } from "@/domain/cartas/types";

// Ponte de leitura para área pública (troca para Supabase ocorrerá após checkpoint).
export async function getCartasContempladas(): Promise<Carta[]> {
  return cartasService.listPublic();
}
