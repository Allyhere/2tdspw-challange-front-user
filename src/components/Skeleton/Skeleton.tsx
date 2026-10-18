import type { LoadingStatusProps } from "@/components/Skeleton/Skeleton.types";

export function ProfileSkeleton() {
  return (
    <LoadingStatus label="Carregando seus dados…">
      <ProfileBone />
      <FeatureBone />
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

function ProfileBone() {
  return (
    <div aria-hidden="true" className="flex items-center gap-lg">
      <span className="block size-avatar shrink-0 animate-pulse rounded-full bg-image-placeholder motion-reduce:animate-none" />
      <div className="flex min-w-0 flex-1 flex-col gap-xs">
        <span className="block h-xl w-2/5 animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none" />
        <span className="block h-lg w-3/5 animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none" />
      </div>
    </div>
  );
}

function FeatureBone() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-xl rounded-md bg-surface-base p-lg shadow-floating md:p-xl"
    >
      <span className="block h-touch animate-pulse rounded-panel bg-image-placeholder motion-reduce:animate-none" />
      <div className="grid gap-xl md:grid-cols-2">
        <PlanSkeletonBody />
        <PlanSkeletonBody />
      </div>
    </div>
  );
}

function PlanSkeletonBody() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-md">
      <span className="block h-xl w-1/2 animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none" />
      <span className="block h-lg w-full animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none" />
      <span className="block h-lg w-5/6 animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none" />
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
        <span className="block h-lg w-2/3 animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none" />
        <span className="block h-lg w-1/3 animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none" />
      </div>
      <span className="block h-lg w-1/5 animate-pulse rounded-sm bg-image-placeholder motion-reduce:animate-none" />
    </div>
  );
}
