import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";

export const Avatar_one = ({
  url,
  fallbackText,
}: {
  url: string;
  fallbackText?: string;
}) => {
  return (
    <>
      <Avatar className="mr-2 rounded-lg">
        <AvatarImage className="border" alt="user avater" src={url} />
        {fallbackText && <AvatarFallback>{fallbackText}</AvatarFallback>}
      </Avatar>
    </>
  );
};
