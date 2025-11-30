import { Card, Subscription } from "@/design-system";
import { useAppSelector } from "@/store/hook";
import { Avatar_one as Avatar } from "@repo/design-system/avatar";

export const UserInfoCard = () => {
  let { name, email, status } = useAppSelector((state) => state.user);
  return (
    <Card className="p-4 flex flex-col gap-4 relative overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 border-2 border-primary/20 rounded-full overflow-hidden">
            <Avatar url="/assets/user/user_96.png" />
          </div>
          <div className="info flex flex-col gap-0.5">
            <p className="text-xl font-bold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <Subscription
          Subscription={status ? status.toUpperCase() : "FREE"}
          className="shrink-0"
        />
      </div>
    </Card>
  );
};