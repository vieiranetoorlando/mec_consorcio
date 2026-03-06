import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Container } from "@/components/ui/Container";
import { getCurrentUser, requireAdminUser } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Acesso administrativo da MEC Consorcio.",
};

export default async function AdminLoginPage() {
  const user = await getCurrentUser();
  if (user) {
    try {
      await requireAdminUser();
      redirect("/admin/cartas");
    } catch {
      // user logado sem permissão admin permanece na tela de login
    }
  }

  return (
    <section className="py-14 sm:py-16">
      <Container className="max-w-md">
        <div className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-6">
          <h1 className="text-xl font-bold text-white">Area Admin</h1>
          <p className="text-sm text-neutral-300">
            Entre com o usuario autorizado para gerenciar cartas contempladas.
          </p>
          <AdminLoginForm />
        </div>
      </Container>
    </section>
  );
}
