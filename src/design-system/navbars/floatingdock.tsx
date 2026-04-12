import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";
import type { SIDEBAR_ITEMS_types } from "./Sidebar";
import type { LucideIcon } from "@/types";
import { Link } from "react-router-dom";

export const FloatingDockNav = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: SIDEBAR_ITEMS_types[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: SIDEBAR_ITEMS_types[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute right-0 bottom-full mb-2 flex flex-col gap-2 items-end w-max"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-900 px-2 py-1 rounded-md shadow-sm">
                    {item.name}
                  </span>
                  <Link
                    to={item.href}
                    key={item.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900 shadow-md"
                  >
                    <item.Icon
                      size={20}
                      style={{ color: item.color, minWidth: "20px" }}
                    />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen(!open)}
        animate={{
          scale: open ? 1 : [1, 1.15, 1],
          boxShadow: open
            ? "0px 0px 0px rgba(0,0,0,0)"
            : [
                "0px 0px 0px rgba(99, 102, 241, 0.4)",
                "0px 0px 15px rgba(99, 102, 241, 0.8)",
                "0px 0px 0px rgba(99, 102, 241, 0.4)",
              ],
        }}
        transition={{
          duration: 1.5,
          repeat: open ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full shadow-md z-50 relative",
          open 
            ? "bg-gray-50 dark:bg-neutral-800" 
            : "bg-gradient-to-tr from-indigo-500 to-purple-500 text-white"
        )}
      >
        <IconLayoutNavbarCollapse 
          className={cn(
            "h-5 w-5",
            open ? "text-neutral-500 dark:text-neutral-400" : "text-white"
          )} 
        />
      </motion.button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: SIDEBAR_ITEMS_types[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn("relative lg:flex  hidden gap-4 items-center ", className)}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              onMouseMove={(e) => mouseX.set(e.pageX)}
              onMouseLeave={() => mouseX.set(Infinity)}
              exit={{
                opacity: 0,
                x: 10,
                transition: {
                  delay: items.length * 0.05,
                },
              }}
              className={cn(
                " h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900",
                className
              )}
            >
              {items.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 10,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <IconContainer mouseX={mouseX} key={item.name} {...item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen(!open)}
          animate={{
            scale: open ? 1 : [1, 1.15, 1],
            boxShadow: open
              ? "0px 0px 0px rgba(0,0,0,0)"
              : [
                  "0px 0px 0px rgba(99, 102, 241, 0.4)",
                  "0px 0px 20px rgba(99, 102, 241, 0.8)",
                  "0px 0px 0px rgba(99, 102, 241, 0.4)",
                ],
          }}
          transition={{
            duration: 1.5,
            repeat: open ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full shadow-lg z-50 relative",
            open 
              ? "bg-gray-50 dark:bg-neutral-800" 
              : "bg-gradient-to-tr from-indigo-500 to-purple-500 text-white"
          )}
        >
          <IconLayoutNavbarCollapse 
            className={cn(
              "h-6 w-6",
              open ? "text-neutral-500 dark:text-neutral-400" : "text-white"
            )} 
          />
        </motion.button>
      </div>
    </>
  );
};

function IconContainer({
  mouseX,
  name,
  Icon,
  href,
  color

}: {
  mouseX: MotionValue;
  name: string;
  Icon: LucideIcon;
  href: string;
  color: string;

}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link to={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {name}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          <Icon size={20} style={{ color: color, minWidth: "20px" }} />

          {/* {icon} */}
        </motion.div>
      </motion.div>
    </Link>
  );
}
