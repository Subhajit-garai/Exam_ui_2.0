import {
  BookCheck,
  Home,
  SidebarOpen,
  SidebarClose,
  NotebookPen,
  BadgeAlert,
  BarChart,
  Activity,
} from "lucide-react";
import { SidebarItems } from "./sidebar-items";
import { useState, useEffect, type ElementType } from "react";
import { motion } from "motion/react";

export type nav_items_types = {
  id: number;
  name: string;
  Component: ElementType;
  href: string;
  color?: string;
};

export const menuOptions: nav_items_types[] = [
  { id: 1, name: "Home", Component: Home, href: "/home", color: "text-[var(--color-blue)]" },
  { id: 2, name: "Resource", Component: NotebookPen, href: "/resource/notes", color: "text-[var(--color-purple)]" },
  { id: 3, name: "Exam", Component: BookCheck, href: "/exam/dashboard", color: "text-[var(--color-green)]" },
  { id: 6, name: "Activity", Component: Activity, href: "/activity/dashboard", color: "text-[var(--color-orange)]" },
  { id: 4, name: "Analysis", Component: BarChart, href: "/analysis/dashboard", color: "text-[var(--color-yellow)]" },
  { id: 5, name: "Issue", Component: BadgeAlert, href: "/issue/dashboard", color: "text-[var(--color-red)]" },
];

// Custom hook for media query
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

export const Appbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const isMediumToXL = useMediaQuery(
    "(min-width: 768px) and (max-width: 1535px)"
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarVariants = {
    expanded: { width: "15vw" },
    collapsed: { width: "4vw" }, // 5 vw
    // collapsed: { width: '6 %' },  // 5 vw
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        initial={false}
        animate={isMounted && (isCollapsed ? "collapsed" : "expanded")}
        variants={sidebarVariants}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className=" appbar fixed left-0 top-0  hidden h-full flex-col  border-r dark:border-white/20  bg-background lg:flex  z-[9] "
      >
        <div className="flex h-full flex-col gap-4  pr">
          <div className="flex w-full items-center border-b border-white/10 px-2 py-4">
            <div>
              <motion.button
                onClick={toggleCollapse}
                className="ml-auto flex items-center rounded-lg p-3 text-center transition-all duration-300 text-primary   hover:bg-blue-600/15 hover:text-blue-500"
              >
                {isCollapsed ? <SidebarOpen /> : <SidebarClose />}
              </motion.button>
            </div>
            <div>
              {!isCollapsed && (
                <h3 className="text-xl font-bold tracking-tighter text-primary lg:text-2xl">
                  Menu
                </h3>
              )}
            </div>
          </div>
          {/* buttons */}
          <div className="flex flex-col gap-8 p-2">
            <SidebarItems
              items={menuOptions}
              isCollapsed={isCollapsed}
              setCollapsed={setIsCollapsed}
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className=" appbarmob fixed bottom-0 left-0 right-0  md:hidden z-[9]"
      >
        <div className="flex items-center justify-around border-t border-border bg-background p-4 shadow-2xl">
          <SidebarItems items={menuOptions} isCollapsed={!isMediumToXL} />
        </div>
      </motion.nav>
    </>
  );
};
