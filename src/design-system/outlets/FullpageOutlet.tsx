import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer";

export const FullpageOutlet = () => {
  return (
    <div className="min-h-[95vh] w-full overflow-y-auto no-visible-scrollbar flex flex-col">
      <div className="flex-1 p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default FullpageOutlet
