import { cartasMock } from "@/data/cartas.mock";
import type { Carta } from "@/types/cartas";

// Esta função isola a origem dos dados para permitir troca por API/Sheets no futuro.
export async function getCartasContempladas(): Promise<Carta[]> {
  return cartasMock;
}
