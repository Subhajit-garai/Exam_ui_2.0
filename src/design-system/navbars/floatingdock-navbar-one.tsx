



import { FloatingDockNav } from "./floatingdock";
import type { SIDEBAR_ITEMS_types } from "./Sidebar";

export function FloatingDockNavBar({ SIDEBAR_ITEMS }: { SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] }) {
  
  return (
    <div className="fixed bottom-25 right-5 lg:bottom-10 z-10">
      <FloatingDockNav
        mobileClassName="translate-y-0" // only for demo, remove for production
        desktopClassName="translate-x-0" // only for demo, remove for production
        items={SIDEBAR_ITEMS}
      />
    </div>
  );
}
