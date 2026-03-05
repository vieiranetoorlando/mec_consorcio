import type { Metadata } from "next";

import { CartasPageContent } from "@/components/cartas/CartasPageContent";
import { getCartasContempladas } from "@/lib/cartasSource";

export const metadata: Metadata = {
  title: "Cartas Contempladas",
  description:
    "Consulte cartas contempladas da MEC Consórcio, filtre por tipo, crédito e parcela e envie sua seleção no WhatsApp.",
};

export default async function CartasPage() {
  const cartas = await getCartasContempladas();

  return <CartasPageContent cartas={cartas} />;
}
