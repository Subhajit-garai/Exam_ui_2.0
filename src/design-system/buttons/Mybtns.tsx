import { Button } from "@repo/ui/button";

export const ExamJoinBtn = ({
  handleJoinExam,
  isDisabled = false,
}: {
  handleJoinExam: () => void;
  isDisabled: boolean;
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
        <p className=" text-primary">Join Now</p>
      </div>
    </Button>
  );
};
