import { Checkbox } from "@repo/ui/checkbox";
import { Label } from "@repo/ui/label";

import { useEffect, useState } from "react";
import { CodeBlock } from "@repo/design-system/codeblock";
import { useAppSelector } from "@repo/store/hook";
import { cn } from "@repo/lib/utils";

export const QuestionSection = ({
  number,
  title,
  Part,
  options,
  setans,
  extra,
  // formate,
  // topic,
  ismultiple = false,
}: {
  number: number;
  title: string;
  Part: string;
  options: string[];
  setans: React.Dispatch<React.SetStateAction<string[]>>;
  extra: any;
  // formate?: string;
  // topic?: string;
  ismultiple?: boolean | undefined;
}) => {
  let { ansset } = useAppSelector((state) => state.exam);

  let [currentAnswer, setcurrentAnswer] = useState<string[]>([]);

  const ans = (ansid: string) => {
    setcurrentAnswer((prev) => {
      let updatedAnswer: string[] = [];
      if (ismultiple) {
        updatedAnswer = prev.includes(ansid)
          ? prev.filter((item) => item !== ansid)
          : [...prev, ansid];
      } else {
        updatedAnswer.push(ansid);
      }
      setans(updatedAnswer);
      return updatedAnswer;
    });
  };

  useEffect(() => {
    if (ansset.parts && ansset.parts[Part] && ansset.parts[Part][number - 1]) {
      const selected = ansset.parts[Part][number - 1].ans;
      setcurrentAnswer(selected);
      setans(selected);
    }
  }, [number, ansset.parts, Part, setans]);

  return (
    <>
      <div className="md:py-4 md:px-8  ">
        <fieldset className="flex w-full  flex-col gap-2">
          <legend
            className={`mb-2 md:mb-4 md:text-lg font-semibold  text-pretty text-primary`}
          >
            {number}) {title}
          </legend>

          {extra && <CodeBlock codeString={extra} language="cpp" />}

          {/*  option  */}
          <div className="option min-h-56 flex  flex-col gap-4  pl-8">
            {options?.map((option, i) => {
              return (
                <div
                  className="flex items-center rounded-xs gap-2 md:gap-4"
                  key={number + (i + 1)}
                >
                  {ismultiple ? (
                    <>
                      <div
                        className="flex max-w-md flex-col gap-4"
                        id="checkbox"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            className={cn(
                              "peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400  focus:outline-hidden relative transition duration-200",
                              "data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            )}
                            id={`option${i + 1}`}
                            name={`question${number}`}
                            value={i + 1}
                            onClick={() => ans(String(i + 1))}
                            checked={currentAnswer.includes(String(i + 1))}
                            // readOnly={true}
                          />
                          <Label
                            htmlFor={`option${i + 1}`}
                            className="text-md  text-primary"
                          >
                            {option}
                          </Label>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/*  new  */}
                      <Checkbox
                        className={cn(
                          "peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400  focus:outline-hidden relative transition duration-200",
                          "data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        )}
                        id={`option${i + 1}`}
                        name={`question${number}`}
                        value={i + 1}
                        onClick={() => ans(String(i + 1))}
                        checked={currentAnswer.includes(String(i + 1))}
                        // readOnly={true}
                      />
                      <Label htmlFor={`option${i + 1}`} className="text-md text-primary">
                        {option}
                      </Label>{" "}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>
    </>
  );
};
