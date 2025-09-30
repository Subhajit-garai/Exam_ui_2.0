import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import {  Card } from "@repo/design-system/card";// import { HeaderCompForSelectExam } from "../common/HeaderCompForSelectExam";
import StatCard from "../common/StatCard";
import { motion } from "motion/react";
import { Ban, ChartLine, Check, Trophy, Users, Zap } from "lucide-react";
import WeaknessSegmentationOfexam from "../Performance/metrix/WeaknessSegmentationOfexam";
import { DisplayExamQuestionSAnsMapping } from "../common/DisplayExamQuestionSAnsMappingCard";
import { useIsMobile } from "@repo/hooks/isMobile";
import { toast } from "react-toastify";
import { ToastConfig } from "@repo/lib/utils/utils";

// import {
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalTrigger,
// } from "@/components/ui/animated-modal.js";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";

type exam_type = {
  id: string;
  category: string;
  name: string | null;
  date: Date;
  display_id: string | null;
  examname: string;
  examtype: string;
  Visibility: string;
  creationstatus: string;
  starttime: string | null;
  jointime: string | null;
  duration: string;
  ContestRegister: {
    count: number;
  };
  exam_pattern: {
    id: string;
    difficulty: string;
    total_questions: number[];
    syllabus: string;
    format: string;
  };
};

export const AnalysesTest = () => {
  const _ = useApi();
  let { Exams, lastexam } = useAppSelector((state) => state.exam);
  // const [openModal, setOpenModal] = useState(false);
  const [examid, setexamid] = useState<string | null>(null);
  const [exams, setexams] = useState<exam_type[]>([]);
  const [questionMappedSet, setquestionMappedSet] = useState([]);
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
      let questions = await _.api.exam.getExamAnsforAnalisys({ examid });
      questions = questions?.data;
      let UserAnsset = await _.api.exam.getUserAnsSet({ examid });

      if (!UserAnsset.data) {
        return toast.info(
          "Please ensure that you submitted the exam.",
          ToastConfig()
        );
      }
      UserAnsset = UserAnsset?.data?.ans;

      const answerMap = Object.fromEntries(
        UserAnsset.map((obj: any) => {
          const key = Object.keys(obj)[0]; // Extract the question ID
          return [key, obj[key]]; // Store answer as { "id": "answer" }
        })
      );

      const mappedQuestions = questions.map((q: any) => {
        return {
          ...q,
          userAnswer: answerMap[q.id]?.ans || null, // Add user answer if exists
          part: answerMap[q.id]?.part || null, // Add user answer if exists
        };
      });
      let filtered: any = {};

      mappedQuestions.map((q: any) => {
        if (!filtered[q?.part]) {
          filtered[q.part] = []; // Initialize the array if it doesn't exist
        }
        filtered[q.part].push(q);
      });

      setquestionMappedSet(filtered);
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
      <div className="flex items-center justify-center">
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
      </div>
      <div className=" mx-auto py-2 px-1 md:py-4 md:px-4 lg:px-8">
        <div className=" bg-s2 w-full  p-2 rounded-md md:p-6">
          {/* header */}
          <div className="flex gap-2 w-full items-center justify-between">
            <p className={ismobile ? "text-[10px]" : "text-sm"}>
              ID:{currentexams?.display_id}{" "}
            </p>
            <p className={ismobile ? "text-[10px]" : "text-sm"}>
              TIME:{" "}
              {currentexams
                ? new Date(currentexams.date).toLocaleDateString()
                : "N/A"}{" "}
              - {currentexams?.starttime}
            </p>

            <div className={`btn flex gap-1 md:gap-8 `}>
              {/* <Button
                size={ismobile ? "xs" : "sm"}
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                {ismobile ? "exam" : " Change Exam "}
              </Button> */}

              {/* <div className=" flex items-center justify-center">
                <Modal>
                  <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                      {ismobile ? "exam" : " Change Exam "}
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-black z-20">
                      Click
                    </div>
                  </ModalTrigger>
                  <ModalBody className={` md:min-w-[50%]`}>
                    <ModalContent>
                      <div className="bg-red-700">hi</div>
                    </ModalContent>
                    <ModalFooter className="gap-4">
                      <HeaderCompForSelectExam setexams={setexams} />
                    </ModalFooter>
                  </ModalBody>
                </Modal>
              </div> */}

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
          {Object.keys(questionMappedSet).length > 0 ? (
            <DisplayExamQuestionSAnsMapping
              questionMappedSet={questionMappedSet}
            />
          ) : (
            <p>Make sure you generate your answer set. </p>
          )}
        </Card>
      </div>
    </div>
  );
};
