import { SocialLinks } from "./SocialLinks";
import { AcademicProfile } from "./academic-profile";
import { PerformanceStats } from "./performance-stats";
import { SubscriptionDetails } from "./subscription-details";
import { Achievements } from "./Achievements";
import { ReferEarnCard } from "./ReferEarnCard";
import { UserInfoCard } from "./userinfo-card";


const Profile = () => {
  return (
    <div className="flex flex-col gap-6 p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: User Info & Socials */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <UserInfoCard />
          <SocialLinks />
          <SubscriptionDetails />
          <ReferEarnCard />
        </div>

        {/* Right Column: Academic & Performance */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <AcademicProfile />
          <PerformanceStats />
          <Achievements />
          {/* <ActivityHistory /> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
