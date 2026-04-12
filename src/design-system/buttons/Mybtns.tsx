import { Button } from "@repo/ui/button";
import { Currencyicon } from "../OwnCurrency/Currency";

export const ExamJoinBtn = ({
  handleJoinExam,
  entryChange,
  isDisabled = false,
  access_type,
}: {
  handleJoinExam: () => void;
  entryChange: string;
  isDisabled: boolean;
  access_type: string;
}) => {
  return (
    <Button
      size="sm"
      color="blue"
      onClick={handleJoinExam}
      disabled={isDisabled}
      className=" bg-primary-foreground"
    >
      <div className="flex gap-1 items-center">
        <div className="bg-background px-1 rounded-md flex items-center gap-1">
          <p className="text-primary ">{access_type == "Free" ? "Free" : entryChange}</p>
          <Currencyicon size={17} />
        </div>
        <p className=" text-primary">Join Now</p>
      </div>
    </Button>
  );
};
