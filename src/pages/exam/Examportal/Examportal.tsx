// import {  Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { Button } from "@repo/ui/button";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setansset,
  setanssetExamId,
  updateAns,
  updateisAns,
  updateisView,
  setCurrentPart,
} from "@repo/store/slice/examSlice";
import { NumberBox } from "./NumberBox";
import { QuestionSection } from "./QuestionSection";
import { InfoCont } from "./IconCont";
import { useIsMobile } from "@repo/hooks/isMobile";
// import { Info } from "lucide-react";
import { toast } from "react-toastify";
import ExamSecurity from "./ExamSecurity";
import { useApi } from "@/ApiProvider";
import { useAppSelector } from "@repo/store/hook";

type question_extra_type = {
  [key: string]: string;
};

export type exam_question_format_type = {
  number: number;
  part: string;
  question: {
    id: string;
    title: string;
    options: string[];
    extra: question_extra_type;
    format: string;
    is_multiple_ans: boolean;
  } | null;
};

type AnsSet_data_type = { isview: number; isans: number; ans: string[] };
type AnsSet_type = {
  [key: string]: AnsSet_data_type[];
};

const Examportal = () => {
  const _ = useApi();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  //   console.log(searchParams.get("id"));

  let initialvalue: {
    id: string;
    title: string;
    options: string[];
    is_multiple_ans?: boolean | undefined;
    extra?: question_extra_type;
    format: string;
  } = {
    id: "111",
    title: "what is 2 + 2",
    options: ["4", "2", "11", "0"],
    format: "Text",
  };

  const [Question, setQuestion] = useState(initialvalue);
  const [Ans, setAns] = useState(["0"]);
  const [Examid, setExamid] = useState(searchParams.get("id"));
  const [Number, setNumber] = useState(1);
  // const [MobileViewDrawer, setMobileViewDrawer] = useState(false);
  // const [MobileViewDrawer2, setMobileViewDrawer2] = useState(false);
  // const [Part, setPart] = useState("part1");

  let { ansset, total_questions, CurrentPart } = useAppSelector(
    (state) => state.exam
  );

  let ismobile = useIsMobile();

  const configureAnsSet = () => {
    if (!(searchParams.get("id") == ansset.examid)) {
      console.log("no exam");
      let newarr: AnsSet_data_type[] = [];
      let newSet: AnsSet_type = {};
      total_questions.map((question, index) => {
        for (let i = 1; i <= question; i++) {
          newarr.push({ isview: 0, isans: 0, ans: [] });
        }
        newSet[`part${index + 1}`] = newarr;
        newarr = [];
      });

      dispatch(setanssetExamId(searchParams.get("id")));
      dispatch(setansset(newSet));

      dispatch(setCurrentPart("part1"));
      return;
    }
    setAns(ansset.parts[CurrentPart][0].ans);
  };

  const NextQuestion = () => {
    if (!Examid) return;

    fetchExamQuestionAndset({
      examid: Examid,
      type: "next",
      number: Number,
      part: CurrentPart,
    });
    updateansBoxisView();
  };

  const PreQuestion = () => {
    if (!Examid) return;
    fetchExamQuestionAndset({
      examid: Examid,
      type: "pre",
      number: Number,
      part: CurrentPart,
    });

    updateansBoxisView();
  };

  const ClearAns = () => {
    setAns([]);
    updateansBoxisAns(0);
  };
  const SaveAndNextQuestion = async () => {
    if (Ans.length > 0 && Ans[0] == "0") {
      toast.error("Please select an answer");
      return;
    }
    await saveAns();
    NextQuestion();
  };

  const saveAns = async () => {
    if (Ans.length < 1 || Ans[0] == "0") {
      toast.error("Please select an answer");
      return;
    }

    // console.log("Ans ---->",Ans);
    if (!Examid) return;

    _.api.exam.saveExamAns({
      examid: Examid,
      number: Number,
      part: CurrentPart,
      ans: Ans,
      ismultiple: Question.is_multiple_ans ?? false,
    });
    updateansBoxisAns(1);
    updateansBoxAns(Ans);
    setAns([]);
  };

  const updateansBoxisView = (isviewflag?: number) => {
    isviewflag = isviewflag || 1;
    let number = Number - 1;
    dispatch(
      updateisView({
        part: CurrentPart,
        number: number,
        isviewflag: isviewflag,
      })
    );
  };

  const updateansBoxisAns = (data?: number) => {
    // check this logic
    let number = Number - 1;
    if (!data) {
      number = Number - 1;
    }
    dispatch(updateisAns({ part: CurrentPart, number: number, data: data }));
  };
  const updateansBoxAns = (data?: string[]) => {
    let number = Number - 1;
    dispatch(updateAns({ part: CurrentPart, number: number, data: data }));
  };

  const fetchQuestionwithNumber = async (number: number) => {
    if (!Examid) return;
    fetchExamQuestionAndset({
      examid: Examid,
      type: "question",
      part: CurrentPart,
      number: number,
    });

    updateansBoxisView();
  };

  async function fetchExamQuestionAndset({
    examid,
    type,
    part,
    number,
  }: {
    examid: string;
    type: string;
    part: string;
    number?: number;
  }) {
    let res = await _.api.exam.examQestionfetch({
      examid,
      type,
      number: number ? number : Number,
      part,
    });
    let data: exam_question_format_type = res.data;
    let num = res.data.number;
    let question = data?.question ? data?.question : initialvalue;

    setNumber(num);
    setQuestion(question);
  }

  useEffect(() => {
    console.log("exam portal loading.....");
    let examid = searchParams.get("id");

    if (!examid) return console.log("exam id not found ..>");

    setExamid(examid);
    if (!ansset) {
      configureAnsSet();
      console.log("ansset loading.....");
    } else {
      if (ansset.examid !== Examid) {
        configureAnsSet();
        console.log(" fresh ansset loading.....");
      }
    }

    fetchExamQuestionAndset({
      examid: examid,
      type: "question",
      number: 1,
      part: CurrentPart,
    });
  }, [CurrentPart]);

  return (
    <>
      <div className="  flex flex-col mt-5 lg:grid  md:grid-cols-12 gap-4  md:gap-8 w-full  overflow-auto md:p-4 mb-20">
        <ExamSecurity />

        <div className="left col-span-1 hidden md:block rounded-xs md:col-span-2 ">
          <div className="box flex gap-2 flex-wrap justify-between p-1   md:max-h-120 overflow-auto ">
            <NumberBox fetchQuestionwithNumber={fetchQuestionwithNumber} />
          </div>
        </div>

        <div className="mobileViewDrawerBtn md:hidden flex items-center justify-between gap-2 px-2">
          <Button
            onClick={() => {
              // setMobileViewDrawer(true);
            }}
          >
            Ans info
          </Button>
          <Button
            color="blue"
            onClick={() => {
              // setMobileViewDrawer2(true);
            }}
          >
            Exam info
          </Button>
        </div>

        <div className="main min-h-[25rem] justify-between  md:col-span-8  p-2 md:p-4 rounded-sm flex flex-col gap-2 md:gap-4 md:pt-8 ">
          <div className="question overflow-auto scrollbar-hide ">
            <QuestionSection
              number={Number}
              title={Question?.title}
              options={Question?.options}
              Part={CurrentPart}
              setans={setAns}
              ismultiple={Question?.is_multiple_ans}
              extra={Question.extra ? Question.extra[Question?.format] : null}
              // formate={Question.formate}
              // topic={Question.topic}
            />
          </div>

          <div className="action flex gap-3 md:gap-4 md:mt-4 items-center justify-center">
            <Button
              size={ismobile ? "sm" : "default"}
              color="red"
              onClick={() => PreQuestion()}
            >
              previous
            </Button>
            <Button
              size={ismobile ? "sm" : "default"}
              color="green"
              onClick={() => NextQuestion()}
            >
              next
            </Button>
            <Button
              size={ismobile ? "sm" : "default"}
              color="green"
              onClick={() => SaveAndNextQuestion()}
            >
              save & next
            </Button>
            <Button
              size={ismobile ? "sm" : "default"}
              color="red"
              onClick={() => ClearAns()}
            >
              clear ans
            </Button>
          </div>
        </div>

        <div className="info md:col-span-2   hidden md:flex  md:flex-col gap-2 p-2 shadow-md">
          <InfoCont />
        </div>
      </div>

      <div className="drawer md:hidden">
        {/* <Drawer
          className="z-299"
          open={MobileViewDrawer}
          onClose={() => {
            setMobileViewDrawer(false);
          }}
        >
          <DrawerTrigger>
            <h1>hi</h1>
          </DrawerTrigger>
          <DrawerHeader title="Ans info"  />

          <DrawerItems>
            <div className="left col-span-1  md:hidden rounded-xs md:col-span-2 ">
              <div className="box flex gap-2 flex-wrap justify-between">
                <NumberBox
                  fetchQuestionwithNumber={fetchQuestionwithNumber}
                  // closeFn={() => {
                  //   setMobileViewDrawer(false);
                  // }}
                />
              </div>
            </div>
          </DrawerItems>
        </Drawer> */}

      </div>
      <div className=" drawer md:hidden">
        {/* <Drawer
          position="right"
          className="z-299"
          open={MobileViewDrawer2}
          onClose={() => {
            setMobileViewDrawer2(false);
          }}
        >
          <DrawerHeader title="Exam info" titleIcon={Info} />

          <DrawerItems>
            <div className="info md:col-span-2 h-full flex  items-center justify-center md:hidden gap-2 p-2 ">
              <InfoCont
              // closeFn={() => {
              //   setMobileViewDrawer2(false);
              // }}
              />
            </div>
          </DrawerItems>
        </Drawer> */}
      </div>
    </>
  );
};

export default Examportal;
