import { Card, Subscription } from "@/design-system";
import { useAppSelector } from "@/store/hook";
import { Avatar_one as Avatar } from "@repo/design-system/avatar";

export const UserInfoCard = () => {
  let { name, email, status } = useAppSelector((state) => state.user);
  return (
    <Card className="p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 relative overflow-hidden">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex gap-3 sm:gap-4 items-center min-w-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-primary/20 rounded-full overflow-hidden shrink-0">
            <Avatar url="/assets/user/user_96.png" />
          </div>
          <div className="info flex flex-col gap-0.5 min-w-0">
            <p className="text-lg sm:text-xl font-bold text-foreground truncate">{name}</p>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{email}</p>
          </div>
        </div>

        <Subscription
          Subscription={status ? status.toUpperCase() : "FREE"}
          className="shrink-0 scale-90 sm:scale-100 origin-top-right"
        />
      </div>
    </Card>
  );
};