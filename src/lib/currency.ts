export function parseCurrencyInput(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;

  const negative = trimmed.includes("-");
  const cleaned = trimmed.replace(/[^\d,]/g, "");
  const [integerPart = "0", decimalPart = ""] = cleaned.split(",");
  const normalizedInteger = integerPart.replace(/\D/g, "") || "0";
  const normalizedDecimal = decimalPart.replace(/\D/g, "").slice(0, 2);
  const numeric = Number(
    normalizedDecimal
      ? `${normalizedInteger}.${normalizedDecimal}`
      : normalizedInteger,
  );

  return negative ? numeric * -1 : numeric;
}

export function formatCurrencyInput(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "";

  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
