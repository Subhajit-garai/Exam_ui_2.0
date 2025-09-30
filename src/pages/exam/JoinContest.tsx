import { useEffect } from "react";
import JoinerxamCard from "./JoinerxamCard";
import useExamTimetablehook from "@repo/hooks/examTime";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";

const JoinExam = () => {
  const dispatch = useAppDispatch();
  let { Exams } = useAppSelector((state) => state.exam);
  const _ = useApi();
  const { todaysExam, tomorrowExam, upcomingExam, completedExam } =
    useExamTimetablehook(Exams);

  useEffect(() => {
    _.api.exam.fetchExams(dispatch);
  }, []);

  return (
    <>
      <div className="flex-1 md:h-160 overflow-auto relative  justify-center">
        <h1 className="text-3xl font-semibold text-center text-primary mb-4">
          Join Contests
        </h1>
        <div className="today flex gap-4 flex-wrap justify-center flex-col">
          <p>Today's upcoming Contests</p>
          <div className="exams flex gap-2 justify-center flex-wrap">
            {todaysExam?.length ? (
              todaysExam.map((exam) => {
                if (exam.examtype == "Contest") {
                  return (
                    <JoinerxamCard
                      key={exam.id}
                      imageurl={"/assets/background1.jpg"}
                      contestid={exam?.id}
                      Title={exam?.name}
                      particepents={56}
                      displayId={exam?.display_id}
                      timeStamp={exam?.date}
                      startTime={exam?.starttime}
                      joinTime={exam?.jointime}
                      examtype={exam?.examtype}
                      entryChange={exam?.entryChange}
                      status={exam?.status}
                    />
                  );
                }
              })
            ) : (
              <p>No Contests </p>
            )}
          </div>
        </div>
        <div className="today flex gap-4 flex-wrap justify-center flex-col">
          <p>Tomorrow Contests</p>
          <div className="exams flex gap-2 justify-center flex-wrap">
            {tomorrowExam?.length ? (
              tomorrowExam.map((exam) => {
                if (exam.examtype == "Contest") {
                  return (
                    <JoinerxamCard
                      key={exam.id}
                      imageurl={"/assets/background1.jpg"}
                      contestid={exam?.id}
                      Title={exam?.name}
                      timeStamp={exam?.date}
                      startTime={exam?.starttime}
                      joinTime={exam?.jointime}
                      displayId={exam?.display_id}
                      particepents={56}
                      examtype={exam?.examtype}
                      entryChange={exam?.entryChange}
                      status={exam?.status}
                    />
                  );
                }
              })
            ) : (
              <p>No Contests </p>
            )}
          </div>
        </div>
        <div className="today flex gap-4 flex-wrap justify-center flex-col">
          <p>upcoming Contests</p>
          <div className="exams flex gap-2 justify-center flex-wrap ">
            {upcomingExam?.length ? (
              upcomingExam.map((exam) => {
                if (exam.examtype == "Contest") {
                  return (
                    <JoinerxamCard
                      key={exam.id}
                      imageurl={"/assets/background1.jpg"}
                      contestid={exam?.id}
                      Title={exam?.name}
                      timeStamp={exam?.date}
                      startTime={exam?.starttime}
                      joinTime={exam?.jointime}
                      displayId={exam?.display_id}
                      particepents={56}
                      examtype={exam?.examtype}
                      entryChange={exam?.entryChange}
                      status={exam?.status}
                    />
                  );
                }
              })
            ) : (
              <p>No Contests </p>
            )}
          </div>
        </div>
        <div className="today flex gap-4 flex-wrap justify-center flex-col">
          <p>Completed Contests</p>
          <div className="exams flex gap-2 justify-center flex-wrap">
            {completedExam?.length ? (
              completedExam.map((exam) => {
                if (exam.examtype == "Contest") {
                  return (
                    <JoinerxamCard
                      key={exam.id}
                      imageurl={"/assets/background1.jpg"}
                      contestid={exam?.id}
                      Title={exam?.name}
                      timeStamp={exam?.date}
                      startTime={exam?.starttime}
                      joinTime={exam?.jointime}
                      displayId={exam?.display_id}
                      particepents={56}
                      examtype={exam?.examtype}
                      entryChange={exam?.entryChange}
                      status={exam?.status}
                    />
                  );
                }
              })
            ) : (
              <p>No Contests </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinExam;
