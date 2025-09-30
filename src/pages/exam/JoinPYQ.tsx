import { useEffect, useState } from "react";
import JoinerxamCard from "./JoinerxamCard";
import { sortExamNames } from "@repo/lib/utils/utils";
import { SimplePagination as Pagination } from "@repo/design-system/pagenation";
import { useIsMobile } from "@repo/hooks/isMobile";
import { useApi } from "@/ApiProvider";

export const JoinPYQ = () => {
  const [PYQMock, setPYQMock] = useState([]);
  const [entryChange, setEntryChange] = useState<string>("99");
  const [ExamsCount, setExamsCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const isMobile = useIsMobile();
  const EXAMS_PER_PAGE = 16;
    const _ = useApi();
  

  useEffect(() => {
    (async () => {
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

      let data = await _.api.exam.fetchExams_by_type("PYQ", currentPage, 12, "asc");
      if (data.success) {
        let { exams, total } = data.data;
        let sortdData:any = sortExamNames(exams, "@", "name");
        setPYQMock(sortdData);
        setExamsCount(total);
      } else {
        setPYQMock([]);
      }
    })();
  }, [currentPage]);

  return (
    <>
      <div className="today flex gap-4 flex-wrap justify-between flex-col mb-20 md:mb-0">
        <div className="exams flex gap-2 justify-center flex-wrap">
          {PYQMock.map((exam:any) => {
            if (exam.examtype == "PYQ") {
              return (
                <JoinerxamCard
                  key={exam.id}
                  imageurl={"/assets/background1.jpg"}
                  contestid={exam?.id}
                  displayId={exam?.display_id}
                  Title={exam?.name}
                  examtype={exam?.examtype}
                  timeStamp={exam?.date}
                  startTime={exam?.starttime}
                  joinTime={exam?.jointime}
                  particepents={exam?.particepents ?? 0}
                  entryChange={entryChange}
                  status={exam?.creationstatus}
                />
              );
            }
          })}
        </div>

        {/* Middle: Pagination */}
        <div className="w-full flex justify-center ">
          {isMobile ? (
            <Pagination
              layout="center"
              currentPage={currentPage}
              itemsPerPage={EXAMS_PER_PAGE}
              totalItems={ExamsCount}
              onPageChange={setCurrentPage}
            />
          ) : (
            <Pagination
              layout="center"
              currentPage={currentPage}
             // totalPages={Math.max(1,Math.ceil(ExamsCount / EXAMS_PER_PAGE))}
               itemsPerPage={EXAMS_PER_PAGE}
              totalItems={ExamsCount}
              onPageChange={setCurrentPage}
              
            />
          )}
        </div>
      </div>
    </>
  );
};
