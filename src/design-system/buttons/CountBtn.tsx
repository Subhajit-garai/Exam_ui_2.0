import { toast } from "react-toastify";
import {  Badge } from "@repo/ui/badge";
import { ToastConfig } from "@repo/lib/utils/utils";
import {Tooltip} from "@repo/design-system/tooltip/tooltip"

const CountBtn = ({
  text = "total",
  textMessage = "checking...",
  count = 0,
  isText = false,
}: {
  text?: string;
  textMessage?: string;
  count?: number;
  isText?: boolean;
}) => {
  return (
    <>
      <Tooltip text={text}>
        <div
          className=" flex items-center gap-1 cursor-pointer bg-transparent   text-blue-700 hover:text-green-600  p-1 rounded-sm"
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
            className="lucide lucide-layers-icon lucide-layers"
          >
            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
            <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
            <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
          </svg>

          {isText && <p className="text-xs font-bold ">{text}</p>}
          <Badge className="ms-2 rounded-full">{count}</Badge>
        </div>
      </Tooltip>
    </>
  );
};

export default CountBtn;
