import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloatButton } from "@/components/layout/WhatsAppFloatButton";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mecconsorcio.com.br"),
  title: {
    default: "MEC Consórcio | Consórcios e Cartas Contempladas",
    template: "%s | MEC Consórcio",
  },
  description:
    "MEC Consórcio: especialista em consórcios e cartas contempladas para imóvel, automóvel, caminhões, maquinários e capital de giro.",
  icons: {
    icon: "/images/mec-logo.png",
    shortcut: "/images/mec-logo.png",
    apple: "/images/mec-logo.png",
  },
  openGraph: {
    title: "MEC Consórcio",
    description:
      "Consultoria especializada em cartas contempladas e consórcios com atendimento estratégico.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} min-h-screen bg-neutral-950 font-sans text-neutral-100 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
