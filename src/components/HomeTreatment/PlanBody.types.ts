import type { UseQueryResult } from "@tanstack/react-query";
import type { TreatmentPlanData } from "@/data/treatment/treatment.types";

export type PlanBodyProps = {
  planQuery: UseQueryResult<TreatmentPlanData>;
};
