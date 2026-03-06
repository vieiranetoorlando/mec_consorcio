import type { NextRequest } from "next/server";

import { cartasService } from "@/domain/cartas/service";
import type { UpdateCartaInput } from "@/domain/cartas/types";
import { AppError } from "@/lib/http/errors";
import { fail, ok } from "@/lib/http/responses";
import { requireAdminUser } from "@/lib/supabase/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdminUser();
    const { id } = await params;
    const payload = (await request.json()) as UpdateCartaInput;
    const supabase = await getSupabaseServerClient();
    const updated = await cartasService.update(supabase, id, payload);
    if (!updated) return fail("Carta nao encontrada.", 404);
    return ok({ data: updated });
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.statusCode);
    if (error instanceof Error) return fail(error.message, 400);
    return fail("Nao foi possivel atualizar carta.", 500);
  }
}

export async function DELETE(_: NextRequest, { params }: RouteParams) {
  try {
    await requireAdminUser();
    const { id } = await params;
    const supabase = await getSupabaseServerClient();
    const removed = await cartasService.remove(supabase, id);
    if (!removed) return fail("Carta nao encontrada.", 404);
    return ok({ success: true });
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.statusCode);
    return fail("Nao foi possivel excluir carta.", 500);
  }
}
