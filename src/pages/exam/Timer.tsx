import { useEffect, useState } from "react";
import { calculateExamRemining_Time, useRemainingTime,calculateExamJoinRemainingTime } from "@repo/hooks/examTime";
import { Badge } from "@repo/ui/badge";
import { AlarmClockCheck, type LucideIcon } from "lucide-react";
import { useApi } from "@/ApiProvider";
import { cn } from "@repo/lib";

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
    <div>
      <div className={cn(`time absolute`, className)}>
        <Badge className="flex gap-1">
          {<Icon size={15} />}
          {message + " " + time_str}
        </Badge>
      </div>
    </div>
  );
};

export const Timer = ({
  Icon = AlarmClockCheck,
  time,
  message = "",
  className,
  action = () => {},
}: {
  Icon?: LucideIcon;
  time: number;
  message?: string;
  className?: string;
  action?: () => void;
}) => {
  let time_str = useRemainingTime(time, action);

  return (
    <div>
      <div className={cn("time", className)}>
        <div className="flex gap-1">
          {<Icon size={22} />}
          <p className=" text-[16px]">{message + " " + time_str}</p>
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

  // console.log("start" ,startTimeRemining);
  // console.log("join" , joinTimeRemining);

  return (
    <div>
      <div className={cn("time flex", className)}>
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
      setExamReminigTime(time? time:0);
    })();
  }, [Examid]);
  return (
    <div>
      <div className={cn("time flex ", className)}>
        {ExamReminigTime <= 0 ? (
          <div className={`time  ${timerClass}`}>
            <span className="flex gap-1">
              {<Icon size={15} />}
              Exam time up
            </span>
          </div>
        ) : (
          <Timer time={ExamReminigTime} message="End in" action={autosubmit} />
        )}
      </div>
    </div>
  );
};
