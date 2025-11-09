import { Outlet } from "react-router-dom";

export const FullpageOutlet = () => {
  return (
    <div className="h-full w-full p-4 overflow-y-auto no-visible-scrollbar">
        <Outlet/>
    </div>  
  )
}

export default FullpageOutlet
