import { useEffect, useRef, useState } from "react";
import Trashbtn from "../../buttons/Trashbtn";
import Copybtn from "../../buttons/Copybtn";
import { toast } from "react-toastify";
import Gotobtn from "../../buttons/Gotobtn";
import CountBtn from "../../buttons/CountBtn";
import Textinpute from "../../inputs/InputComponents";
import useHandleinpute from "@repo/hooks/useHandleInpute";
import { MyButton } from "../../buttons/Button";
import type { issueTypes } from "@repo/lib/constants/issue.constants";
import type { InputOption } from "@/types";

type issuedata_type = {};

export const QuestionIssueCardCreate = ({
  mainDivColor,
  questionid,
  handleCancle,
  CreateIssue,
  getQuestionIssueResuestCount,
}: {
  mainDivColor: string;
  questionid?: string;
  issueType?: issueTypes;
  handleCancle?: () => void;
  CreateIssue?: (
    data: issuedata_type
  ) => Promise<{ success: boolean; message: string; data?: any }>;
  getQuestionIssueResuestCount?: (
    data: issuedata_type
  ) => Promise<{ success: boolean; message: string; data?: any }>;
}) => {
  const [count, setCount] = useState(0);

  let init: {
    issueType: issueTypes;
    note?: string;
    title?: string;
  } = {
    issueType: "QUESTION",
    note: "",
    title: "",
  };
  let { value, handleInputefn, setValue } = useHandleinpute(init);

  const handleQuestionIssueSubmit = async () => {
    if (!value.issueType || !value.title || !value.note) {
      toast.error("Please fill all fields");
      return;
    }

    let issuedata = {
      type: value.issueType,
      note: value.note,
      sub_type: value.title,
      IssueDetails: {
        id: questionid,
      },
    };

    let res = CreateIssue && (await CreateIssue(issuedata));

    if (!res) return console.log(" error  while creating issue");

    console.log("Submitted Data:", res);
    if (res.success) {
      toast.success("Issue submitted successfully");
    } else {
      toast.error("Failed to submit issue: " + res.message);
    }

    // Reset the form after submission
    setValue(init);
  };

  let issueTypeOptions: InputOption[] = [
    {
      id: "1",
      inputId: "input-issue-type",
      placeholder: "Enter Issue Type",
      required: true,
      disabled: true,
      name: "issueType",
    },
    {
      id: "2",
      inputId: "input-title",
      placeholder: "Enter Issue title",
      required: true,
      name: "title",
    },
    {
      id: "3",
      inputId: "input-note",
      placeholder: "Type your issue note",
      required: true,
      cols: 12,
      name: "note",
    },
  ];

  useEffect(() => {
    if (questionid) {
      let res =
        getQuestionIssueResuestCount &&
        getQuestionIssueResuestCount(questionid).then((res) => {
          setCount(res.data);
        });
      if (!res) return console.log(" error  while creating issue");
    }
  }, []);

  const textRef = useRef<HTMLParagraphElement>(null);

  // const handleCopy = () => {
  //   if (textRef.current) {
  //     const text = textRef.current.innerText;
  //     navigator.clipboard
  //       .writeText(text)
  //       .catch((err) => alert("Failed to copy: " + err));
  //   }
  // };

  return (
    <>
      <div
        className={` p-2  lg:max-w-sm ${mainDivColor || "bg-card"
          } lg:p-4  flex flex-col gap-4 rounded shadow-md  flex-wrap`}
      >
        <div className="flex gap-2 items-center justify-between">
          <p ref={textRef} className=" font-semibold text-sm text-card-foreground">
            {questionid ? questionid : "question id"}
          </p>
          <div className="actions flex">
            <CountBtn count={count} />
            <Copybtn textMessage="Id copyed" />
            <Gotobtn link="/" />
          </div>
        </div>

        <div className="inpute">
          <Textinpute
            value={value}
            handleInputefn={handleInputefn}
            options={issueTypeOptions}
          />
        </div>

        <div className="actionbtn flex gap-2 items-center justify-between mt-3">
          <MyButton
            height="h-10"
            width="w-fit"
            padding="px-4"
            containerClassName="g10"
            onClick={handleCancle}
          >
            Cancle
          </MyButton>

          <MyButton
            height="h-10"
            width="w-fit"
            padding="px-4"
            containerClassName="g10"
            onClick={handleQuestionIssueSubmit}
          >
            Submit
          </MyButton>
        </div>
      </div>
    </>
  );
};

export default QuestionIssueCardCreate;

export const QuestionIssueCardDisplay = ({
  mainDivColor,
  title,
  note,
  data,
}: {
  mainDivColor?: string;
  title: string;
  note: string;
  data?: any; // Optional prop for additional data
  gotoLink?: string;
}) => {
  // const textRef = useRef<HTMLParagraphElement>(null);

  // const handleCopy = () => {
  //   if (textRef.current) {
  //     const text = textRef.current.innerText;
  //     navigator.clipboard
  //       .writeText(text)
  //       .catch((err) => alert("Failed to copy: " + err));
  //   }
  // };

  return (
    <>
      <div
        className={` p-2 lg:max-w-sm ${mainDivColor || "bg-card"
          } lg:p-4  flex flex-col gap-4 rounded shadow-md  flex-wrap`}
      >
        <div className="flex gap-2 items-center justify-between">
          <p className=" font-semibold text-sm">
            id : {data ? data.id : "asbjakkjkascdd"}{" "}
          </p>
          <div className="actions flex">
            <Trashbtn text="Trash" />
            <Copybtn textMessage="Id copyed" />
            <Gotobtn link="/" />
          </div>
        </div>

        <p className=" font-bold text-lg "> {title} </p>

        <p className="note">{note}</p>
      </div>
    </>
  );
};
