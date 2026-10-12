import { ChatPushRefresh } from "@/lib/pwa/ChatPushRefresh";
import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthProvider/AuthProvider";
import pageWash from "@/assets/page-wash.png";
import { AriaRouter } from "@/routes/AriaRouter/AriaRouter";

export function RootLayout() {
  const { pathname } = useLocation();

  return (
    <AriaRouter>
      <AuthProvider>
        <ChatPushRefresh />
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
    <div className="pointer-events-none fixed inset-0 -z-10 bg-primary-light" aria-hidden="true">
      <img
        src={pageWash}
        alt=""
        width={460}
        height={460}
        className="size-full max-w-none object-cover opacity-40"
      />
    </div>
  );
}
