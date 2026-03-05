import { cartasService } from "@/domain/cartas/service";
import { fail, ok } from "@/lib/http/responses";

export async function GET() {
  try {
    const cartas = await cartasService.listPublic();
    return ok({ data: cartas });
  } catch {
    return fail("Não foi possível carregar as cartas.", 500);
  }
}
