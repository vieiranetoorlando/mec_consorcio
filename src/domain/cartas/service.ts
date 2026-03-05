import { cartasMock } from "@/data/cartas.mock";
import type {
  Carta,
  CartaStatus,
  CreateCartaInput,
  UpdateCartaInput,
} from "@/domain/cartas/types";
import { validateCreateCarta, validateUpdateCarta } from "@/domain/cartas/validation";

export type CartasRepository = {
  listAll(): Promise<Carta[]>;
  listActive(): Promise<Carta[]>;
  create(input: CreateCartaInput): Promise<Carta>;
  update(id: string, input: UpdateCartaInput): Promise<Carta | null>;
  remove(id: string): Promise<boolean>;
};

function withDefaults(carta: Omit<Carta, "status"> & { status?: CartaStatus }): Carta {
  return {
    ...carta,
    status: carta.status ?? "ATIVA",
  };
}

function buildMockRepository(): CartasRepository {
  const state: Carta[] = cartasMock.map((item) => withDefaults({ ...item }));

  return {
    async listAll() {
      return state;
    },
    async listActive() {
      return state.filter((item) => item.status === "ATIVA");
    },
    async create(input) {
      validateCreateCarta(input);
      const now = new Date().toISOString();
      const created: Carta = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      state.unshift(created);
      return created;
    },
    async update(id, input) {
      validateUpdateCarta(input);
      const index = state.findIndex((item) => item.id === id);
      if (index === -1) return null;
      state[index] = {
        ...state[index],
        ...input,
        updatedAt: new Date().toISOString(),
      };
      return state[index];
    },
    async remove(id) {
      const before = state.length;
      const next = state.filter((item) => item.id !== id);
      state.splice(0, state.length, ...next);
      return next.length !== before;
    },
  };
}

const repository = buildMockRepository();

export const cartasService = {
  listPublic: () => repository.listActive(),
  listAdmin: () => repository.listAll(),
  create: (input: CreateCartaInput) => repository.create(input),
  update: (id: string, input: UpdateCartaInput) => repository.update(id, input),
  remove: (id: string) => repository.remove(id),
};
