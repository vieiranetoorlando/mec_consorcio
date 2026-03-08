import { computeParcelComposition } from "@/lib/computeParcelComposition";
import { calculateSaldoDevedor } from "@/lib/cartas";
import { CARTA_TIPOS } from "@/types/cartas";
import type { Carta } from "@/types/cartas";

function mockCarta(id: string, prazo: number, parcela: number): Carta {
  const parcelas = [{ prazo, valor: parcela }];

  return {
    id,
    tipo: CARTA_TIPOS[0],
    valorCredito: 100000,
    entrada: 10000,
    parcelas,
    parcela,
    prazo,
    saldoDevedor: calculateSaldoDevedor(parcelas),
    transferencia: 1000,
    administradora: "Porto Seguro",
    status: "ATIVA",
  };
}

export function runParcelCompositionDebugExamples() {
  const example2 = computeParcelComposition([
    mockCarta("A", 180, 1000),
    mockCarta("B", 200, 1500),
  ]);

  const example3 = computeParcelComposition([
    mockCarta("A", 100, 1000),
    mockCarta("B", 50, 1500),
    mockCarta("C", 200, 800),
  ]);

  return {
    example2,
    expected2: [
      { meses: 180, valor: 2500 },
      { meses: 20, valor: 1500 },
    ],
    example3,
    expected3: [
      { meses: 50, valor: 3300 },
      { meses: 50, valor: 1800 },
      { meses: 150, valor: 800 },
    ],
  };
}
