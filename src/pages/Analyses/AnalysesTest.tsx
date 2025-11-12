import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/design-system/card"; // import { HeaderCompForSelectExam } from "../common/HeaderCompForSelectExam";
import StatCard from "../common/StatCard";
import { motion } from "motion/react";
import { Ban, ChartLine, Check, Trophy, Users, Zap } from "lucide-react";
import WeaknessSegmentationOfexam from "../metrix/WeaknessSegmentationOfexam";
import { DisplayExamQuestionSAnsMapping } from "../common/DisplayExamQuestionSAnsMappingCard";
import { useIsMobile } from "@repo/hooks/isMobile";
import { toast } from "react-toastify";
import { ToastConfig } from "@repo/lib/utils/utils";

import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";
import ExamAttemptQuestionChart from "../metrix/ExamAttemptQuestionChart";
import LeaderBoard from "../metrix/LeaderBoard";
import { DialogBox, ModelCont } from "@/design-system";
import { ExamSelection } from "../common/ExamSelection";
import type { exam_type, UserAnsFormat_type } from "./types";
import { cn } from "@/lib/utils";

export const AnalysesTest = () => {
  const _ = useApi();
  let { Exams, lastexam } = useAppSelector((state) => state.exam);
  const [openModal, setOpenModal] = useState(false);
  const [examid, setexamid] = useState<string | null>(null);
  const [exams, setexams] = useState<exam_type[]>([]);
  const [QuestionAns, setQuestionAns] = useState<UserAnsFormat_type[]>([]);
  const [currentexams, setcurrentexams] = useState<exam_type | null>(null);
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
  const dispatch = useAppDispatch();
  let ismobile = useIsMobile();

  let iconSize = ismobile ? 20 : 25;

  const fetchExamAnsMappingData = async () => {
    if (examid) {
      let UserAnsset = await _.api.exam.getUserAnsSet({ examid });

      if (!UserAnsset.success) {
        return toast.info(
          "Please ensure that you submitted the exam.",
          ToastConfig()
        );
      }
      setQuestionAns(UserAnsset.data);
    }
  };

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
    <div className="flex-1 relative md:h-160  mb-10">
      <div className="flex items-center justify-center"></div>

      <div className=" mx-auto py-2 px-1 md:py-4 md:px-4 lg:px-8">
        <div className=" bg-s2 w-full  p-2 rounded-md md:p-6">
          {/* header */}
          <div className="flex gap-2 w-full items-center justify-between">
            <p
              className={cn(
                " text-primary",
                ismobile ? "text-[10px]" : "text-sm"
              )}
            >
              ID:{currentexams?.display_id}{" "}
            </p>
            <p
              className={cn(
                " text-primary",
                ismobile ? "text-[10px]" : "text-sm"
              )}
            >
              TIME:{" "}
              {currentexams
                ? new Date(currentexams.date).toLocaleDateString()
                : "N/A"}{" "}
              - {currentexams?.starttime}
            </p>

            <div className={`btn flex gap-1 md:gap-8 `}>
              <DialogBox TriggerBtnText="Exam" Title="select exam">
                <div className="">
                  <ExamSelection
                    exams={exams}
                    setcurrentexams={setcurrentexams}
                    setexamid={setexamid}
                    // modelClose={setOpenModal}
                  />
                </div>
              </DialogBox>

              <Button
                size={ismobile ? "sm" : "default"}
                className=" "
                color="blue"
                onClick={fetchExamAnsMappingData}
              >
                {ismobile ? "ans" : " Generate Ans "}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <main className="md:max-w-7xl mx-auto py-2 px-1 md:py-4 md:px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-2 md:gap-8 ">
          {examid && <WeaknessSegmentationOfexam examid={examid} />}

          {examid && <ExamAttemptQuestionChart examid={examid ?? ""} />}
          {examid && <LeaderBoard examid={examid ?? ""} initoffset={0} />}

          <div className="data w-full">
            <motion.div
              className="grid gap-2 md:gap-7 grid-cols-2 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StatCard
                name="Your Score"
                icon={Zap}
                value={examsMetadata?.score / 100} // for floting value
                color="#6366F1"
                iconSize={iconSize}
              />
              <StatCard
                name="Exam Rank"
                icon={ChartLine}
                value={examsMetadata?.rank}
                color="#F59E0B"
                iconSize={iconSize}
              />
              <StatCard
                name="In Top Ten(10)"
                icon={Users}
                value={examsMetadata?.inTop10}
                color="#8B5CF6"
                iconSize={iconSize}
              />
              <StatCard
                name="Total Right"
                icon={Check}
                value={examsMetadata?.rignt}
                color="#10B981"
                iconSize={iconSize}
              />
              <StatCard
                name="Total Wrong"
                icon={Ban}
                value={examsMetadata?.wrong}
                color="#EC4899"
                iconSize={iconSize}
              />
              <StatCard
                name="Top Score"
                icon={Trophy}
                value={examsMetadata?.topperScore / 100}
                color="#F59E0B"
                iconSize={iconSize}
              />
            </motion.div>
          </div>
        </div>
      </main>

      <div className="md:max-w-7xl  md:max-h-7xl mx-auto lg:px-8 mb-10 ">
        <Card>
          {Object.keys(QuestionAns).length > 0 ? (
            <DisplayExamQuestionSAnsMapping questionMappedSet={QuestionAns} />
          ) : (
            <p>Make sure you generate your answer set. </p>
          )}
        </Card>
      </div>
    </div>
  );
};
