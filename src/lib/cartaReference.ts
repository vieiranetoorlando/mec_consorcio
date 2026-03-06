export function toCartaReference(id: string): string {
  return `CTA-${id.slice(0, 8).toUpperCase()}`;
}
