import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";


import { Users } from "lucide-react";
import dayjs from "dayjs";

const ExamInfoDisplayCard = ({
  imageurl,
  Title,
  particepents,
  // contestid,
  timeStamp,
  // startTime,
  // joinTime,
  displayId,
  handleSeclect,
}: {
  imageurl: string;
  Title: string;
  particepents: string;
  contestid: string;
  timeStamp: string;
  startTime: string;
  joinTime: string;
  displayId: string;
  handleSeclect: any;
}) => {
  return (
    <div className=" flex flex-col gap-8">
      <div className="w-60 relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={imageurl} alt="" />

        <div className="info flex gap-2  absolute w-full top-0 left-0 p-4"></div>
        <div className="info flex gap-2 w-full justify-between absolute  bottom-12 right-0 p-4">
          <Badge>
            <h5 className=" font-semibold  text-md z-30 left-0 mr-1 ">
              {displayId ? displayId : "#3421"}
            </h5>
          </Badge>
          <Badge>
            <span className="flex gap-1">
              <Users size={15} />
              <p className="">{particepents}</p>
            </span>
          </Badge>
        </div>
        <div className=" flex font-semibold gap-2 justify-between  items-center ">
          <div className="p-2">
            <p className=" text-foreground">{Title.slice(0, 20)}</p>
            <p className="text-sm text-[var(--text-secondary)]">
              {dayjs(timeStamp).format("DD-MM-YYYY")}
            </p>
          </div>
          <div className="p-1">
            <Button size="sm" color="blue" onClick={handleSeclect}>
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInfoDisplayCard;
