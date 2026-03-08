"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type {
  Carta,
  CartaStatus,
  CartaTipo,
  CreateCartaInput,
  ParcelaBloco,
} from "@/domain/cartas/types";
import { CARTA_STATUS, CARTA_TIPOS } from "@/domain/cartas/types";
import {
  calculateSaldoDevedor,
  deriveLegacyParcelFields,
  formatParcelasFlow,
} from "@/lib/cartas";
import { formatCurrencyInput, parseCurrencyInput } from "@/lib/currency";
import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type ParcelaForm = {
  id: string;
  prazo: number;
  valor: string;
};

type CartaForm = {
  tipo: CartaTipo;
  valorCredito: string;
  entrada: string;
  transferencia: string;
  parcelas: ParcelaForm[];
  administradora: string;
  descricao: string;
  status: CartaStatus;
};

function createParcelaForm(bloco?: Partial<ParcelaBloco>): ParcelaForm {
  return {
    id: crypto.randomUUID(),
    prazo: bloco?.prazo ?? 1,
    valor: bloco?.valor ? formatCurrencyInput(bloco.valor) : "",
  };
}

const initialForm: CartaForm = {
  tipo: CARTA_TIPOS[0],
  valorCredito: "",
  entrada: "",
  transferencia: "",
  parcelas: [createParcelaForm()],
  administradora: "",
  descricao: "",
  status: "ATIVA",
};

