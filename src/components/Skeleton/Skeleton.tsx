import type {
  CenteredLinesProps,
  LoadingStatusProps,
} from "@/components/Skeleton/Skeleton.types";

const boneClass =
  "block animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none";

export function ProfileSkeleton() {
  return (
    <LoadingStatus label="Carregando seus dados…">
      <CenteredLines titleClass="w-1/2" detailClass="w-2/3" />
      <CenteredLines titleClass="w-2/5" detailClass="w-1/2" />
      <PlanSkeletonBody />
    </LoadingStatus>
  );
}

export function PlanSkeleton() {
  return (
    <LoadingStatus label="Carregando plano de tratamento…">
      <PlanSkeletonBody />
    </LoadingStatus>
  );
}

function LoadingStatus({ label, children }: LoadingStatusProps) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="flex flex-col gap-xl">
      <p className="sr-only">{label}</p>
      {children}
    </div>
  );
}

function CenteredLines({ titleClass, detailClass }: CenteredLinesProps) {
  return (
    <div aria-hidden="true" className="flex flex-col items-center gap-xs">
      <span className={`${boneClass} h-xl ${titleClass}`} />
      <span className={`${boneClass} h-lg ${detailClass}`} />
    </div>
  );
}

function PlanSkeletonBody() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-md">
      <span className={`${boneClass} h-xl w-1/2`} />
      <span className={`${boneClass} h-lg w-full`} />
      <span className={`${boneClass} h-lg w-5/6`} />
      <div className="flex flex-col gap-sm">
        <PlanCardSkeleton />
        <PlanCardSkeleton />
        <PlanCardSkeleton />
      </div>
    </div>
  );
}

function PlanCardSkeleton() {
  return (
    <div className="flex items-center gap-md rounded-md bg-surface-subtle px-lg pt-sm pb-md shadow-card">
      <div className="flex min-w-0 flex-1 flex-col gap-xs">
        <span className={`${boneClass} h-lg w-2/3`} />
        <span className={`${boneClass} h-lg w-1/3`} />
      </div>
      <span className={`${boneClass} h-lg w-1/5`} />
    </div>
  );
}
