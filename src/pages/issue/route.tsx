import type { RouteObject } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";
import { SplitOutlet } from "@repo/design-system/outlets/index";
import type { SIDEBAR_ITEMS_types } from "@repo/design-system/navbars/Sidebar";
import { BarChart2 } from "lucide-react";

import { IssueDashboard } from "./IssueDashboard";

const ISSUE_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    name: "Dashboard",
    Icon: BarChart2,
    color: "var(--color-red)",
    href: "/issue/dashboard",
  },
];

export const issueRoutes: RouteObject = {
  path: "*",
  element: <SplitOutlet SIDEBAR_ITEMS={ISSUE_SIDEBAR_ITEMS} />,
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: "dashboard", element: <IssueDashboard /> },
  ],
};

export const IssueRoutes = () => {
  return useRoutes([issueRoutes]);
};

export default IssueRoutes;
