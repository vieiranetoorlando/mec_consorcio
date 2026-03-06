import { cartasService } from "@/domain/cartas/service";
import { fail, ok } from "@/lib/http/responses";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient();
    const cartas = await cartasService.listPublic(supabase);
    return ok({ data: cartas });
  } catch {
    return fail("Nao foi possivel carregar as cartas.", 500);
  }
}
