import { toast } from "react-toastify";
import { ToastConfig } from "@repo/lib/utils/utils";

const Trashbtn = ({
  text = "trash",
  textMessage = "removing...",
    isText = false,

}: {
  text: string;
  textMessage?: string;
  isText?: boolean;
}) => {
  return (
    <>
        {/* <AnimatedTooltip_message item={{id:1 , message:"Trash", extra_message:"Delete"}} > */}
    
      <div
        className=" flex items-center gap-1 cursor-pointer bg-transparent   text-red-600 hover:text-green-600  p-1 rounded-sm"
        onClick={() => {
          toast.info(textMessage,ToastConfig());
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
          className="lucide lucide-trash2-icon lucide-trash-2"
        >
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>

        {isText && <p className="text-xs font-bold ">{text}</p>}
      </div>
      {/* </AnimatedTooltip_message> */}
    </>
  );
};

export default Trashbtn;
