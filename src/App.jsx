import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Layout
import Layout from "./Layouts/Layout";

// Pages
import Dashboard from "./Pages/Dashboard";
import Calendar from "./Pages/Calendar";
import Analytics from "./Pages/Analytics";
import Settings from "./Pages/Settings";

// Create a wrapper that forces re-render
const AnalyticsWrapper = () => <Analytics key={window.location.pathname} />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "calendar", element: <Calendar /> },
      { 
        path: "analytics", 
        element: <AnalyticsWrapper /> // This forces re-render on navigation
      },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;