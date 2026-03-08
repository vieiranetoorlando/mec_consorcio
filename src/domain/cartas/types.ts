export const CARTA_TIPOS = [
  "Imóvel",
  "Automóvel",
  "Caminhões",
  "Maquinários",
  "Capital de giro",
] as const;

export const CARTA_STATUS = ["ATIVA", "VENDIDA", "PAUSADA"] as const;

export type CartaTipo = (typeof CARTA_TIPOS)[number];
export type CartaStatus = (typeof CARTA_STATUS)[number];

export type ParcelaBloco = {
  prazo: number;
  valor: number;
};

export type Carta = {
  id: string;
  tipo: CartaTipo;
  valorCredito: number;
  entrada: number;
  parcelas: ParcelaBloco[];
  parcela: number;
  prazo: number;
  saldoDevedor: number;
  transferencia: number;
  administradora: string;
  logoAdministradora?: string;
  descricao?: string;
  status: CartaStatus;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
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
  totalTransferencia: number;
  totalSaldoDevedor: number;
  totalParcelas: number;
  maiorPrazo: number;
  administradora?: string;
  parcelasComposicao: { meses: number; valor: number }[];
};

export type CartaDbRow = {
  id: string;
  tipo: string;
  valor_credito: number | string;
  entrada: number | string;
  parcelas_json?: unknown;
  parcela: number | string;
  prazo: number;
  saldo_devedor?: number | string | null;
  transferencia?: number | string | null;
  administradora: string;
  logo_administradora?: string | null;
  descricao: string | null;
  status: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
};

export type CreateCartaInput = Omit<Carta, "id" | "createdAt" | "updatedAt">;

export type UpdateCartaInput = Partial<CreateCartaInput>;
