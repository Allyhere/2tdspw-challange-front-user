import type { ClinicMessage } from "@/data/clinicChat/clinicChat.types";

export const clinicMessages: ClinicMessage[] = [
  {
    id: "clinic-plan",
    author: "clinic",
    body: "Olá! O plano de tratamento da Luna já está disponível para consulta.",
    sentAt: "2026-04-12T14:11:00-03:00",
  },
  {
    id: "tutor-reply",
    author: "tutor",
    body: "Obrigada. Vou levar a Luna para a vacina nesta semana.",
    sentAt: "2026-04-12T14:14:00-03:00",
  },
];
