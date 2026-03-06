import type { NextRequest } from "next/server";

import { cartasService } from "@/domain/cartas/service";
import type { CreateCartaInput } from "@/domain/cartas/types";
import { AppError } from "@/lib/http/errors";
import { fail, ok } from "@/lib/http/responses";
import { requireAdminUser } from "@/lib/supabase/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    await requireAdminUser();
    const supabase = await getSupabaseServerClient();
    const cartas = await cartasService.listAdmin(supabase);
    return ok({ data: cartas });
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.statusCode);
    return fail("Nao foi possivel carregar cartas do admin.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdminUser();
    const supabase = await getSupabaseServerClient();
    const payload = (await request.json()) as CreateCartaInput;
    const created = await cartasService.create(supabase, user.id, payload);
    return ok({ data: created }, 201);
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.statusCode);
    if (error instanceof Error) return fail(error.message, 400);
    return fail("Nao foi possivel criar carta.", 500);
  }
}
