import { useEffect, useState } from "react";
import { Users, Zap, ChartLine, Check, Ban, Trophy } from "lucide-react";
import { motion } from "motion/react";
import ExamAttemptChart from "./metrix/ExamAttemptQuestionChart";
import LeaderBoard from "./metrix/LeaderBoard";
import { Button } from "@repo/ui/button";
import {  Card } from "@repo/design-system/card";
import { ModelCont } from "@repo/design-system/model";
import WeaknessSegmentationOfexam from "./metrix/WeaknessSegmentationOfexam";
import StatCard from "../common/StatCard";
import { ExamSelection } from "../common/ExamSelection";
import { HeaderCompForSelectExam } from "../common/HeaderCompForSelectExam";
import { useIsMobile } from "@repo/hooks/isMobile";
import { useApi } from "@/ApiProvider";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";

type exam_data_type = {
  starttime: string;
  date: string;
  display_id: string;
};
export const PerformanceTest = () => {
  const _ = useApi();
  const dispatch = useAppDispatch();
  let { Exams, lastexam } = useAppSelector((state) => state.exam);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [examid, setexamid] = useState<string | null>(null);
  const [exams, setexams] = useState<any[]>([]);
  const [currentexams, setcurrentexams] = useState<exam_data_type>({
    starttime: "",
    date: "",
    display_id: "",
  });
  const [examsMetadata, setexamsMetadata] = useState({
    examid: "",
    score: 0,
    rignt: 0,
    wrong: 0,
    attempts: 0,
    rank: 0,
    inTop10: 0,
    topperScore: 0,
  });

  let ismobile = useIsMobile();

  useEffect(() => {
    if (examid) {
      _.api.exam
        .UserMetaDataForAnExam({ examid })
        .then((response) => {
          setexamsMetadata(response.data);
        })
        .catch((error) => {
          console.log("Error in UserMetaDataForAnExam in useEffect", error);
        });
    }
  }, [examid]);

  // useEffect(() => {
  //   setexamid(exams[0]?.id);
  //   setcurrentexams(exams[0]);
  // }, [exams]);

  useEffect(() => {
    if (!Exams) {
      _.api.exam.fetchExams(dispatch);
    }
    setexams(Exams);

    let item;

    if (!lastexam) {
      item = localStorage.getItem("lastexam");
    } else {
      item = lastexam;
    }

    if (item) {
      setexamid(item);
      _.api.exam
        .fetchExamsByid(item)
        .then((response) => {
          if (response.success) {
            setcurrentexams(response.data[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setexamid(exams[0]?.id);
      setcurrentexams(exams[0]);
    }
  }, []);

  return (
    <div className="flex-1 md:h-160 relative  mb-20">
      {/* <ModelCont
        size="4xl"
        HeaderComp={<HeaderCompForSelectExam setexams={setexams} />}
        Body={
          <ExamSelection
            exams={exams}
            setcurrentexams={setcurrentexams}
            setexamid={setexamid}
            modelClose={setOpenModal}
          />
        }
        setOpenModal={setOpenModal}
        openModal={openModal}
      /> */}


      <div className="md:max-w-7xl mx-auto py-2 px-1 md:py-4 md:px-4 lg:px-8">
        <div className=" bg-s2 w-full  p-2 rounded-md md:p-6">
          <div className="flex gap-2 items-center justify-between">
            <p className={ismobile ? "text-[10px]" : "text-sm"}>
              ID:{currentexams?.display_id}{" "}
            </p>
            <p className={ismobile ? "text-[10px]" : "text-sm"}>
              TIME: {new Date(currentexams?.date).toLocaleDateString()} -{" "}
              {currentexams?.starttime}
            </p>

            <div className="btn flex gap-8">

                    {/* <ModelCont/> */}

              {/* <Button
                size={ismobile ? "xs" : "sm"}
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Change Exam
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto py-2 px-1 lg:px-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:mb-10 ">
          <ExamAttemptChart examid={examid ?? ""} />
          <LeaderBoard examid={examid ?? ""} initoffset={0} />
          <WeaknessSegmentationOfexam examid={examid ?? ""} />

          <div className="data grid w-full p-1 ">
            <motion.div
              className=" grid grid-cols-2  gap-5 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StatCard
                name="Your Score"
                icon={Zap}
                value={examsMetadata?.score / 100} // for 277 -> 27.7
                color="#6366F1"
                iconSize={25}
              />
              <StatCard
                name="Exam Rank"
                icon={ChartLine}
                value={examsMetadata?.rank}
                color="#F59E0B"
                iconSize={25}
              />
              <StatCard
                name="In Top Ten(10)"
                icon={Users}
                value={examsMetadata?.inTop10}
                color="#8B5CF6"
                iconSize={25}
              />
              <StatCard
                name="Total Right"
                icon={Check}
                value={examsMetadata?.rignt}
                color="#10B981"
                iconSize={25}
              />
              <StatCard
                name="Total Wrong"
                icon={Ban}
                value={examsMetadata?.wrong}
                color="#EC4899"
                iconSize={25}
              />
              <StatCard
                name="Top Score"
                icon={Trophy}
                value={examsMetadata?.topperScore / 100}
                color="#F59E0B"
                iconSize={25}
              />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

// export const HeaderComp = ({ setexams }) => {
//   const [startDate, setstartDate] = useState(new Date());
//   const [endDate, setendDate] = useState(new Date());

//   const handleGetExam = async () => {
//     let data = await getExamFilterByTime(
//       startDate.toISOString(),
//       endDate.toISOString()
//     );
//     setexams(data.data);
//   };

//   return (
//     <div>
//       <div className="flex gap-4 items-center justify-between">
//         <p>Select Exam </p>
//         <Datepicker value={startDate} onChange={setstartDate} />
//         <p>to</p>
//         <Datepicker value={endDate} onChange={setendDate} />
//         <Button onClick={handleGetExam}>Apply</Button>
//       </div>
//       <div className=""></div>
//     </div>
//   );
// };
