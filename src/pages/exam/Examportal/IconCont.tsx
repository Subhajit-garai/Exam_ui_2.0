import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";
import {
  setanssetInit,
  setCurrentPart,
  type parts_type,
} from "@repo/store/slice/examSlice";
import { ExamEndTime } from "../Timer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ToastConfig } from "@/lib";
import { CheckCircle, Layers, type LucideIcon } from "lucide-react";
import { cn } from "@repo/lib/utils";

const InfoButton = ({
  Icon,
  label,
  value,
  onClick,
  colorScheme = "blue",
  className,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  onClick?: () => void;
  colorScheme?: "blue" | "green" | "purple" | "orange";
  className?: string;
}) => {
  const colorStyles = {
    blue: {
      border: "hover:border-blue-500/50 dark:hover:border-blue-500/50",
      iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      text: "text-zinc-900 dark:text-zinc-100",
    },
    green: {
      border: "hover:border-green-500/50 dark:hover:border-green-500/50",
      iconBg: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      text: "text-zinc-900 dark:text-zinc-100",
    },
    purple: {
      border: "hover:border-purple-500/50 dark:hover:border-purple-500/50",
      iconBg: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      text: "text-zinc-900 dark:text-zinc-100",
    },
    orange: {
      border: "hover:border-orange-500/50 dark:hover:border-orange-500/50",
      iconBg: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
      text: "text-zinc-900 dark:text-zinc-100",
    },
  };

  const styles = colorStyles[colorScheme];

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer",
        className
      )}
    >
      <div className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-xl border shadow-sm transition-all duration-300",
        "bg-white dark:bg-zinc-900",
        "border-zinc-200 dark:border-zinc-800",
        styles.border
      )}>
        <div className={cn(
          "p-2 rounded-lg transition-colors",
          styles.iconBg
        )}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {label}
          </span>
          <span className={cn(
            "text-lg font-bold font-mono tracking-tight leading-none",
            styles.text
          )}>
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};

export const InfoCont = () => {
  const _ = useApi();
  let { ansset } = useAppSelector((state) => state.exam);
  const [TotalPart, setTotalPart] = useState<string[] | []>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let Examid = ansset?.examid;

  useEffect(() => {
    let keys = Object.keys(ansset?.parts);
    setTotalPart(keys);
  }, [Examid]);

  const FinalAnssubmit = async () => {
    _.api.exam
      .finalSubmitExam({ examid: Examid })
      .then(async (response) => {
        if (response.success) {
          try {
            await _.api.activity.logActivity({
              type: "TEST_COMPLETED",
              title: "Test Completed",
              description: `Completed exam ${Examid}`,
              metadata: { examId: Examid }
            });
          } catch (e) {
            console.error("Failed to log activity", e);
          }

          console.log("test submission successful");
          toast.success(response.message, ToastConfig());
          dispatch(setanssetInit());
          navigate("/test/submitsuccess");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, ToastConfig());
      });
  };

  const TogglePart = (value: parts_type) => {
    dispatch(setCurrentPart(value));
  };
  return (
    <div className="flex flex-col gap-3 w-full">

      <ExamEndTime
        Examid={Examid}
        className="w-full"
        autosubmit={FinalAnssubmit}
      />

      <InfoButton
        Icon={CheckCircle}
        label="Action"
        value="Submit Exam"
        onClick={FinalAnssubmit}
        colorScheme="green"
        className="w-full"
      />

      {/* HR */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 my-2"></div>

      <p className="text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
        Switch Section
      </p>

      <div className="flex flex-col gap-3 w-full">
        {TotalPart &&
          TotalPart?.map((part, index) => (
            <InfoButton
              key={part}
              Icon={Layers}
              label={`Section ${index + 1}`}
              value={part}
              onClick={() => {
                TogglePart(part as parts_type);
              }}
              colorScheme="purple"
              className="w-full"
            />
          ))}
      </div>
    </div>
  );
};
