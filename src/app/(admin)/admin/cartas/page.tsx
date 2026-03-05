import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Admin Cartas",
  description: "Gestão de cartas contempladas da MEC Consórcio.",
};

export default function AdminCartasPage() {
  return (
    <section className="py-14 sm:py-16">
      <Container className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-white">Admin - Cartas</h1>
          <Link
            href="/admin/login"
            className="rounded-md border border-gold-500 px-4 py-2 text-xs font-semibold text-gold-300 transition hover:bg-gold-500/10"
          >
            Ir para login
          </Link>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6">
          <p className="text-sm text-neutral-300">
            CRUD admin será habilitado após conclusão do checkpoint Supabase (Auth + RLS).
          </p>
        </div>
      </Container>
    </section>
  );
}
