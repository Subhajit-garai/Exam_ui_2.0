import { useEffect, useMemo, useState, type JSX } from "react";
import { useIsMobile } from "@repo/hooks/isMobile";
import { useApi } from "@/ApiProvider";
import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import { Label } from "@repo/ui/label";
import { DialogBox } from "@/design-system";
import { Tabs } from "@/design-system/tabs/Tabs";
// import { TabManue } from "@repo/design-system/tabs";

interface Option {
  title: string;
  value: string;
  content: JSX.Element;
}

function isCorrectAnswerFn(Ans: any[], userAns: any[]) {
  return (
    Ans.length === userAns.length && Ans.every((ans) => userAns.includes(ans))
  );
}

export const DisplayExamQuestionSAnsMapping = ({
  questionMappedSet,
}: {
  questionMappedSet: any;
}) => {
  const [parts, setparts] = useState<string[]>([]);
  const [options, setoptions] = useState<Option[]>([]);

  const categorizedQuestions = useMemo(() => {
    const mapping: any = {};
    const partKeys = Object.keys(questionMappedSet);

    // Add part-wise
    for (let i = 0; i < partKeys.length; i++) {
      const key = `part${i + 1}`;
      mapping[key] = questionMappedSet[partKeys[i]] || [];
    }

    // Flatten all questions
    const allQuestions = Object.values(questionMappedSet).flat();

    // "All" tab
    mapping["All"] = allQuestions;

    if (!mapping["Unattempted"]) mapping["Unattempted"] = [];

    if (!mapping["Correct"]) mapping["Correct"] = [];
    if (!mapping["InCorrect"]) mapping["InCorrect"] = [];

    //
    allQuestions.map((question: any) => {
      const userAns = question.is_multiple_ans
        ? question.userAnswer?.split(",") ?? []
        : question.userAnswer
        ? [question.userAnswer]
        : [];

      const correctAns = Array.isArray(question.ans)
        ? question.ans
        : typeof question.ans === "string"
        ? question.ans.split(",")
        : [];

      if (!question.userAnswer || question.userAnswer === "0") {
        mapping["Unattempted"].push(question);
      } else {
        isCorrectAnswerFn(correctAns, userAns)
          ? mapping["Correct"].push(question)
          : // console.log("----->", isCorrectAnswerFn(correctAns, userAns) ,"ismultiple -->" ,question.is_multiple_ans," userAns-->",userAns ,"correctAns--->", correctAns),

            mapping["InCorrect"].push(question);
      }
    });

    return mapping;
  }, [questionMappedSet]);

  useEffect(() => {
    let temp = [];
    temp.push("All");

    Object.keys(questionMappedSet).map((_, idx) => {
      let str = `part${idx + 1}`;
      temp.push(str);
    });
    temp.push("Correct");
    temp.push("InCorrect");
    temp.push("Unattempted"); // do not change names
    setparts(temp);
  }, [Object.keys(questionMappedSet).length]);

  useEffect(() => {
    let tempOption = parts.map((part) => {
      return {
        title: part,
        value: part,
        content: (
          <DisplayQuestionSAnsCont QuestionsData={categorizedQuestions[part]} />
        ),
      };
    });
    // here i can use react usememo to memoigation data

    setoptions(tempOption);
  }, [parts]);

  return (
    <>
      <div className="partSwitch flex gap-2">
        <div className="flex-1 md:h-160  relative  mb-20 md:mb-0 ">
          <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
            <Tabs
              tabs={options}
              contentClassName="mt-10"
              activeTabClassName=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

const DisplayQuestionSAnsCont = ({
  QuestionsData,
}: {
  QuestionsData: any[];
}) => {
  return (
    <>
      <div className="  grid grid-cols-1 md:grid-cols-2 gap-4">
        {QuestionsData &&
          Array.isArray(QuestionsData) &&
          QuestionsData.map((question, idx) => {
            return (
              <DisplayQuestionAnsCard
                key={question.id}
                questionid={question.id}
                number={idx + 1}
                title={question.title}
                options={question.options}
                // difficulty={question.difficulty}
                topic={question.topic}
                userAnswer={question.userAnswer}
                part={question.part}
                ans={question.ans}
                ismultiple={question.is_multiple_ans}
              />
            );
          })}
      </div>
    </>
  );
};

export const DisplayQuestionAnsCard = ({
  questionid,
  number,
  title,
  options,
  // difficulty,
  topic,
  userAnswer,
  part,
  ans,
  ismultiple,
}: {
  questionid: string;
  number: number;
  title: string;
  options: string[];
  // difficulty: string;
  topic: string;
  userAnswer: any;
  part: string;
  ans: string[] | string;
  ismultiple: boolean;
}): JSX.Element => {
  // const [openModal, setOpenModal] = useState(false);
  // const [openModalReportError, setOpenModalReportError] = useState(false);

  let ContainerColor = "bg-red-700";
  let ismobile = useIsMobile();

  let currentUserAnswer = ismultiple
    ? userAnswer.split(",")
    : userAnswer
    ? [userAnswer]
    : [];

  const correctAnswerArray = Array.isArray(ans)
    ? ans
    : typeof ans === "string"
    ? ans.split(",")
    : [];

  if (isCorrectAnswerFn(correctAnswerArray, currentUserAnswer)) {
    ContainerColor = "bg-green-700";
  } else {
    if (!userAnswer) console.log("user not attemp this question", number); // **************
    if (isCorrectAnswerFn(currentUserAnswer, ["0"])) {
      //  "0" mean user not attemp that question
      ContainerColor = "bg-slate-700";
    }
  }

  let CorretOptionsTitle = correctAnswerArray.map((idx) => {
    return options[parseInt(idx) - 1];
  });

  return (
    <>
      <div className={`" rounded-md p-4  ${ContainerColor}`} key={questionid}>
        <DialogBox
          TriggerBtnText="open"
          Title="Solution"
          dialogDescription=" Question decription "
        >
          <SolutionDisplayCont
            questionid={questionid}
            ans={CorretOptionsTitle}
            isMultipleAns={ismultiple}
          />
        </DialogBox>
        {/* <ModelCont
          HeaderComp={<SolutionDisplayHeader title={title} />}
          Body={
            <SolutionDisplayCont
              questionid={questionid}
              ans={CorretOptionsTitle}
              isMultipleAns={ismultiple}
            />
          }
          openModal={openModal}
          setOpenModal={setOpenModal}
        /> */}
        {/* <ModelCont
          // HeaderComp={<SolutionDisplayHeader title={title} />}
          Body={
            <div className=" w-full flex justify-center items-center">
              <QuestionIssueCardCreate
                mainDivColor={""}
                questionid={questionid}
                handleCancle={() => {
                  setOpenModalReportError(false);
                }}
              />
            </div>
          }
          openModal={openModalReportError}
          setOpenModal={setOpenModalReportError}
        /> */}

        <div className={`  flex flex-col gap-2 justify-between`}>
          <fieldset className="flex w-full  flex-col">
            <legend className="mb-4 font-semibold  text-pretty">
              {number}) {title}
            </legend>

            <div className="option  min-h-50 flex  flex-col gap-4  pl-8 mb-4">
              {options &&
                options?.map((option, i) => {
                  return (
                    <>
                      <div
                        className="flex items-center rounded-xs gap-2 lg:gap-4"
                        id="checkbox"
                        key={i}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            className="peer appearance-none w-5 h-5 rounded-full border border-gray-400 checked:bg-blue-500 checked:border-blue-500 focus:outline-hidden relative transition duration-200"
                            id={`option${i + 1}`}
                            name={`question${number}`}
                            value={i + 1}
                            // onClick={() => ans(i + 1)}
                            checked={currentUserAnswer.includes(String(i + 1))}

                            // readOnly={true}
                          />
                          <Label
                            htmlFor={`option${i + 1}`}
                            className="text-md "
                          >
                            {option}
                          </Label>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </fieldset>

          <div className="actionBtn flex w-full justify-between">
            <Button
              size={ismobile ? "sm" : "default"}
              color="red"
              onClick={() => {
                // setOpenModalReportError(true);
              }}
            >
              Report Error
            </Button>

            <div className="infoSection  hidden md:flex gap-1">
              <Button color="purple" disabled>
                {part}
              </Button>
              <Button color="purple" disabled>
                {topic}
              </Button>
              <Button color="purple" disabled>
                {ismultiple ? "M" : "S"}
              </Button>
            </div>
            <Button
              size={ismobile ? "sm" : "default"}
              color="blue"
              onClick={() => {}} //setOpenModal(true)
            >
              view Solution
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const SolutionDisplayCont = ({
  questionid,
  ans,
  isMultipleAns,
}: {
  questionid: string;
  ans: any[];
  isMultipleAns: boolean;
}) => {
  const [Solution, setSolution] = useState("");
  // const [Link, setLink] = useState([]);
  const _ = useApi();
  useEffect(() => {
    _.api.question
      .GetQuestionExplanationData({ questionid })
      .then((res: any) => {
        setSolution(res.data.explanation);
        // setLink(res.data.links);
      })
      .catch((err: any) => {
        console.log("error ->", err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="  text-white font-bold text-pretty">
        Answer : - {isMultipleAns ? ans.map((title) => title + " | ") : ans}
      </p>
      <p className="text-sm lg:text-lg  font-medium text-gray-800 text-pretty bg-gray-200 p-4 rounded-lg shadow-md">
        {Solution}
        {Solution === "no explanation added"
          ? "  (--->inform admin to add explanation)"
          : null}
      </p>
    </div>
  );
};
