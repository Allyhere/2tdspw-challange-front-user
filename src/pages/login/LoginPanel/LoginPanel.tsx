import { Iridescence } from "@/components/Iridescence";

export function LoginPanel() {
  return (
    <div
      className="pointer-events-none absolute inset-0 lg:static lg:col-span-3 lg:h-full lg:min-h-0 lg:p-panel-inset"
      aria-hidden="true"
    >
      <div className="relative flex h-full flex-col overflow-hidden bg-primary-dark lg:rounded-panel">
        <div className="pointer-events-none absolute inset-0">
          <Iridescence color="#8b3fbf" />
        </div>
        <div className="relative z-10 flex h-full flex-col p-xl pb-2xl">
          <p className="mt-auto hidden max-w-card font-inter text-display text-balance text-surface-base lg:block">
            Cuidado, saúde e qualidade pra todos
          </p>
        </div>
      </div>
    </div>
  );
}
