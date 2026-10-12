import type { TreatmentAppointment } from "@/data/treatment/treatment.types";

export type AppointmentDay = {
  id: string;
  label: string;
  items: TreatmentAppointment[];
};

export function groupAppointmentsByDay(items: TreatmentAppointment[]): AppointmentDay[] {
  const groups: AppointmentDay[] = [];
  for (const item of items) {
    const day = calendarDay(item.appointmentDate);
    const current = groups.find((group) => group.id === day.id);
    if (current) {
      current.items.push(item);
      continue;
    }
    groups.push({ id: day.id, label: day.label, items: [item] });
  }
  return groups;
}

function calendarDay(iso: string): { id: string; label: string } {
  const date = new Date(iso);
  return {
    id: new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date),
    label: new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date),
  };
}
