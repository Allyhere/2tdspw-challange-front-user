import type {
  TreatmentItem,
  TreatmentPlanData,
} from "@/data/treatment/treatment.types";

export type TreatmentPlanProps = {
  plan: TreatmentPlanData;
  onRemove: (item: TreatmentItem) => void;
};

export type TreatmentItemRowProps = {
  item: TreatmentItem;
  isDisabled?: boolean;
  onRemove: () => void;
};

export type RemoveItemButtonProps = {
  isDisabled: boolean;
  onRemove: () => void;
};
