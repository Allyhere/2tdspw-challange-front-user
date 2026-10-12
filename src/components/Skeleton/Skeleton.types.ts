import type { ReactNode } from "react";

export type BoneProps = {
  className: string;
};

export type CenteredLinesProps = {
  titleClass: string;
  detailClass: string;
};

export type LoadingStatusProps = {
  label: string;
  children: ReactNode;
};
