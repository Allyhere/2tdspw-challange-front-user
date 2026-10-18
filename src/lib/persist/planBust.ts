import { del, get } from "idb-keyval";

const planBustKey = "treatment-plan-bust";

export function readPlanBust(): Promise<unknown> {
  return get(planBustKey);
}

export function clearPlanBust(): Promise<void> {
  return del(planBustKey);
}
