import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// QueryClientProvider such as provider of routing or redux stae management should be at the top level
// to ensure that all components have access to the query client context.
// QueryClient is responsible for managing the cache and state of your queries.

import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./layouts/Main";
import Home from "./pages/Home";
// import Create from "./pages/Create";
import Info from "./pages/Info";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "/create",
      //   element: <Create />,
      // },
      {
        path: "/info",
        element: <Info />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools />
  </QueryClientProvider>
);
