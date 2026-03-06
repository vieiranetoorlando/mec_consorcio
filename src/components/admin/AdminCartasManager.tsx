"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { Carta, CartaStatus, CartaTipo } from "@/domain/cartas/types";
import { CARTA_STATUS, CARTA_TIPOS } from "@/domain/cartas/types";
import { formatCurrencyBRL } from "@/lib/formatCurrencyBRL";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type CartaForm = {
  tipo: CartaTipo;
  valorCredito: number;
  entrada: number;
  parcela: number;
  transferencia: number;
  prazo: number;
  administradora: string;
  descricao: string;
  status: CartaStatus;
};

const initialForm: CartaForm = {
  tipo: "Imóvel",
  valorCredito: 0,
  entrada: 0,
  parcela: 0,
  transferencia: 0,
  prazo: 1,
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

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function fillForEdit(item: Carta) {
    setEditingId(item.id);
    setForm({
      tipo: item.tipo,
      valorCredito: item.valorCredito,
      entrada: item.entrada,
      parcela: item.parcela,
      transferencia: item.transferencia,
      prazo: item.prazo,
      administradora: item.administradora,
      descricao: item.descricao ?? "",
      status: item.status,
    });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      descricao: form.descricao.trim() ? form.descricao : undefined,
    };

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

          <NumberField
            label="Valor de crédito"
            value={form.valorCredito}
            onChange={(value) => setForm((prev) => ({ ...prev, valorCredito: value }))}
          />
          <NumberField
            label="Entrada"
            value={form.entrada}
            onChange={(value) => setForm((prev) => ({ ...prev, entrada: value }))}
          />
          <NumberField
            label="Parcela"
            value={form.parcela}
            onChange={(value) => setForm((prev) => ({ ...prev, parcela: value }))}
          />
          <NumberField
            label="Transferencia"
            value={form.transferencia}
            onChange={(value) => setForm((prev) => ({ ...prev, transferencia: value }))}
          />
          <NumberField
            label="Prazo (meses)"
            value={form.prazo}
            onChange={(value) => setForm((prev) => ({ ...prev, prazo: Math.max(1, value) }))}
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
              <th className="px-4 py-3">Parcela</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-neutral-300" colSpan={6}>
                  Carregando...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-neutral-300" colSpan={6}>
                  Nenhuma carta cadastrada.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-neutral-800 text-neutral-100">
                  <td className="px-4 py-3 text-xs text-gold-300">{item.id.slice(0, 8)}</td>
                  <td className="px-4 py-3">{item.tipo}</td>
                  <td className="px-4 py-3">{formatCurrencyBRL(item.valorCredito)}</td>
                  <td className="px-4 py-3">{formatCurrencyBRL(item.parcela)}</td>
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

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

function NumberField({ label, value, onChange }: NumberFieldProps) {
  return (
    <label className="space-y-1 text-xs text-neutral-300">
      <span>{label}</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white"
      />
    </label>
  );
}
