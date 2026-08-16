import ExamInfoDisplayCard from "./ExamInfoDisplayCard";

export const ExamSelection = ({
  exams,
  setcurrentexams,
  setexamid,
  modelClose,
}: {
  exams: any[];
  setcurrentexams: any;
  setexamid: any;
  modelClose?: any;
}) => {
  return (
    <div>
      <div className=" flex gap-2 ">
        {exams.map((exam) => {
          return (
            <ExamInfoDisplayCard
              key={exam.id}
              imageurl={"/assets/background1.jpg"}
              Title={exam?.name}
              particepents={exam?.ContestRegister?.count}
              contestid={exam?.id}
              timeStamp={exam?.date}
              startTime={exam?.starttime}
              joinTime={exam?.jointime}
              displayId={exam?.display_id}
              handleSeclect={() => {
                (setexamid(exam?.id), modelClose(false), setcurrentexams(exam));
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
