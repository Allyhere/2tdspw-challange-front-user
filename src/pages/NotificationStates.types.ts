import type { SilenceChoice } from "@/utils/silenceChoice";

export type OptionsProps = {
  choice: SilenceChoice;
  onSelect: (value: string) => void;
  className?: string;
};

export type LoadingProps = {
  className?: string;
};

export type SilencedProps = {
  until: string;
  className?: string;
};

export type ActiveProps = {
  className?: string;
};
