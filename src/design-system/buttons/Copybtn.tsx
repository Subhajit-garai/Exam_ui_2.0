import { toast } from "react-toastify";
import { ToastConfig } from "@repo/lib/utils/utils";
import { Tooltip_one as Tooltip } from "@repo/design-system//tooltip/tooltip_one";


const Trashbtn = ({
  text = "copy",
  textMessage = "copyed",
  isText = false,
  copyFn,
}: {
  text?: string;
  textMessage?: string;
  isText?: boolean;
  copyFn?: () => void;
}) => {
  return (
    <>
      <Tooltip text={text} >
        <div
          className=" flex items-center gap-1 cursor-pointer text-blue-700   p-1 rounded-sm"
          onClick={() => {
            toast.info(textMessage, ToastConfig());
            copyFn && copyFn();
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
            className="lucide lucide-copy-icon lucide-copy"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          {isText && <p className="text-xs font-bold ">{text}</p>}
        </div>
      </Tooltip>
    </>
  );
};

export default Trashbtn;
