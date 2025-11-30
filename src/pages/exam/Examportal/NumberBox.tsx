import { useEffect, useState } from "react";
import { useAppSelector } from "@repo/store/hook";
import { type answer_format_type } from "@repo/store/slice/examSlice";
import { cn } from "@repo/lib/utils";

export const NumberBox = ({
  fetchQuestionwithNumber,
}: {
  fetchQuestionwithNumber: (num: number) => void;
}) => {
  const [ansState, setansState] = useState<answer_format_type[]>([]);

  let { ansset, CurrentPart } = useAppSelector((state) => state.exam);

  useEffect(() => {
    let State = ansset.parts[CurrentPart];
    setansState(State);
  }, [CurrentPart, ansset]);

  return (
    <>
      {ansState?.map((ele: answer_format_type, i) => {
        let statusColor = "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-400";

        if (ele.isans) {
          statusColor = "bg-emerald-500 border-emerald-600 text-white shadow-sm shadow-emerald-200 dark:shadow-none";
        } else if (ele.isview) {
          statusColor = "bg-rose-500 border-rose-600 text-white shadow-sm shadow-rose-200 dark:shadow-none";
        }

        return (
          <div
            key={i}
            id={`${CurrentPart}NumberBox${ele}`}
            className={cn(
              "w-10 h-10 flex justify-center items-center rounded-xl border-2 cursor-pointer transition-all duration-200 font-bold text-sm",
              statusColor
            )}
            onClick={() => {
              fetchQuestionwithNumber(i + 1);
            }}
          >
            {i + 1}
          </div>
        );
      })}
    </>
  );
};
