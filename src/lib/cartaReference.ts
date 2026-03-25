export function toCartaReference(id: string, codigo?: string | null): string {
  if (codigo?.trim()) return codigo.trim();
  return `CTA-${id.slice(0, 8).toUpperCase()}`;
}
