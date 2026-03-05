import { buildWhatsAppLink } from "@/lib/whatsapp";

const defaultMessage = "Ola! Quero falar com um especialista da MEC Consorcio.";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-7 w-7 fill-current"
    >
      <path d="M16.02 3.2A12.8 12.8 0 0 0 5.2 22.84L3.2 28.8l6.12-1.96A12.8 12.8 0 1 0 16.02 3.2Zm0 23.24a10.4 10.4 0 0 1-5.3-1.45l-.38-.23-3.64 1.16 1.2-3.54-.25-.4a10.4 10.4 0 1 1 8.37 4.46Zm5.7-7.79c-.31-.15-1.85-.92-2.14-1.02-.28-.1-.49-.15-.7.16-.2.3-.8 1.01-.98 1.22-.18.2-.35.23-.66.08-.31-.15-1.3-.48-2.48-1.54-.92-.82-1.54-1.84-1.72-2.15-.18-.3-.02-.47.13-.62.14-.14.31-.36.47-.54.16-.18.2-.31.31-.52.1-.2.05-.38-.03-.53-.08-.15-.7-1.68-.96-2.3-.25-.61-.5-.52-.7-.53h-.59c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.09 1.85-.76 2.11-1.5.26-.74.26-1.37.18-1.5-.08-.13-.28-.2-.59-.36Z" />
    </svg>
  );
}

export function WhatsAppFloatButton() {
  return (
    <a
      href={buildWhatsAppLink(defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed right-5 bottom-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] ring-4 ring-neutral-950/70 transition hover:scale-[1.05]"
    >
      <WhatsAppIcon />
      <span className="pointer-events-none absolute right-16 hidden rounded-md bg-neutral-900 px-2 py-1 text-xs text-neutral-100 shadow-md group-hover:block md:block">
        WhatsApp
      </span>
    </a>
  );
}
