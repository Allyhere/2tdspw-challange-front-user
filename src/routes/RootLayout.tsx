import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthProvider/AuthProvider";
import { vetiGrainientProps } from "@/components/Grainient/Grainient.constants";
import { Grainient } from "@/components/Grainient/Grainient";
import { AriaRouter } from "@/routes/AriaRouter/AriaRouter";

export function RootLayout() {
  return (
    <AriaRouter>
      <AuthProvider>
        <div className="relative isolate min-h-screen">
          <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
            <Grainient {...vetiGrainientProps} />
          </div>
          <Outlet />
        </div>
      </AuthProvider>
    </AriaRouter>
  );
}
