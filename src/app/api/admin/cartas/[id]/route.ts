import type { NextRequest } from "next/server";

import { fail } from "@/lib/http/responses";

function supabaseCheckpointPending() {
  return fail(
    "Checkpoint Supabase pendente. Configure Auth + RLS para habilitar rotas admin.",
    503,
  );
}

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  await request;
  await params;
  return supabaseCheckpointPending();
}

export async function DELETE(_: NextRequest, { params }: RouteParams) {
  await params;
  return supabaseCheckpointPending();
}
