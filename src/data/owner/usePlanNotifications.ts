import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { saveAppointmentNotifications } from "@/data/owner/owner";
import type { TreatmentAppointment, TreatmentPlanData } from "@/data/treatment/treatment.types";
import { queryClient } from "@/lib/queryClient";
import { enableWebPush } from "@/lib/pwa/webPush";

type NoticeField = "whatsapp" | "web";

export function usePlanNotifications(uid: string | undefined, petId: string) {
  const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: (item: TreatmentAppointment) =>
      saveAppointmentNotifications(petId, [
        {
          id: item.id,
          notifyWhatsapp: item.notifyWhatsapp,
          notifyWeb: item.notifyWeb,
        },
      ]),
    onMutate: (item) => rememberPlan(uid, petId, item),
    onSuccess: (plan) => {
      queryClient.setQueryData(["treatment-plan", uid, petId], plan);
      setError("");
    },
    onError: (_error, _item, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["treatment-plan", uid, petId], context.previous);
      }
      setError("Não foi possível salvar o aviso.");
    },
  });

  return {
    error,
    pendingId: mutation.isPending ? mutation.variables?.id ?? null : null,
    toggle: (item: TreatmentAppointment, field: NoticeField, next: boolean) => {
      void toggleNotice(item, field, next, mutation.mutateAsync, setError);
    },
  };
}

async function toggleNotice(
  item: TreatmentAppointment,
  field: NoticeField,
  next: boolean,
  save: (item: TreatmentAppointment) => Promise<TreatmentPlanData>,
  setError: (message: string) => void,
): Promise<void> {
  if (field === "web" && next && !(await requestWebPush(setError))) return;
  const updated = {
    ...item,
    notifyWhatsapp: field === "whatsapp" ? next : item.notifyWhatsapp,
    notifyWeb: field === "web" ? next : item.notifyWeb,
  };
  await save(updated).catch(() => undefined);
}

async function requestWebPush(setError: (message: string) => void): Promise<boolean> {
  try {
    const allowed = await enableWebPush();
    if (!allowed) setError("O navegador bloqueou as notificações.");
    return allowed;
  } catch {
    setError("Não foi possível salvar o aviso.");
    return false;
  }
}

async function rememberPlan(uid: string | undefined, petId: string, item: TreatmentAppointment) {
  const key = ["treatment-plan", uid, petId] as const;
  await queryClient.cancelQueries({ queryKey: key });
  const previous = queryClient.getQueryData<TreatmentPlanData>(key);
  if (!previous) return { previous };
  queryClient.setQueryData<TreatmentPlanData>(key, {
    ...previous,
    items: previous.items.map((current) => (current.id === item.id ? item : current)),
  });
  return { previous };
}
