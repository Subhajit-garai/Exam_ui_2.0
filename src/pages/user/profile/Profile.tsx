import { SocialLinks } from "./SocialLinks";
import { AcademicProfile } from "./academic-profile";
import { PerformanceStats } from "./performance-stats";
import { SubscriptionDetails } from "./subscription-details";
import { Achievements } from "./Achievements";
// import { ReferEarnCard } from "./ReferEarnCard";
import { UserInfoCard } from "./userinfo-card";

import { ActivityHeatmap } from "./ActivityHeatmap";
import { TopicProgressCard } from "./TopicProgressCard";

const Profile = () => {
  return (
    <div className="flex flex-col gap-6 p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: User Info & Socials */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <UserInfoCard />
          <SocialLinks />
          <SubscriptionDetails />
          <TopicProgressCard />
          {/* <ReferEarnCard /> */}
        </div>

        {/* Right Column: Academic & Performance */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="flex flex-col lg:flex-row gap-6">
            <AcademicProfile />
            <PerformanceStats />
          </div>
          <ActivityHeatmap />
          <Achievements />

        </div>
      </div>
    </div>
  );
};

export default Profile;
