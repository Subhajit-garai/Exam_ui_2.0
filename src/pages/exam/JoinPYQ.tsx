import { useEffect, useState } from "react";
import useExamTimetablehook from "@repo/hooks/examTime";
import { Tabs } from "@repo/design-system/tabs/Tabs";
import { useApi } from "@/ApiProvider";
import { LoaderFive } from "@repo/design-system/loader/loader";
import { ExamDisplay } from "./components/testDisplay";

export const JoinPYQ = () => {
  const [Test, setTest] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TestsCount, setTestsCount] = useState<number>(0);

  const _ = useApi();

  let { todaysExam, tomorrowsExam, upcomingExam, completedExam } = useExamTimetablehook(Test, "PYQ");
  const [loading, setLoading] = useState(true);

  const fetchTests = async () => {
    setLoading(true);




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

  const tabs = [
    {
      title: "Recently Added PYQs",
      value: "Recently Added PYQs",
      content: (
        <div
          key={`Recent-${TestsCount}`}
          className="w-full overflow-hidden relative h-full rounded-xl p-10  font-bold text-[var(--text-primary)] bg-[var(--card)]"
        >
          <p>Recently Added PYQs</p>

          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <ExamDisplay
              Data={[...todaysExam, ...tomorrowsExam, ...upcomingExam]}
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
      title: "Past Year Questions (PYQs)",
      value: "Past Year Questions (PYQs)",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl p-10  font-bold text-[var(--text-primary)] bg-[var(--card)]">
          <p>Past Year Questions (PYQs)</p>
          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <ExamDisplay
              Data={completedExam}
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
        <div className="h-[40rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
          <Tabs tabs={tabs} contentClassName="mt-10" activeTabClassName="" />
        </div>
      </div>
    </>
  );
};



