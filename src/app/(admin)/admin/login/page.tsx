import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Acesso administrativo da MEC Consórcio.",
};

export default function AdminLoginPage() {
  return (
    <section className="py-14 sm:py-16">
      <Container className="max-w-md">
        <div className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-6">
          <h1 className="text-xl font-bold text-white">Área Admin</h1>
          <p className="text-sm text-neutral-300">
            Esta página será conectada ao Supabase Auth no próximo checkpoint.
          </p>
          <p className="text-xs text-neutral-400">
            Usuário esperado: Menderson (acesso exclusivo).
          </p>
        </div>
      </Container>
    </section>
  );
}
