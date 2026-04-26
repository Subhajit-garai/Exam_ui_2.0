import { useEffect, useState } from "react";
import useExamTimetablehook from "@repo/hooks/examTime";
import { Tabs } from "@repo/design-system/tabs/Tabs";
import { useApi } from "@/ApiProvider";
import { LoaderFive } from "@repo/design-system/loader/loader";
import { ExamDisplay } from "./testDisplay";

export const JoinMock = () => {
  const [Test, setTest] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TestsCount, setTestsCount] = useState<number>(0);

  const _ = useApi();

  let { todaysExam, completedExam } = useExamTimetablehook(Test, "Mock");
  const [loading, setLoading] = useState(true);

  const fetchTests = async () => {
    setLoading(true);



    let data = await _.api.exam.fetchExams_by_type(
      "Mock",
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




  const tabs = [

    {
      title: "MOCKs",
      value: "MOCKs",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl  font-bold text-[var(--text-primary)] bg-[var(--card)]">
          <p>MOCKs</p>
          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <ExamDisplay
              Data={completedExam}
              type={"Mock"}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              TestCount={TestsCount}
            />
          )}
        </div>
      ),
    }, {
      title: "Recently Added MOCKs",
      value: "Recently Added MOCKs",
      content: (
        <div
          key={`live-${TestsCount}`}
          className="w-full overflow-hidden relative h-full rounded-xl p-10  font-bold text-[var(--text-primary)] bg-[var(--card)]"
        >
          <p>Recently Added MOCKs</p>

          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <ExamDisplay
              Data={todaysExam}
              type={"Mock"}
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
        <div className="h-[40rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
          <Tabs tabs={tabs} contentClassName="mt-10" activeTabClassName="" />
        </div>
      </div>
    </>
  );
};

