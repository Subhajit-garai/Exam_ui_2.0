import { useEffect, useState } from "react";
import JoinerxamCard from "./JoinerxamCard";
import { sortExamNames } from "@repo/lib/utils/utils";
import { SimplePagination as Pagination } from "@repo/design-system/pagenation";
import { useIsMobile } from "@repo/hooks/isMobile";
import { useApi } from "@/ApiProvider";

export const JoinMock = () => {
  const [Mock, setMock] = useState([]);
  const [entryChange, setEntryChange] = useState<string>("99");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ExamsCount, setExamsCount] = useState<number>(0);

  const EXAMS_PER_PAGE = 12;
  const isMobile = useIsMobile();
  const _ = useApi();

  useEffect(() => {
    (async () => {
      if (!entryChange) {
        let charge = await _.api.exam.getTokensystem("Mock");
        setEntryChange(charge?.data == 0 ? "free" : charge?.data);
      }

      let data = await _.api.exam.fetchExams_by_type(
        "Mock",
        currentPage,
        12,
        "asc"
      );
      if (data.success) {
        let { exams, total } = data.data;
        let sortdData: any = sortExamNames(exams, "@", "name");
        setMock(sortdData);
        setExamsCount(total);
      } else {
        setMock([]);
      }
    })();
  }, [currentPage]);

  return (
    <>
      <div className="today flex gap-4 flex-wrap justify-between flex-col mb-20 md:mb-0">
        <div className="exams flex gap-2 justify-center flex-wrap">
          {Mock.map((exam: any) => {
            if (exam.examtype == "Mock") {
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
              //totalPages={Math.max(1,Math.ceil(ExamsCount / EXAMS_PER_PAGE))}
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
