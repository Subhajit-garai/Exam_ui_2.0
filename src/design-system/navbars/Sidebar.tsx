import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";

import { Menu } from "lucide-react";
import { useIsMobile } from "@repo/hooks/isMobile";
import { type LucideIcon } from "@repo/types/Icon";

// lefticon,righticon

export type SIDEBAR_ITEMS_types = {
  id: number;
  href: string;
  Icon: LucideIcon;
  name: string;
  color: string;
};

const Sidebar = ({
  SIDEBAR_ITEMS,
}: {
  SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[];
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  let isMobile = useIsMobile();

  return (
    <>
      <motion.div
        className={`sidebar relative  transition-all duration-500 ease-in-out shrink-0 ${
          isSidebarOpen ? "w-64 " : "w-20  "
        }`}
        animate={{
          width: isSidebarOpen
            ? isMobile
              ? "100%" // Mobile open width
              : 200 // Desktop open width
            : isMobile
            ? 16 // Mobile closed width
            : 80, // Desktop closed width
        }}
      >
        <div className=" bg-opacity-50 backdrop-blur-md  flex border-r border-b  border-gray-500 rounded-sm mb-1 md:p-4  md:flex-col  ">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={` rounded-full  hidden hover:bg-gray-700 transition-colors  text-primary max-w-fit md:p-2 md:block`}
          >
            {/* {isSidebarOpen ? <Menu size={14} /> : <Menu size={24} />}   */}{" "}
            {/* we can chage icon right to left arrow */}
            <Menu size={24} />
          </motion.button>

          <nav className="flex w-full justify-around  md:mt-8 md:block ">
            {SIDEBAR_ITEMS.map((item) => (
              <Link key={item.href} to={item.href}>
                <motion.div className="flex items-center px-2 py-4  gap-2 text-sm font-medium rounded-lg hover:bg-hover transition-colors  md:p-4  md:mb-2">
                  <item.Icon
                    size={20}
                    style={{ color: item.color, minWidth: "20px" }}
                  />

                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className=" ml-2 text-sm whitespace-nowrap flex  md:ml-4"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.4 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
