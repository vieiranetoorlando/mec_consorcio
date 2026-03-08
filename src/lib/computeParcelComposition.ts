import type { Carta } from "@/types/cartas";

export type ParcelaComposicao = {
  meses: number;
  valor: number;
};

export function computeParcelComposition(cartas: Carta[]): ParcelaComposicao[] {
  const ativos = cartas
    .flatMap((carta) =>
      carta.parcelas.map((bloco) => ({
        prazoRestante: bloco.prazo,
        parcelaValor: bloco.valor,
      })),
    )
    .filter((carta) => carta.prazoRestante > 0);

  const composicao: ParcelaComposicao[] = [];

  while (ativos.length > 0) {
    const menorPrazo = Math.min(...ativos.map((carta) => carta.prazoRestante));
    const valorBloco = ativos.reduce((sum, carta) => sum + carta.parcelaValor, 0);

    composicao.push({ meses: menorPrazo, valor: valorBloco });

    for (const item of ativos) {
      item.prazoRestante -= menorPrazo;
    }

    for (let i = ativos.length - 1; i >= 0; i -= 1) {
      if (ativos[i].prazoRestante <= 0) ativos.splice(i, 1);
    }
  }

  return composicao;
}
