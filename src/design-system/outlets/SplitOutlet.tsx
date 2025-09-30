import  { Suspense } from "react";
import Sidebar, { type SIDEBAR_ITEMS_types } from "@repo/design-system/navbars/Sidebar";
import {LoaderFive} from "@/design-system/loader/loader"
import { ProtectedRoute } from "./ProtectedRoute";



interface Props {
  SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[];
}

export const SplitOutlet = ({ SIDEBAR_ITEMS }: Props) => {
  return (
    <div className="grid   p-1  gap-1 md:flex md:p-4  md:gap-4 ">
      <div className="h-fit overflow-x-auto scrollbar-hide lg:overflow-visible">
        <Sidebar SIDEBAR_ITEMS={SIDEBAR_ITEMS} />
      </div>

      <div className="flex w-full rounded-sm justify-center  overflow-y-auto md:  scrollbar-hide ">
        <Suspense fallback={<LoaderFive text="loading...." />}>
          <ProtectedRoute />
        </Suspense>
      </div>
    </div>
  );
};

export default SplitOutlet;
