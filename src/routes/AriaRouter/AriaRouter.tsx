import { RouterProvider } from "react-aria-components";
import { useHref, useNavigate } from "react-router-dom";
import type { AriaRouterProps } from "@/routes/AriaRouter/AriaRouter.types";

export function AriaRouter({ children }: AriaRouterProps) {
  const navigate = useNavigate();

  function navigateTo(path: string) {
    navigate(path);
  }

  return (
    <RouterProvider navigate={navigateTo} useHref={useHref}>
      {children}
    </RouterProvider>
  );
}
