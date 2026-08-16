import type { RouteObject } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";
import { SplitOutlet, QuizLayout } from "@repo/design-system/outlets/index";
import ActivityDashboard from "./dashboard";
import QuizPage from "./QuizPage";
import QuizStartPage from "../quiz/QuizStartPage";
import type { SIDEBAR_ITEMS_types } from "@/design-system";
import { BarChart2, BrainCircuit } from "lucide-react";

let ActivityOptions: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    href: "/activity/dashboard",
    Icon: BarChart2,
    name: "Dashboard",
    color: "var(--color-indigo)",
  },
  {
    id: 2,
    href: "/activity/quiz",
    Icon: BrainCircuit,
    name: "Quiz",
    color: "var(--color-purple)",
  },
];

export const activityRoutes: RouteObject = {
  path: "*",
  element: <SplitOutlet SIDEBAR_ITEMS={ActivityOptions} />,
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: "dashboard", element: <ActivityDashboard /> },
    {
      path: "quiz",
      element: <QuizLayout />,
      children: [
        { index: true, element: <QuizPage /> },
        { path: "start", element: <QuizStartPage /> },
      ],
    },
  ],
};

export const ActivityRoutes = () => {
  return useRoutes([activityRoutes]);
};

export default ActivityRoutes;
