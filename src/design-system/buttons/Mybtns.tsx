import { Button } from "@repo/ui/button";
import { Currencyicon } from "../OwnCurrency/Currency";

export const ExamJoinBtn = ({
  handleJoinExam,
  entryChange,
  isDisabled = false,
}: {
  handleJoinExam: () => void;
  entryChange: string;
  isDisabled: boolean;
}) => {
  return (
    <Button
      size="sm"
      color="blue"
      onClick={handleJoinExam}
      disabled={isDisabled}
    >
      <div className="flex gap-1 items-center">
        <div className="bg-white px-1 rounded-md flex items-center gap-1">
          <p className="text-gray-700">{entryChange}</p>
          <Currencyicon size={17} />
        </div>
        Join Now
      </div>
    </Button>
  );
};
