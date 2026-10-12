import { createBrowserRouter, Navigate } from "react-router-dom";
import { ConversationPage } from "@/pages/ConversationPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
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
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
