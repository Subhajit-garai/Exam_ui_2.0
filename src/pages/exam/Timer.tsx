import { useEffect, useState } from "react";
import { calculateExamRemining_Time, useRemainingTime, calculateExamJoinRemainingTime } from "@repo/hooks/examTime";
import { Badge } from "@repo/ui/badge";
import { AlarmClockCheck, type LucideIcon } from "lucide-react";
import { useApi } from "@/ApiProvider";
import { cn } from "@repo/lib/utils";

const KbdTimer = ({
  Icon = AlarmClockCheck,
  time,
  message = "",
  className,
}: {
  Icon?: LucideIcon;
  time: number;
  message?: string;
  className?: string;
}) => {
  let time_str = useRemainingTime(time);

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700", className)}>
      <Icon className="text-zinc-500 dark:text-zinc-400" size={13} />
      <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase">{message}</span>
      <span className="text-xs font-bold font-mono text-zinc-900 dark:text-zinc-100 tabular-nums">
        {time_str}
      </span>
    </div>
  );
};

export const Timer = ({
  Icon = AlarmClockCheck,
  time,
  message = "",
  className,
  action = () => { },
}: {
  Icon?: LucideIcon;
  time: number;
  message?: string;
  className?: string;
  action?: () => void;
}) => {
  let time_str = useRemainingTime(time, action);
  const isUrgent = time < 300; // Less than 5 minutes

  return (
    <div className={cn("relative group", className)}>
      <div className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-xl border shadow-sm transition-all duration-300",
        "bg-white dark:bg-zinc-900",
        "border-zinc-200 dark:border-zinc-800",
        isUrgent ? "border-red-500/50 dark:border-red-500/50 bg-red-50/50 dark:bg-red-950/20" : "hover:border-blue-500/50 dark:hover:border-blue-500/50"
      )}>
        <div className={cn(
          "p-2 rounded-lg transition-colors",
          isUrgent ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
        )}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {message}
          </span>
          <span className={cn(
            "text-lg font-bold font-mono tracking-tight tabular-nums leading-none",
            isUrgent ? "text-red-600 dark:text-red-400" : "text-zinc-900 dark:text-zinc-100"
          )}>
            {time_str}
          </span>
        </div>
      </div>
    </div>
  );
};

export default KbdTimer;

export const ExamJoinTime = ({
  Icon = AlarmClockCheck,
  timerClass,
  className,
  timeStamp,
  startTime,
  joinTime,
}: {
  Icon?: LucideIcon;
  timerClass?: string;
  className?: string;
  timeStamp: string;
  startTime: string;
  joinTime: string;
}) => {
  const [startTimeRemining, setstartTimeRemining] = useState(0);
  const [joinTimeRemining, setjoinTimeRemining] = useState(0);

  useEffect(() => {
    let { remainingSecondsForStart, remainingSecondsForjoin } =
      calculateExamJoinRemainingTime(timeStamp, startTime, joinTime);
    setstartTimeRemining(remainingSecondsForStart);
    setjoinTimeRemining(remainingSecondsForjoin);
  }, []);


  return (
    <div>
      <div className={cn("time flex ", className)}>
        {startTimeRemining <= 0 && joinTimeRemining <= 0 ? (
          <div className={`time absolute ${timerClass}`}>
            <Badge className="flex gap-1">
              {<Icon size={15} />}
              Exam Closed
            </Badge>
          </div>
        ) : joinTimeRemining > 0 && startTimeRemining <= 0 ? (
          <KbdTimer
            Icon={Icon}
            message={"Join in"}
            time={joinTimeRemining}
            className={timerClass}
          />
        ) : (
          <KbdTimer
            Icon={Icon}
            message={"Start in"}
            time={startTimeRemining}
            className={timerClass}
          />
        )}
      </div>
    </div>
  );
};

export const ExamEndTime = ({
  Icon = AlarmClockCheck,
  Examid = "",
  className,
  timerClass,
  autosubmit,
}: {
  Icon?: LucideIcon;
  Examid?: string;
  className?: string;
  timerClass?: string;
  autosubmit?: () => void;
}) => {
  const _ = useApi();
  const [ExamReminigTime, setExamReminigTime] = useState(0);

  useEffect(() => {
    (async () => {
      let ExamDetails_responce = await _.api.exam.fetchExamsByid(Examid);
      let ExamDetails = ExamDetails_responce.data[0];
      let time = calculateExamRemining_Time(ExamDetails.duration);
      setExamReminigTime(time ? time : 0);
    })();
  }, [Examid]);
  return (
    <div className={cn("time flex w-full", className)}>
      {ExamReminigTime <= 0 ? (
        <div className={`time  ${timerClass}`}>
          <span className="flex gap-1">
            {<Icon size={15} />}
            Exam time up
          </span>
        </div>
      ) : (
        <Timer time={ExamReminigTime} message="End in" action={autosubmit} className="w-full" />
      )}
    </div>
  );
};
