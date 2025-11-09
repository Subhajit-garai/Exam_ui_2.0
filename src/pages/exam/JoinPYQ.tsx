import React, { useEffect, useState, type SetStateAction } from "react";
import JoinerxamCard from "./JoinerxamCard";
import useExamTimetablehook from "@repo/hooks/examTime";
import { useIsMobile } from "@repo/hooks/isMobile";
import { SimplePagination as Pagination } from "@repo/design-system/pagenation";
import { Tabs } from "@repo/design-system/tabs/Tabs";
import { useApi } from "@/ApiProvider";
import { LoaderFive } from "@repo/design-system/loader/loader";

  export  const  JoinPYQ = () => {
  const [Test, setTest] = useState([]);
  const [entryChange, setEntryChange] = useState<string>("99");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TestsCount, setTestsCount] = useState<number>(0);

  const _ = useApi();

  let { todaysExam, tomorrowsExam, completedExam } = useExamTimetablehook(Test);
  const [loading, setLoading] = useState(true);

  const fetchTests = async () => {
    setLoading(true);
    if (!entryChange) {
      let charge = await _.api.exam.getTokensystem("PYQ");
      setEntryChange(
        charge?.data == "0"
          ? "free"
          : typeof charge?.data !== "string"
          ? String(charge?.data)
          : charge?.data
      );
    }

    let data = await _.api.exam.fetchExams_by_type(
      "PYQ",
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
    console.log("loading setting-- to false");
    setLoading(false);
  };

  useEffect(() => {
    fetchTests();
  }, [currentPage]);

  useEffect(() => {
    console.log("Hook updated:", { todaysExam, tomorrowsExam, completedExam });
  }, [todaysExam, tomorrowsExam, completedExam]);

  
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
              type={"PYQ"}
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
              Data={tomorrowsExam}
              entryChange={entryChange}
              type={"PYQ"}
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
              type={"PYQ"}
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
          <Tabs tabs={tabs} contentClassName="mt-10" activeTabClassName="" />
        </div>
      </div>
    </>
  );
};


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
        <div className=" flex  h-full w-full flex-col justify-between p-2 gap-4 overflow-auto no-visible-scrollbar">

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
