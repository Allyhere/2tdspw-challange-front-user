import { createBrowserRouter, Navigate } from "react-router-dom";
import { ConfigPage } from "@/pages/ConfigPage";
import { ConversationPage } from "@/pages/ConversationPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotificationPage } from "@/pages/NotificationPage";
import { RequireAuth } from "@/routes/RequireAuth/RequireAuth";
import { RootLayout } from "@/routes/RootLayout";

export const appRouter = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LoginPage /> },
      {
        path: "/home",
        element: (
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        ),
      },
      {
        path: "/conversation/:conversationId",
        element: (
          <RequireAuth>
            <ConversationPage />
          </RequireAuth>
        ),
      },
      {
        path: "/config",
        element: (
          <RequireAuth>
            <ConfigPage />
          </RequireAuth>
        ),
      },
      {
        path: "/notification",
        element: (
          <RequireAuth>
            <NotificationPage />
          </RequireAuth>
        ),
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
