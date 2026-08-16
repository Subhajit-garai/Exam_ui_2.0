import type { RouteObject } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";
import { SplitOutlet } from "@repo/design-system/outlets/index";
import type { SIDEBAR_ITEMS_types } from "@repo/design-system/navbars/Sidebar";
import { NotebookPen, Tv, LayoutDashboard } from "lucide-react";

import ResourceDashboard from "./dashboard";
import NoteSubjectList from "./note/NoteSubjectList";
import NoteTopicList from "./note/NoteTopicList";
import { NotePage } from "./note/NotePage";
import VideoList from "./video/VideoList";

let RESOURCE_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 0,
    href: "/resource/dashboard",
    Icon: LayoutDashboard,
    name: "Dashboard",
    color: "var(--color-blue)",
  },
  {
    id: 1,
    href: "/resource/notes",
    Icon: NotebookPen,
    name: "Notes",
    color: "var(--color-indigo)",
  },
  {
    id: 2,
    href: "/resource/videos",
    Icon: Tv,
    name: "Videos",
    color: "var(--color-red)",
  },
];

export const resourceRoutes: RouteObject = {
  path: "*",
  element: <SplitOutlet SIDEBAR_ITEMS={RESOURCE_SIDEBAR_ITEMS} />,
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: "dashboard", element: <ResourceDashboard /> },
    { path: "notes", element: <NoteSubjectList /> },
    { path: "notes/:subject", element: <NoteTopicList /> },
    { path: "notes/:subject/:topic", element: <NotePage /> },
    { path: "videos", element: <VideoList /> },
  ],
};

export const ResourceRoutes = () => {
  return useRoutes([resourceRoutes]);
};

export default ResourceRoutes;
