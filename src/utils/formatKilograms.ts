export function formatKilograms(kilograms: number): string {
  const amount = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(kilograms);
  return `${amount} kg`;
}