export function AdminCartasManager() {
  const router = useRouter();
  const [items, setItems] = useState<Carta[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CartaForm>(initialForm);

  async function load(options?: { resetError?: boolean }) {
    if (options?.resetError) setError(null);
    setLoading(true);

    const response = await fetch("/api/admin/cartas", { cache: "no-store" });
    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error ?? "Falha ao carregar cartas.");
      setLoading(false);
      return;
    }

    setItems(payload.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    async function bootstrap() {
      const response = await fetch("/api/admin/cartas", { cache: "no-store" });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error ?? "Falha ao carregar cartas.");
        setLoading(false);
        return;
      }

      setItems(payload.data ?? []);
      setLoading(false);
    }

    void bootstrap();
  }, []);

  const title = useMemo(
    () => (editingId ? "Editar carta" : "Nova carta"),
    [editingId],
  );

  const parcelasNormalizadas = useMemo(
    () =>
      form.parcelas.map((bloco) => ({
        prazo: Math.max(1, Math.trunc(bloco.prazo || 0)),
        valor: parseCurrencyInput(bloco.valor),
      })),
    [form.parcelas],
  );

  const resumoParcelas = useMemo(() => {
    const legacy = deriveLegacyParcelFields(parcelasNormalizadas);

    return {
      parcela: legacy.parcela,
      prazo: legacy.prazo,
      saldoDevedor: calculateSaldoDevedor(parcelasNormalizadas),
      fluxo: formatParcelasFlow(parcelasNormalizadas),
    };
  }, [parcelasNormalizadas]);

  function resetForm() {
    setForm({
      ...initialForm,
      parcelas: [createParcelaForm()],
    });
    setEditingId(null);
  }

  function fillForEdit(item: Carta) {
    setEditingId(item.id);
    setForm({
      tipo: item.tipo,
      valorCredito: formatCurrencyInput(item.valorCredito),
      entrada: formatCurrencyInput(item.entrada),
      transferencia: formatCurrencyInput(item.transferencia),
      parcelas: item.parcelas.map((bloco) => createParcelaForm(bloco)),
      administradora: item.administradora,
      descricao: item.descricao ?? "",
      status: item.status,
    });
  }

  function updateParcela(id: string, field: "prazo" | "valor", value: string | number) {
    setForm((prev) => ({
      ...prev,
      parcelas: prev.parcelas.map((bloco) =>
        bloco.id === id ? { ...bloco, [field]: value } : bloco,
      ),
    }));
  }

  function addParcela() {
    setForm((prev) => ({
      ...prev,
      parcelas: [...prev.parcelas, createParcelaForm()],
    }));
  }

  function removeParcela(id: string) {
    setForm((prev) => {
      if (prev.parcelas.length === 1) return prev;

      return {
        ...prev,
        parcelas: prev.parcelas.filter((bloco) => bloco.id !== id),
      };
    });
  }

  function buildPayload(): CreateCartaInput {
    const parcelas = form.parcelas.map((bloco) => ({
      prazo: Math.max(1, Math.trunc(bloco.prazo || 0)),
      valor: parseCurrencyInput(bloco.valor),
    }));

    const legacy = deriveLegacyParcelFields(parcelas);

    return {
      tipo: form.tipo,
      valorCredito: parseCurrencyInput(form.valorCredito),
      entrada: parseCurrencyInput(form.entrada),
      parcelas,
      parcela: legacy.parcela,
      prazo: legacy.prazo,
      saldoDevedor: calculateSaldoDevedor(parcelas),
      transferencia: parseCurrencyInput(form.transferencia),
      administradora: form.administradora.trim(),
      descricao: form.descricao.trim() ? form.descricao.trim() : undefined,
      status: form.status,
    };
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const payload = buildPayload();

    if (payload.parcelas.length === 0) {
      setSaving(false);
      setError("Adicione ao menos um bloco de parcelas.");
      return;
    }

    const response = await fetch(
      editingId ? `/api/admin/cartas/${editingId}` : "/api/admin/cartas",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setError(result.error ?? "Falha ao salvar carta.");
      return;
    }

    resetForm();
    await load({ resetError: true });
  }

  async function remove(id: string) {
    const confirmDelete = window.confirm("Excluir esta carta?");
    if (!confirmDelete) return;

    const response = await fetch(`/api/admin/cartas/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error ?? "Falha ao excluir carta.");
      return;
    }
    await load({ resetError: true });
  }

  async function logout() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-white">Admin - Cartas</h1>
        <button
          onClick={logout}
          className="rounded-md border border-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-900"
        >
          Sair
        </button>
      </div>

      <section className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
        <h2 className="mb-4 text-sm font-semibold text-gold-300">{title}</h2>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={submit}>
          <label className="space-y-1 text-xs text-neutral-300">
            <span>Tipo</span>
            <select
              value={form.tipo}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, tipo: event.target.value as CartaTipo }))
              }
              className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white"
            >
              {CARTA_TIPOS.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-xs text-neutral-300">
            <span>Status</span>
            <select
              value={form.status}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, status: event.target.value as CartaStatus }))
              }
              className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white"
            >
              {CARTA_STATUS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <MoneyField
            label={"Valor de cr\u00E9dito"}
            value={form.valorCredito}
            onChange={(value) => setForm((prev) => ({ ...prev, valorCredito: value }))}
          />
          <MoneyField
            label="Entrada"
            value={form.entrada}
            onChange={(value) => setForm((prev) => ({ ...prev, entrada: value }))}
          />
          <MoneyField
            label="Transferencia"
            value={form.transferencia}
            onChange={(value) => setForm((prev) => ({ ...prev, transferencia: value }))}
          />

          <label className="space-y-1 text-xs text-neutral-300 sm:col-span-2">
            <span>Administradora</span>
            <input
              required
              value={form.administradora}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, administradora: event.target.value }))
              }
              className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white"
            />
          </label>

          <div className="space-y-3 sm:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-neutral-200">Blocos de parcelas</span>
              <button
                type="button"
                onClick={addParcela}
                className="rounded-md border border-neutral-700 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-900"
              >
                Adicionar bloco
              </button>
            </div>

            <div className="space-y-3">
              {form.parcelas.map((bloco, index) => (
                <div
                  key={bloco.id}
                  className="grid gap-3 rounded-lg border border-neutral-800 bg-neutral-950/70 p-3 sm:grid-cols-[140px_1fr_auto]"
                >
                  <label className="space-y-1 text-xs text-neutral-300">
                    <span>Prazo</span>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={bloco.prazo}
                      onChange={(event) =>
                        updateParcela(bloco.id, "prazo", Number(event.target.value))
                      }
                      className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white"
                    />
                  </label>

                  <MoneyField
                    label={`Parcela ${index + 1}`}
                    value={bloco.valor}
                    onChange={(value) => updateParcela(bloco.id, "valor", value)}
                  />

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeParcela(bloco.id)}
                      disabled={form.parcelas.length === 1}
                      className="rounded-md border border-neutral-700 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-neutral-800 bg-neutral-950/70 p-3 text-xs text-neutral-300">
              <p>Parcela atual derivada: {formatCurrencyBRL(resumoParcelas.parcela)}</p>
              <p>Prazo total derivado: {resumoParcelas.prazo} meses</p>
              <p>Saldo devedor calculado: {formatCurrencyBRL(resumoParcelas.saldoDevedor)}</p>
              {resumoParcelas.fluxo ? <p>Fluxo: {resumoParcelas.fluxo}</p> : null}
            </div>
          </div>

          <label className="space-y-1 text-xs text-neutral-300 sm:col-span-2">
            <span>Descricao (opcional)</span>
            <textarea
              rows={2}
              value={form.descricao}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, descricao: event.target.value }))
              }
              className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white"
            />
          </label>

          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md border border-gold-500 bg-gold-500 px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-gold-400 disabled:opacity-60"
            >
              {saving ? "Salvando..." : editingId ? "Atualizar" : "Criar"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-900"
              >
                Cancelar
              </button>
            ) : null}
          </div>
        </form>
        {error ? <p className="mt-3 text-xs text-red-300">{error}</p> : null}
      </section>

      <section className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-neutral-950 text-xs uppercase tracking-wide text-neutral-400">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Credito</th>
              <th className="px-4 py-3">Fluxo</th>
              <th className="px-4 py-3">Saldo devedor</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-neutral-300" colSpan={7}>
                  Carregando...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-neutral-300" colSpan={7}>
                  Nenhuma carta cadastrada.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-neutral-800 text-neutral-100">
                  <td className="px-4 py-3 text-xs text-gold-300">{item.id.slice(0, 8)}</td>
                  <td className="px-4 py-3">{item.tipo}</td>
                  <td className="px-4 py-3">{formatCurrencyBRL(item.valorCredito)}</td>
                  <td className="px-4 py-3">{formatParcelasFlow(item.parcelas)}</td>
                  <td className="px-4 py-3">{formatCurrencyBRL(item.saldoDevedor)}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => fillForEdit(item)}
                        className="rounded-md border border-neutral-700 px-3 py-1 text-xs text-neutral-200 transition hover:bg-neutral-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => remove(item.id)}
                        className="rounded-md border border-red-400/40 px-3 py-1 text-xs text-red-300 transition hover:bg-red-500/10"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

type MoneyFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function MoneyField({ label, value, onChange }: MoneyFieldProps) {
  return (
    <label className="space-y-1 text-xs text-neutral-300">
      <span>{label}</span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => {
          if (!value.trim()) return;
          onChange(formatCurrencyInput(parseCurrencyInput(value)));
        }}
        className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white"
      />
    </label>
  );
}
