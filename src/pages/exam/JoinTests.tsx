import React, { useEffect, useState, type SetStateAction } from "react";
import JoinerxamCard from "./JoinerxamCard";
import useExamTimetablehook from "@repo/hooks/examTime";
import { useIsMobile } from "@repo/hooks/isMobile";
import { SimplePagination as Pagination } from "@repo/design-system/pagenation";
import { sortExamNames } from "@repo/lib/utils/utils";
import { Tabs } from "@repo/design-system/tabs/Tabs";
import { useApi } from "@/ApiProvider";
import { LoaderFive } from "@repo/design-system/loader/loader";

const JoinExam = () => {
  const [Test, setTest] = useState([]);
  const [entryChange, setEntryChange] = useState<string>("99");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TestsCount, setTestsCount] = useState<number>(0);

  const _ = useApi();

  let { todaysExam, tomorrowExam, completedExam } = useExamTimetablehook(Test);

  todaysExam = sortExamNames(todaysExam, "@", "name", "desc");
  tomorrowExam = sortExamNames(tomorrowExam, "@", "name", "desc");
  completedExam = sortExamNames(completedExam, "@", "name", "desc");

  const [loading, setLoading] = useState(true);

  const fetchTests = async () => {
    setLoading(true);
    if (!entryChange) {
      let charge = await _.api.exam.getTokensystem();
      setEntryChange(
        charge?.data == "0"
          ? "free"
          : typeof charge?.data !== "string"
          ? String(charge?.data)
          : charge?.data
      );
    }

    let data = await _.api.exam.fetchExams_by_type(
      "Exam",
      currentPage,
      12,
      "desc"
    );
    if (data.success) {
      let { exams, total } = data.data;
      setTest(exams);
      setTestsCount(total);
    } else {
      setTest([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTests();
  }, [currentPage]);

  // let Options = [
  //   {
  //     id: 1,
  //     title: "Live",
  //     // icon: () => <BookOpenCheck color="#6366f1" />,
  //     isDisable: false,
  //     component: (
  //       <ExamDisplay
  //         Data={todaysExam}
  //         entryChange={entryChange}
  //         type={"Exam"}
  //         setCurrentPage={setCurrentPage}
  //         currentPage={currentPage}
  //         TestCount={TestsCount}
  //       />
  //     ),
  //   },
  //   {
  //     id: 2,
  //     title: "Upcoming",
  //     // icon: () => <BookOpenCheck color="#6366f1" />,
  //     isDisable: false,
  //     component: (
  //       <ExamDisplay
  //         Data={tomorrowExam}
  //         entryChange={entryChange}
  //         type={"Exam"}
  //         setCurrentPage={setCurrentPage}
  //         currentPage={currentPage}
  //         TestCount={TestsCount}
  //       />
  //     ),
  //   },
  //   {
  //     id: 3,
  //     title: "Completed ",
  //     // icon:  ()=> <SquareM color="#10B981" />,
  //     isDisable: false,
  //     component: (
  //       <ExamDisplay
  //         Data={completedExam}
  //         entryChange={entryChange}
  //         type={"Exam"}
  //         setCurrentPage={setCurrentPage}
  //         currentPage={currentPage}
  //         TestCount={TestsCount}
  //       />
  //     ),
  //   },
  // ];

  const tabs = [
    {
      title: "Live",
      value: "Live",
      content: (
        <div
          key={`live-${TestsCount}`}
          className="w-full overflow-hidden relative h-full rounded-xl p-10  font-bold text-primary bg-card"
        >
          <p>Live Tab</p>

          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <ExamDisplay
              Data={todaysExam}
              entryChange={entryChange}
              type={"Exam"}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              TestCount={TestsCount}
            />
          )}
        </div>
      ),
    },
    {
      title: "Upcoming",
      value: "Upcoming",
      content: (
        <div
          key={`Upcoming-${TestsCount}`}
          className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl font-bold text-primary bg-card"
        >
          <p>Upcoming tab</p>

          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <ExamDisplay
              Data={tomorrowExam}
              entryChange={entryChange}
              type={"Exam"}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              TestCount={TestsCount}
            />
          )}
        </div>
      ),
    },
    {
      title: "Completed",
      value: "Completed",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl  font-bold text-primary bg-card">
          <p>Completed tab</p>
          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <ExamDisplay
              Data={completedExam}
              entryChange={entryChange}
              type={"Exam"}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              TestCount={TestsCount}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex-1 md:h-160  relative  mb-20 md:mb-0 ">
        <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
          {!Test.length ? (
            <LoaderFive text="Loading..." />
          ) : (
            <Tabs  tabs={tabs} />
          )}
        </div>
      </div>
    </>
  );
};

export default JoinExam;

const ExamDisplay = ({
  Data,
  entryChange,
  type,
  noTitle = " No Tests",
  currentPage,
  setCurrentPage,
  TestCount,
}: {
  Data: any;
  entryChange: string;
  type: string;
  noTitle?: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  TestCount: number;
}) => {
  const EXAMS_PER_PAGE = 12;
  const isMobile = useIsMobile();

  return (
    <>
      {TestCount ? (
        <div className="today flex gap-4 flex-wrap justify-between flex-col">
          <div className="exams flex gap-2 justify-center flex-wrap">
            {Data?.length ? (
              Data.map((exam: any) => {
                if (exam.examtype == type) {
                  return (
                    <JoinerxamCard
                      key={exam.id}
                      imageurl={"/assets/background2.jpg"}
                      contestid={exam?.id}
                      displayId={exam?.display_id}
                      Title={exam?.name}
                      timeStamp={exam?.date}
                      startTime={exam?.starttime}
                      joinTime={exam?.jointime}
                      particepents={exam?.ContestRegister?.count}
                      entryChange={entryChange}
                      status={exam?.creationstatus}
                      examtype={exam?.examtype}
                    />
                  );
                }
              })
            ) : (
              <p> {noTitle} </p>
            )}
          </div>

          {/* Middle: Pagination */}
          <div className="w-full flex justify-center ">
            {isMobile ? (
              <Pagination
                layout="center"
                currentPage={currentPage}
                itemsPerPage={EXAMS_PER_PAGE}
                totalItems={TestCount}
                onPageChange={setCurrentPage}
              />
            ) : (
              <Pagination
                layout="center"
                currentPage={currentPage}
                itemsPerPage={EXAMS_PER_PAGE}
                totalItems={TestCount}
                //totalPages={Math.max(1, Math.ceil(TestCount / EXAMS_PER_PAGE || 0))}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      ) : (
        <LoaderFive text="Loading..." />
      )}
    </>
  );
};
