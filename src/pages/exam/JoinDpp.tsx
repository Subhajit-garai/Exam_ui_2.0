import { useEffect, useState } from "react";
import useExamTimetablehook from "@repo/hooks/examTime";
import { Tabs } from "@repo/design-system/tabs/Tabs";
import { useApi } from "@/ApiProvider";
import { LoaderFive } from "@repo/design-system/loader/loader";
import { ExamDisplay } from "./components/testDisplay";

const JoinExam = () => {

  const imageurl = "/assets/cardbg/background1.jpg"
  const [Test, setTest] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TestsCount, setTestsCount] = useState<number>(0);

  const _ = useApi();

  let { todaysExam, tomorrowsExam, upcomingExam, completedExam } = useExamTimetablehook(Test, "Dpp");
  const [loading, setLoading] = useState(true);

  const fetchTests = async () => {
    setLoading(true);




    let data = await _.api.exam.fetchExams_by_type(
      "Dpp",
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
      title: "Live",
      value: "Live",
      content: (
        <div
          key={`live-${TestsCount}`}
          className="w-full overflow-hidden relative h-full rounded-xl p-10  font-bold  bg-[var(--card)] text-[var(--text-primary)]"
        >
          <p>Live Dpp</p>

          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <ExamDisplay
              Data={todaysExam}
              imageurl={imageurl}
              type={"Dpp"}
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
          className="w-full overflow-hidden relative h-full rounded-xl p-10 font-bold text-[var(--text-primary)] bg-[var(--card)]"
        >
          <p>Upcoming Dpp</p>

          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <ExamDisplay
              Data={[...tomorrowsExam, ...upcomingExam]}
              imageurl={imageurl}
              type={"Dpp"}
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
        <div className="w-full overflow-hidden relative h-full rounded-xl p-10 font-bold text-[var(--text-primary)] bg-[var(--card)]">
          <p>Completed Dpp</p>
          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <ExamDisplay
              Data={completedExam}
              imageurl={imageurl}
              type={"Dpp"}
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

export default JoinExam;

