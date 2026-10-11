import type { TreatmentItem } from "@/data/treatment/treatment.types";
import { recurrenceLabels } from "@/lib/format/format.constants";
import type { PetDetails } from "@/lib/format/format.types";

export function formatBrl(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function formatSentAt(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatPlanRecurrence(item: TreatmentItem): string {
  if (item.planRecurrency !== "recurrent" || !item.planRecurrencyRate) {
    return "Dose única";
  }
  return (
    recurrenceLabels[item.planRecurrencyRate] ??
    `A cada ${item.planRecurrencyRate} meses`
  );
}

export function formatPetDetails(pet: PetDetails): string {
  const castration = pet.isCastrated ? "Castrado" : "Não castrado";
  const weight = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(pet.weightKg);
  return `${castration} · ${weight} kg · ${pet.ageYears} anos`;
}
