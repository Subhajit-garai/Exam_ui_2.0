import { Card } from "@repo/design-system/card";
import { Subscription } from "@repo/design-system/OwnCurrency";
import { useAppSelector } from "@repo/store/hook";

import { Avatar_one as Avatar } from "@repo/design-system/avatar";

const Profile = () => {
  let { status } = useAppSelector((state) => state.user);

  return (
    <>
      <div className=" relative ">
        <UserInfoCard />
        <Subscription
          Subscription={status.toUpperCase()}
          className={"absolute top-0 right-0"}
        />
      </div>
    </>
  );
};

export const UserInfoCard = () => {
  let { name, email } = useAppSelector((state) => state.user);
  return (
    <Card className="border-red-500 border">
      <div className="name_avatar flex gap-4">
        <Avatar url="/assets/logo/exambuddys-log1.png" />
        <div className="info flex flex-col gap-1 ">
          <p className="text-lg  text-pretty">{name}</p>
          <p className="text-sm text-gray-500 pl-2"> - {email }</p>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
