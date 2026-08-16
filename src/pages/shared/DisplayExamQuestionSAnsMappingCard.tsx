import { useEffect, useMemo, useState, type JSX } from "react";
import { useApi } from "@/ApiProvider";
import { Checkbox } from "@repo/ui/checkbox";
import { Label } from "@repo/ui/label";
import { Badge } from "@repo/ui/badge";
import { cn } from "@repo/lib/utils";
import { QuestionIssueCardCreate } from "@/design-system";
import { Tabs } from "@/design-system/tabs/Tabs";
import type { UserAnsFormat_type } from "@/pages/analyses/types";
import { LoaderFive } from "@/design-system/loader/loader";
import { DialogBox } from "@/design-system/dialog";

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
          : mapping["InCorrect"].push(question);
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

  let status: "correct" | "incorrect" | "unattempted" = "unattempted";
  let statusColor =
    "text-[var(--text-secondary)] bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700";

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
    status = "correct";
    statusColor =
      "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/20 dark:border-emerald-800";
  } else {
    if (!userAnswer) console.log("user not attemp this question", number);
    if (isCorrectAnswerFn(currentUserAnswer, ["0"], map)) {
      status = "unattempted";
      statusColor =
        "text-[var(--text-secondary)] bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700";
    } else {
      status = "incorrect";
      statusColor =
        "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-900/20 dark:border-rose-800";
    }
  }

  let CorretOptionsTitle = correctAnswerArray.map((idx) => {
    return options[parseInt(idx) - 1];
  });

  return (
    <>
      <div
        className={cn(
          "rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 transition-all duration-200 hover:shadow-md bg-white dark:bg-zinc-950",
        )}
        key={id}
      >
        <div className={`  flex flex-col gap-4 justify-between h-full`}>
          <fieldset className="flex w-full  flex-col gap-4">
            <div className="flex justify-between items-start gap-4">
              <legend className="font-semibold text-lg text-[var(--text-primary)] leading-relaxed">
                <span className="inline-block mr-2 text-[var(--text-secondary)]">
                  Q{number}.
                </span>
                {title}
              </legend>
              <Badge
                variant="outline"
                className={cn("capitalize shrink-0", statusColor)}
              >
                {status}
              </Badge>
            </div>

            <div className="option flex flex-col gap-3 pl-2">
              {options &&
                options?.map((option, i) => {
                  const isSelected = currentUserAnswer.includes(String(i + 1));
                  let optionStyles =
                    "border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900";

                  if (isSelected) {
                    if (status === "correct") {
                      optionStyles =
                        "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800";
                    } else if (status === "incorrect") {
                      optionStyles =
                        "bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800";
                    } else {
                      optionStyles =
                        "bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700";
                    }
                  }

                  return (
                    <div
                      className={cn(
                        "flex items-start p-3 rounded-lg border transition-colors duration-200",
                        optionStyles,
                      )}
                      id="checkbox"
                      key={i}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <Checkbox
                          className={cn(
                            "mt-1 peer appearance-none w-5 h-5 rounded-md border transition-all",
                            isSelected && status === "correct"
                              ? "border-emerald-500 checked:bg-emerald-500 checked:border-emerald-500"
                              : isSelected && status === "incorrect"
                                ? "border-rose-500 checked:bg-rose-500 checked:border-rose-500"
                                : "border-zinc-300 dark:border-zinc-600 checked:bg-zinc-600 checked:border-zinc-600",
                          )}
                          id={`option${i + 1}-${id}`}
                          name={`question${number}`}
                          value={i + 1}
                          checked={isSelected}
                        />
                        <Label
                          htmlFor={`option${i + 1}-${id}`}
                          className={cn(
                            "text-base leading-relaxed cursor-pointer select-none w-full",
                            isSelected && status === "correct"
                              ? "text-emerald-700 dark:text-emerald-300 font-medium"
                              : isSelected && status === "incorrect"
                                ? "text-rose-700 dark:text-rose-300 font-medium"
                                : "text-[var(--text-primary)]",
                          )}
                        >
                          {option}
                        </Label>
                      </div>
                    </div>
                  );
                })}
            </div>
          </fieldset>

          <div className="actionBtn flex w-full justify-between items-center pt-4 border-t border-zinc-200 dark:border-zinc-800/50 mt-auto">
            <DialogBox
              TriggerBtnText="Report Error"
              Title="Report Error"
              dialogDescription="  Error decription "
            >
              <div className=" w-full flex justify-center items-center">
                <QuestionIssueCardCreate mainDivColor={""} questionid={id} />
              </div>
            </DialogBox>

            <div className="infoSection hidden md:flex gap-2">
              <Badge
                variant="outline"
                className="text-xs font-medium text-[var(--text-secondary)] border-zinc-200 dark:border-zinc-800"
              >
                {questionAnsData.part}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs font-medium text-[var(--text-secondary)] border-zinc-200 dark:border-zinc-800"
              >
                {Topic.shortName}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs font-medium text-[var(--text-secondary)] border-zinc-200 dark:border-zinc-800"
              >
                {is_multiple_ans ? "Multiple" : "Single"}
              </Badge>
            </div>

            <DialogBox
              TriggerBtnText="View Solution"
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
  const _ = useApi();
  useEffect(() => {
    _.api.question
      .GetQuestionExplanationData({ questionid })
      .then((res: any) => {
        setSolution(res.data.explanation);
      })
      .catch((err: any) => {
        console.log("error ->", err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="  text-foreground font-bold text-pretty">
        Answer : - {isMultipleAns ? ans.map((title) => title + " | ") : ans}
      </p>
      <p className="text-sm lg:text-lg  font-medium text-[var(--text-primary)] text-pretty bg-gray-200 p-4 rounded-lg shadow-md">
        {Solution}
        {Solution === "no explanation added"
          ? "  (--->inform admin to add explanation)"
          : null}
      </p>
    </div>
  );
};
