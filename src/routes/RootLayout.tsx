import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthProvider/AuthProvider";
import { AriaRouter } from "@/routes/AriaRouter/AriaRouter";

export function RootLayout() {
  return (
    <AriaRouter>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </AriaRouter>
  );
}
