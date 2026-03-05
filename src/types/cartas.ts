export const CARTA_TIPOS = [
  "Imóvel",
  "Automóvel",
  "Caminhões",
  "Maquinários",
  "Capital de giro",
] as const;

export type CartaTipo = (typeof CARTA_TIPOS)[number];

export type Carta = {
  id: string;
  tipo: CartaTipo;
  valorCredito: number;
  entrada: number;
  parcela: number;
  prazo: number;
  administradora: string;
  descricao?: string;
};

export type Filtros = {
  tipos: CartaTipo[];
  valorCreditoMin?: number;
  valorCreditoMax?: number;
  parcelaMin?: number;
  parcelaMax?: number;
};

export type ResumoSelecao = {
  quantidade: number;
  ids: string[];
  totalCredito: number;
  totalEntrada: number;
  totalParcelas: number;
  maiorPrazo: number;
};
