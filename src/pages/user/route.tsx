import type { RouteObject } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";
import { SplitOutlet } from "@repo/design-system/outlets/index";
import type { SIDEBAR_ITEMS_types } from "@repo/design-system/navbars/Sidebar";
import { BarChart2, HandCoins, ChartLine, ShieldCheck } from "lucide-react";

import Profile from "./profile/Profile";
import { Balance } from "./Balance";
import { SecurityUserPage } from "./SecurityUserPage";
import ValidationUserPage from "./ValidationUserPage";

const USER_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    name: "Profile",
    Icon: BarChart2,
    color: "var(--color-indigo)",
    href: "/user/profile",
  },
  {
    id: 2,
    name: "Balance",
    Icon: HandCoins,
    color: "var(--color-green)",
    href: "/user/balance",
  },
  {
    id: 3,
    name: "Activity History",
    Icon: ChartLine,
    color: "var(--color-yellow)",
    href: "/user/activityhistory",
  },
  {
    id: 4,
    name: "Validate",
    Icon: ShieldCheck,
    color: "var(--color-pink)",
    href: "/user/validation",
  },
];

export const userRoutes: RouteObject = {
  path: "*",
  element: <SplitOutlet SIDEBAR_ITEMS={USER_SIDEBAR_ITEMS} />,
  children: [
    { index: true, element: <Navigate to="balance" replace /> },
    { path: "balance", element: <Balance /> },
    { path: "profile", element: <Profile /> },
    { path: "validation", element: <ValidationUserPage /> },
    { path: "security", element: <SecurityUserPage /> },
  ],
};

export const UserRoutes = () => {
  return useRoutes([userRoutes]);
};

export default UserRoutes;
