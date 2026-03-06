import type { Carta } from "@/types/cartas";

export function validateSameAdministradora(cartas: Carta[]): {
  ok: boolean;
  message?: string;
} {
  if (cartas.length <= 1) return { ok: true };

  const base = cartas[0].administradora;
  const same = cartas.every((carta) => carta.administradora === base);

  if (same) return { ok: true };

  return {
    ok: false,
    message: "Não é possível juntar cartas de administradoras diferentes.",
  };
}
