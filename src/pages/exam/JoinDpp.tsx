import React, { useEffect, useState, type SetStateAction } from "react";
import useExamTimetablehook from "@repo/hooks/examTime";
import JoinerxamCard from "./JoinerxamCard";
// import TabManue from "../../../../../packages/ui/src/mycomponents/tabs/TabManue";
import { useIsMobile } from "@repo/hooks/isMobile";
import { sortExamNames } from "@repo/lib/utils/utils";
import { SimplePagination as Pagination } from "@repo/design-system/pagenation";

import { useApi } from "@/ApiProvider";

const JoinDpp = () => {
  const [Test, setTest] = useState([]);

  const [entryChange, setEntryChange] = useState<string>("99");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [DppCount, setDppCount] = useState<number>(0);

  const _ = useApi();

  let { todaysExam, completedExam } = useExamTimetablehook(Test, "Dpp");

  completedExam = sortExamNames(completedExam, "@", "name", "desc");
  todaysExam = sortExamNames(todaysExam, "@", "name", "desc");

  useEffect(() => {
    (async () => {
      if (!entryChange) {
        let charge = await _.api.exam.getTokensystem("Dpp");
        setEntryChange(charge?.data == 0 ? "free" : charge?.data);
      }

      let data = await _.api.exam.fetchExams_by_type(
        "Dpp",
        currentPage,
        12,
        "desc"
      );
      if (data.success) {
        let { exams, total } = data.data;
        setTest(exams);
        setDppCount(total);
      } else {
        setTest([]);
      }
    })();
  }, [currentPage]);

  let MockOptions = [
    {
      id: 1,
      title: "Live Dpp",
      // icon: () => <BookOpenCheck color="#6366f1" />,
      isDisable: false,
      component: (
        <DppDisplay
          Dpp={todaysExam}
          entryChange={entryChange}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          dppCount={DppCount}
        />
      ),
    },
    {
      id: 1,
      title: "Completed Dpp",
      // icon:  ()=> <SquareM color="#10B981" />,
      isDisable: false,
      component: (
        <DppDisplay
          Dpp={completedExam}
          entryChange={entryChange}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          dppCount={DppCount}
        />
      ),
    },
  ];

  return (
    <div className="flex-1 md:h-160  relative  mb-20 md:mb-0">
      {/* <TabManue
        config={MockOptions}
        parentClass={" flex justify-center "}
        variant="underline"
      /> */}
    </div>
  );
};

export default JoinDpp;

const DppDisplay = ({
  Dpp,
  entryChange,
  type = "Dpp",
  noTitle = "No dpps",
  currentPage,
  setCurrentPage,
  dppCount,
}: {
  Dpp: any;
  entryChange: string;
  type?: string;
  noTitle?: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  dppCount: number;
}) => {
  const EXAMS_PER_PAGE = 16;
  const isMobile = useIsMobile();
  return (
    <>
      <div className="today flex gap-4 flex-wrap justify-between flex-col">
        <div className="exams flex gap-2 justify-center flex-wrap">
          {Dpp?.length ? (
            Dpp.map((exam: any) => {
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
            <p>{noTitle}</p>
          )}
        </div>

        {/* Middle: Pagination */}
        <div className="w-full flex justify-center ">
          {isMobile ? (
            <Pagination
              layout="center"
              currentPage={currentPage}
              itemsPerPage={EXAMS_PER_PAGE}
              totalItems={dppCount}
              onPageChange={setCurrentPage}
            />
          ) : (
            <Pagination
              layout="center"
              currentPage={currentPage}
              itemsPerPage={EXAMS_PER_PAGE}
              // Math.max(1, Math.ceil(dppCount / EXAMS_PER_PAGE))
              totalItems={dppCount}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};
