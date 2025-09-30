import { Button } from "@repo/ui/button";


import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";
import {
  setanssetInit,
  setCurrentPart,
  type parts_type,
} from "@repo/store/slice/examSlice";
import { ExamEndTime } from "../Timer";
import { ToastConfig } from "@repo/lib";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const InfoCont = () => {
  const _ = useApi();
  let { ansset } = useAppSelector((state) => state.exam);
  const [TotalPart, setTotalPart] = useState<string[] | []>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let Examid = ansset?.examid;

  useEffect(() => {
    let keys = Object.keys(ansset?.parts);
    setTotalPart(keys);
  }, [Examid]);

  const FinalAnssubmit = async () => {
    _.api.exam
      .finalSubmitExam({ examid: Examid })
      .then((response) => {
        if (response.success) {
          console.log("test submission successful");
          toast.success(response.message, ToastConfig());
          dispatch(setanssetInit({}));
          navigate("/test/submitsuccess");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, ToastConfig());
      });
  };

  const TogglePart = (value: parts_type) => {
    dispatch(setCurrentPart(value));
  };
  return (
    <div className="flex flex-col gap-2">
      <Button
        color="gray"
        size="lg"
        className="rounded-lg  shadow-none  items-center  border-b-4  border-e-4"
      >
        <h3 className=" text-[22px]">
          <ExamEndTime
            Examid={Examid}
            className={" "}
            autosubmit={FinalAnssubmit}
          />
        </h3>
      </Button>
      <Button color="blue" onClick={FinalAnssubmit}>
        SUBMIT EXAM
      </Button>
      {/* HR */}
      <div className=" border-b"></div> 
      <p className="text-center">Switch to</p>
      <div className="flex flex-col gap-4">
        {TotalPart &&
          TotalPart?.map((part) => (
            <Button
              key={part}
              onClick={() => {
                TogglePart(part as parts_type);
              }}
            >
              {part}
            </Button>
          ))}
      </div>
    </div>
  );
};
