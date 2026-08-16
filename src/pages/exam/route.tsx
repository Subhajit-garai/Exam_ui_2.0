import type { RouteObject } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";
import { SplitOutlet } from "@repo/design-system/outlets/index";
import type { SIDEBAR_ITEMS_types } from "@repo/design-system/navbars/Sidebar";
import { BarChart2, ListChecks, Pencil, AlarmClockCheck, FileQuestion } from "lucide-react";

import ExamDashboard from "./ExamDashboard";
import JoinTests from "./JoinTests";
import JoinDpp from "./JoinDpp";
import { JoinMock } from "./joinMock";
import { JoinPYQ } from "./JoinPYQ";
import ExamSubmitSuccess from "./ExamSubmitSuccess";

const EXAM_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    name: "Dashboard",
    Icon: BarChart2,
    color: "var(--color-indigo)",
    href: "/exam/dashboard",
  },
  {
    id: 2,
    name: "Tests",
    Icon: ListChecks,
    color: "var(--color-indigo)",
    href: "/exam/test",
  },
  {
    id: 3,
    name: "DPP",
    Icon: Pencil,
    color: "var(--color-pink)",
    href: "/exam/dpp",
  },
  {
    id: 4,
    name: "Mock",
    Icon: AlarmClockCheck,
    color: "var(--color-green)",
    href: "/exam/mock",
  },
  {
    id: 5,
    name: "PYQ",
    Icon: FileQuestion,
    color: "var(--color-yellow)",
    href: "/exam/pyq",
  },
];

export const examRoutes: RouteObject = {
  path: "*",
  element: <SplitOutlet SIDEBAR_ITEMS={EXAM_SIDEBAR_ITEMS} />,
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: "dashboard", element: <ExamDashboard /> },
    { path: "test", element: <JoinTests /> },
    { path: "dpp", element: <JoinDpp /> },
    { path: "mock", element: <JoinMock /> },
    { path: "pyq", element: <JoinPYQ /> },
    { path: "submitsuccess", element: <ExamSubmitSuccess /> },
  ],
};

export const ExamRoutes = () => {
  return useRoutes([examRoutes]);
};

export default ExamRoutes;
