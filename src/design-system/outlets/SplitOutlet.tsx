import { Suspense } from "react";
import {
  type SIDEBAR_ITEMS_types,
} from "@repo/design-system/navbars/Sidebar";
import { LoaderFive } from "@/design-system/loader/loader";
import { ProtectedRoute } from "./ProtectedRoute";
import { FloatingDockNavBar } from "../navbars/floatingdock-navbar-one";

interface Props {
  SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[];
}

export const SplitOutlet = ({ SIDEBAR_ITEMS }: Props) => {
  return (
    <div className="grid   p-1  gap-1 md:flex md:p-4  md:gap-4 ">
      {/* <div className="h-fit overflow-x-auto no-visible-scrollbar lg:overflow-visible">
        <Sidebar SIDEBAR_ITEMS={SIDEBAR_ITEMS} />
        
      </div> */}
      <FloatingDockNavBar  SIDEBAR_ITEMS={SIDEBAR_ITEMS} />

      <div className="flex w-full rounded-sm justify-center  overflow-y-auto    no-visible-scrollbar ">
        <Suspense fallback={<LoaderFive text="loading...." />}>
          <ProtectedRoute />
        </Suspense>
      </div>
    </div>
  );
};

export default SplitOutlet;
