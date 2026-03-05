import { fail } from "@/lib/http/responses";

function supabaseCheckpointPending() {
  return fail(
    "Checkpoint Supabase pendente. Configure Auth + RLS para habilitar rotas admin.",
    503,
  );
}

export async function GET() {
  return supabaseCheckpointPending();
}

export async function POST() {
  return supabaseCheckpointPending();
}
