import { useEffect, useState } from "react";
import { useAppSelector } from "@repo/store/hook";
import { type answer_format_type} from "@repo/store/slice/examSlice";


export const NumberBox = ({
  fetchQuestionwithNumber,
}: {
  fetchQuestionwithNumber: (num: number) => void;
}) => {
  const [ansState, setansState] = useState<answer_format_type[]>([]);

  let { ansset, CurrentPart } = useAppSelector((state) => state.exam);

  useEffect(() => {
    let State = ansset.parts[CurrentPart];
    setansState(State);
  }, [CurrentPart, ansset]);

  return (
    <>
      {ansState?.map((ele :answer_format_type, i) => {
        return (
          <div
            key={i}
            id={`${CurrentPart}NumberBox${ele}`}
            className={`w-10 h-10 flex justify-center items-center rounded-md  bg-primary-foreground  cursor-pointer  border-2  ${
              ele.isans ? "bg-green-500" : ele.isview ? "bg-red-500" : ""
            } `}
            onClick={() => {
              fetchQuestionwithNumber(i + 1);
            }}
          >
            <p className="text-primary">{i + 1}</p>
          </div>
        );
      })}
    </>
  );
};
