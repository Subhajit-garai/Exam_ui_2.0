import { useEffect, useMemo, useState, type JSX } from "react";
import { useApi } from "@/ApiProvider";
import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import { Label } from "@repo/ui/label";
import { DialogBox, QuestionIssueCardCreate } from "@/design-system";
import { Tabs } from "@/design-system/tabs/Tabs";
import type { UserAnsFormat_type } from "../Analyses/types";
import { LoaderFive } from "@/design-system/loader/loader";
// import { TabManue } from "@repo/design-system/tabs";

interface Option {
  title: string;
  value: string;
  content: JSX.Element;
}

function isCorrectAnswerFn(Ans: any[], userAns: any[], map: number[]) {
  let ans =
    Ans.length === userAns.length &&
    userAns.every((userans) => {
      let selectedAns = map[parseInt(userans) - 1];
      return Ans.includes(String(selectedAns));
    });
  return ans;
}

export const DisplayExamQuestionSAnsMapping = ({
  questionMappedSet,
}: {
  questionMappedSet: UserAnsFormat_type[];
}) => {
  const [totalParts, settotalParts] = useState<string[]>([]);
  const [parts, setparts] = useState<string[]>([]);
  const [options, setoptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  const categorizedQuestions = useMemo(() => {
    const mapping: any = {};
    const totalParts_data: Set<string> = new Set();

    questionMappedSet.map((questionAns) => {
      if (!mapping[questionAns.part]) mapping[questionAns.part] = [];

      mapping[questionAns.part].push(questionAns);
      totalParts_data.add(questionAns.part);
    });

    settotalParts([...totalParts_data]);

    // Flatten all questions
    const allQuestions = questionMappedSet;
    // "All" tab
    mapping["All"] = allQuestions;

    if (!mapping["Unattempted"]) mapping["Unattempted"] = [];
    if (!mapping["Correct"]) mapping["Correct"] = [];
    if (!mapping["InCorrect"]) mapping["InCorrect"] = [];

    allQuestions.map((question) => {
      const userAns = question.selectedOption;

      const correctAns = Array.isArray(question.Question.ans)
        ? question.Question.ans
        : typeof question.Question.ans === "string"
        ? question.Question.ans
        : [];

      if (
        !question.selectedOption ||
        question.selectedOption[0] === "0" ||
        question.selectedOption[0] === "-1"
      ) {
        mapping["Unattempted"].push(question);
      } else {
        isCorrectAnswerFn(correctAns, userAns, question.shuffleMap)
          ? mapping["Correct"].push(question)
          : // console.log("----->", isCorrectAnswerFn(correctAns, userAns) ,"ismultiple -->" ,question.is_multiple_ans," userAns-->",userAns ,"correctAns--->", correctAns),
            mapping["InCorrect"].push(question);
      }
    });
    return mapping;
  }, [questionMappedSet]);

  useEffect(() => {
    let temp = [];
    setLoading(true);
    temp.push("All");
    totalParts.map((_, idx) => {
      let str = `part${idx + 1}`;
      temp.push(str);
    });
    temp.push("Correct");
    temp.push("InCorrect");
    temp.push("Unattempted"); // do not change names
    setparts(temp);
    setLoading(false);
  }, [questionMappedSet.length]);

  useEffect(() => {
    let tempOption = parts.map((option) => {
      return {
        title: option,
        value: option,
        content: (
          <div
            key={`${option}`}
            className="w-full   relative  rounded-xl  font-bold text-primary bg-card"
          >
            {/* <p>Live Tab</p> */}

            {loading ? (
              <LoaderFive text="Loading..." />
            ) : (
              <DisplayQuestionSAnsCont
                QuestionsData={categorizedQuestions[option]}
              />
            )}
          </div>
        ),
      };
    });

    setoptions(tempOption);
  }, [parts]);

  console.log(categorizedQuestions);

  return (
    <>
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative  flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-4 overflow-auto  no-visible-scrollbar mb-8">
        <Tabs tabs={options} contentClassName="mt-10" activeTabClassName="" />
      </div>
    </>
  );
};

const DisplayQuestionSAnsCont = ({
  QuestionsData,
}: {
  QuestionsData: UserAnsFormat_type[];
}) => {
  return (
    <>
      <div className="  grid grid-cols-1 md:grid-cols-2 gap-4  ">
        {QuestionsData &&
          Array.isArray(QuestionsData) &&
          QuestionsData.map((q, idx) => {
            return <DisplayQuestionAnsCard key={idx} questionAnsData={q} />;
          })}
      </div>
    </>
  );
};

export const DisplayQuestionAnsCard = ({
  questionAnsData,
}: {
  questionAnsData: UserAnsFormat_type;
}): JSX.Element => {
  let { id, title, options, Topic, ans, is_multiple_ans } =
    questionAnsData.Question;

  let userAnswer = questionAnsData.selectedOption;
  let map = questionAnsData.shuffleMap;
  let number = questionAnsData.number;

  let ContainerColor = "bg-red-700";

  let currentUserAnswer = is_multiple_ans
    ? userAnswer
    : Array.isArray(userAnswer)
    ? userAnswer
    : [userAnswer];

  const correctAnswerArray = Array.isArray(ans)
    ? ans
    : typeof ans === "string"
    ? ans
    : [];

  if (isCorrectAnswerFn(correctAnswerArray, currentUserAnswer, map)) {
    ContainerColor = "bg-green-700";
  } else {
    if (!userAnswer) console.log("user not attemp this question", number); // **************
    if (isCorrectAnswerFn(currentUserAnswer, ["0"], map)) {
      //  "0" mean user not attemp that question
      ContainerColor = "bg-slate-700";
    }
  }

  let CorretOptionsTitle = correctAnswerArray.map((idx) => {
    return options[parseInt(idx) - 1];
  });

  return (
    <>
      <div className={`" rounded-md p-4  ${ContainerColor}`} key={id}>
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
            <DialogBox
              TriggerBtnText="Report Error"
              Title="Report Error"
              dialogDescription="  Error decription "
            >
              <div className=" w-full flex justify-center items-center">
                <QuestionIssueCardCreate mainDivColor={""} questionid={id} />
              </div>
            </DialogBox>

            <div className="infoSection  hidden md:flex gap-1">
              <Button color="purple" disabled>
                {questionAnsData.part}
              </Button>
              <Button color="purple" disabled>
                {Topic.shortName}
              </Button>
              <Button color="purple" disabled>
                {is_multiple_ans ? "M" : "S"}
              </Button>
            </div>

            <DialogBox
              TriggerBtnText="view Solution"
              Title="Solution"
              dialogDescription=" Question decription "
            >
              <SolutionDisplayCont
                questionid={id}
                ans={CorretOptionsTitle}
                isMultipleAns={is_multiple_ans}
              />
            </DialogBox>
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
