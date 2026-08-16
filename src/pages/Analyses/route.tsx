import type { RouteObject } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";
import { SplitOutlet } from "@repo/design-system/outlets/index";
import type { SIDEBAR_ITEMS_types } from "@repo/design-system/navbars/Sidebar";
import { BarChart2, ChartLine } from "lucide-react";

import AnalysesDashboard from "./AnalysesDashboard";
import { Overview } from "./Overview";
import { AnalysesTest } from "./AnalysesTest";

let ANALYSIS_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    name: "Dashboard",
    Icon: BarChart2,
    color: "var(--color-indigo)",
    href: "/analysis/dashboard",
  },
  {
    id: 3,
    href: "/analysis/test",
    color: "var(--color-yellow)",
    Icon: ChartLine,
    name: "Test",
  },
  {
    id: 4,
    name: "Overview",
    Icon: BarChart2,
    color: "var(--color-indigo)",
    href: "/analysis/overview",
  },
];

export const analysesRoutes: RouteObject = {
  path: "*",
  element: <SplitOutlet SIDEBAR_ITEMS={ANALYSIS_SIDEBAR_ITEMS} />,
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: "dashboard", element: <AnalysesDashboard /> },
    { path: "overview", element: <Overview /> },
    { path: "test", element: <AnalysesTest /> },
  ],
};

export const AnalysesRoutes = () => {
  return useRoutes([analysesRoutes]);
};

export default AnalysesRoutes;
