import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Layout
import Layout from "./Layouts/Layout";

// Pages
import Dashboard from "./Pages/Dashboard";
import Calendar from "./Pages/Calendar";
import Analytics from "./Pages/Analytics";
import Settings from "./Pages/Settings";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "calendar", element: <Calendar /> },
      { path: "analytics", element: <Analytics /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;