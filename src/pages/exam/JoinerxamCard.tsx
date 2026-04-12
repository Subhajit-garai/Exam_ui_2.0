import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { ExamJoinTime } from "./Timer.js";
import { AlarmClockCheck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ToastConfig } from "@repo/lib/utils/utils";
import { calculateExamJoinRemainingTime } from "@repo/hooks/examTime";
import dayjs from "dayjs";
import { setlastExam, setTotal_Questions } from "@repo/store/slice/examSlice";
import { useApi } from "@/ApiProvider.js";
import { ExamJoinBtn } from "@repo/design-system/buttons";
import { Tooltip_one } from "@repo/design-system/tooltip/tooltip_one.js";

type props = {
  imageurl: string;
  contestid: string;
  Title: string;
  particepents: number;
  displayId: string;
  timeStamp: string;
  startTime: string;
  joinTime: string;
  examtype: string;
  entryChange: string;
  status: string;
};

const JoinerxamCard = ({
  imageurl,
  contestid,
  Title,
  particepents,
  displayId,
  timeStamp,
  startTime,
  joinTime,

  examtype,
  entryChange,
  status,
}: props) => {
  const _ = useApi();
  timeStamp = dayjs(timeStamp).format("DD-MM-YYYY");
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const isDisabled = status !== "Done";

  const handleJoinExam = async () => {
    let res = await _.api.exam.requestTojoinExam(contestid);
    // .then((res) => {
    if (res.success == true) {
      toast.success(res.message, ToastConfig());
      _.api.user.fetchuser(dispatch);
      localStorage.setItem("lastexam", contestid);
      let responce = await _.api.exam.fetchExamsByid(contestid);
      if (responce.success) {
        dispatch(
          setTotal_Questions(responce.data[0]?.exam_pattern?.total_questions)
        );
        // Log Activity
        _.api.activity.logActivity({
          type: examtype.toUpperCase(),
          title: `Joined ${Title}`,
          description: `Started attempting ${Title}`,
          status: "Joined",
          metadata: { examId: contestid, examType: examtype },
        });
        navigator(`/examportal?id=${encodeURIComponent(contestid)}`);
      } else {
        console.log("error res -> ", responce);
      }
    } else {
      toast.error(res.message, ToastConfig());
    }
  };

  let { remainingSecondsForStart, remainingSecondsForjoin } =
    calculateExamJoinRemainingTime(timeStamp, startTime, joinTime);

  return (
    <div
      className={` flex flex-col gap-8  ${isDisabled ? "opacity-55 pointer-events-none" : "opacity-100"
        }`}
    >
      <div className="w-62 relative bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={imageurl} alt="" />

        <div className="info flex gap-2  absolute w-full top-0 left-0 py-4 px-2">
          {/* replace start time with join time */}
          {examtype == "Mock" || examtype == "PYQ" ? (
            <Button
              className="absolute right-0 mr-5"
              size="sm"
              color="success"
              disabled={isDisabled}
              onClick={() => {
                // set exam id
                dispatch(setlastExam(contestid));
                navigator("/analysis/test");
              }}
            >
              View Result
            </Button>
          ) : (
            <ExamJoinTime
              timeStamp={timeStamp}
              startTime={startTime}
              joinTime={joinTime}
              timerClass={"absolute right-0 mr-2 "}
            />
          )}
          <Badge className=" bg-[var(--primary-foreground)]">
            <h5 className=" font-semibold text-[var(--text-primary)] text-md z-30 left-0 mr-1 ">
              #{displayId ? displayId : "3421"}
            </h5>
          </Badge>
        </div>
        <div className="info flex gap-2 w-full justify-between absolute  bottom-14 right-0  p-4">
          <Badge className="flex gap-1  bg-[var(--primary-foreground)]">
            {<AlarmClockCheck className="text-primary" size={15} />}
            <h5 className=" font-semibold text-[var(--text-primary)] text-md z-30 left-0 mr-1 ">
              {startTime ? startTime : "0:00 am"}
            </h5>
          </Badge>
          <Badge className=" bg-[var(--primary-foreground)]">
            <span className="flex gap-1">
              <Users className=" text-[var(--text-primary)]" size={15} />
              <p className="text-[var(--text-primary)]">{particepents}</p>
            </span>
          </Badge>
        </div>
        <div className=" flex font-semibold gap-1 justify-between  items-center ">
          <div className="p-1">
            <Tooltip_one text={Title}>
              <p className="text-[var(--text-primary)]">{Title.length > 15 ? Title.slice(0, 12) + "..." : Title}</p>
            </Tooltip_one>
            <p className="text-sm text-[var(--text-secondary)]">{timeStamp}</p>
          </div>
          <div className="p-1">
            {examtype == "Mock" || examtype == "PYQ" ? (
              <>
                <ExamJoinBtn
                  handleJoinExam={handleJoinExam}
                  entryChange={entryChange}
                  isDisabled={isDisabled}
                />
              </>
            ) : (
              <>
                {remainingSecondsForStart == 0 &&
                  remainingSecondsForjoin == 0 ? (
                  <Button
                    size="sm"
                    color="success"
                    disabled={isDisabled}
                    onClick={() => {
                      // set exam id
                      dispatch(setlastExam(contestid));
                      navigator("/analysis/test");
                    }}
                  >
                    View Result
                  </Button>
                ) : (
                  <ExamJoinBtn
                    handleJoinExam={handleJoinExam}
                    entryChange={entryChange}
                    isDisabled={isDisabled}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinerxamCard;
