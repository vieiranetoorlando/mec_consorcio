import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminCartasManager } from "@/components/admin/AdminCartasManager";
import { Container } from "@/components/ui/Container";
import { getCurrentUser, requireAdminUser } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Admin Cartas",
  description: "Gestao de cartas contempladas da MEC Consorcio.",
};

export default async function AdminCartasPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  try {
    await requireAdminUser();
  } catch {
    redirect("/admin/login");
  }

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <AdminCartasManager />
      </Container>
    </section>
  );
}
