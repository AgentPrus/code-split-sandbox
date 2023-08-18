import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./layouts/Root";
import { lazyWithRetries } from "./utils/router";

const About = lazyWithRetries(() => import("./pages/About"));
const Dashboard = lazyWithRetries(() => import("./pages/Dashboard"));
const Contact = lazyWithRetries(() => import("./pages/Contact"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Root />
      </Suspense>
    ),
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
