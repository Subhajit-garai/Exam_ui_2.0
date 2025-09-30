import React, { type SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const SidebarItems = ({
  items,
  isCollapsed,
  setCollapsed,
}: {
  items:any[];
  isCollapsed:boolean;
  setCollapsed?:React.Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = useLocation().pathname;
  return (
    <>
      {items.map((item) => {
        const isActive = pathname === item.href;        
        return (
          <div key={item.id}>
            <div>
              <div>
                <Link
                  to={item.href}
                  className={`flex items-center rounded-lg p-3 text-center transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600/15 text-blue-500"
                      : "hover:bg-blue-600/15 hover:text-blue-500"
                  } ${isCollapsed ? "justify-center" : "gap-2"}`}
                  onClick={() => setCollapsed && setCollapsed(true)}
                >
                  <item.Component className="text-primary hover:text-blue-500" />
                  {!isCollapsed && (
                    <span className="text-lg font-medium text-primary tracking-tight hover:text-blue-500">
                      {item.name}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
