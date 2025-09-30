import React, { useState } from "react";
import { SimpleDatepicker } from "@repo/design-system/datepicker";
import { Button } from "@repo/ui/button";
import { SelectionInput } from "@repo/design-system/inputs";
import { useApi } from "@/ApiProvider";
export const ExamTypes = ["Exam", "Contest","Dpp" , "Mock", "PYQ"];

export const HeaderCompForSelectExam = ({ setexams }:{setexams:React.Dispatch<React.SetStateAction<any>>}) => {
  const [startDate, setstartDate] = useState<Date | undefined>(new Date());
  const [endDate, setendDate] = useState<Date | undefined>(new Date());
  const [ExamType, setExamType] = useState("Exam");
  const _ = useApi()

  const handleGetExam = async () => {
    if(!startDate || !endDate) return
    let data = await _.api.exam.getExamFilterByTime(
      startDate.toISOString(),
      endDate.toISOString(),
      ExamType
    );

    setexams(data.data.exams);
  };
  

  return (
    <>
      <div className=" w-full flex flex-col overflow-y-auto scrollbar-hide  md:mt-0 lg:flex-row gap-4 md:items-center justify-around">
        <div className="flex  flex-col  gap-2 ">
          <p className="text-sm">Select Exam Time ( end - start {'>'} 1 day) </p>
          <div className="flex flex-col  lg:flex-row gap-2">
            <SimpleDatepicker lable="select " date={startDate} setDate={setstartDate } />
            <p>to</p>
            <SimpleDatepicker lable="select " date={endDate} setDate={setendDate} />
          </div>
        </div>

        <SelectionInput
          options={[{
            id: "1",
            inputId: "input-exam",
            placeholder: "Select exam type",
            required: true,
            options: ExamTypes,
            name: "ExamTypes",
          }]}
          handleInputefn={(e)=>{setExamType(e.target.value)}}
          value={ExamType}
        />
        <Button className="h-fit" onClick={handleGetExam}>
          Apply
        </Button>
      </div>
    </>
  );
};
