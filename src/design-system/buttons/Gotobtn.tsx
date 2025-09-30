import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {Tooltip} from "@repo/design-system/tooltip/tooltip"
import { ToastConfig } from "@repo/lib/utils/utils";

const Gotobtn = ({
  text = "Navigate",
  textMessage = "Navigating...",
  link = "#",
  isText = false,
}: {
  text?: string;
  textMessage?: string;
  link?: string;
  isText?: boolean;
}) => {
  const navidate = useNavigate();
  return (
    <>
        <Tooltip text={text}>
    
      <div
        className=" flex items-center gap-1 cursor-pointer text-blue-700   p-1 rounded-sm"
        onClick={() => {
          toast.info(textMessage,ToastConfig());
          navidate(link);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-arrow-big-right-icon lucide-arrow-big-right"
        >
          <path d="M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" />
        </svg>
        {isText && <p className="text-xs font-bold ">{text}</p>}
      </div>
      </Tooltip>
    </>
  );
};

export default Gotobtn;
