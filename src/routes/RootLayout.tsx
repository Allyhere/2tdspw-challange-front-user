import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthProvider/AuthProvider";
import { Iridescence } from "@/components/Iridescence";
import { AriaRouter } from "@/routes/AriaRouter/AriaRouter";

export function RootLayout() {
  const { pathname } = useLocation();

  return (
    <AriaRouter>
      <AuthProvider>
        <div className="relative isolate min-h-screen">
          {pathname === "/" ? null : <PageBackdrop />}
          <Outlet />
        </div>
      </AuthProvider>
    </AriaRouter>
  );
}

function PageBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Iridescence color="#8b3fbf" />
    </div>
  );
}
