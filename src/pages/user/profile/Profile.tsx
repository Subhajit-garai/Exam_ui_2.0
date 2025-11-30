import { SocialLinks, type SocialHandle_type, SOCIAL_PLATFORMS } from "./SocialLinks";
import { useState, useEffect } from "react";
import { useApi } from "@/ApiProvider";
import { AcademicProfile } from "./academic-profile";
import { PerformanceStats } from "./performance-stats";
import { SubscriptionDetails } from "./subscription-details";
import { Gamification } from "./gamification-card";
import { UserInfoCard } from "./userinfo-card";
import { useAppDispatch, useAppSelector } from "@/store/hook";


const Profile = () => {
  const { api } = useApi();
  const dispatch = useAppDispatch();
  const { social } = useAppSelector((state) => state.user);
  const [socialHandles, setSocialHandles] = useState<SocialHandle_type[]>([]);

  useEffect(() => {
    if (social) {
      const handles: SocialHandle_type[] = [];

      const createHandle = (platformName: string, value: string): SocialHandle_type => {
        const platform = SOCIAL_PLATFORMS.find(p => p.label === platformName || p.value === platformName);
        return {
          title: platformName,
          value: value,
          Icon: platform ? platform.icon : null,
        };
      };

      // Map social fields to handles
      if (social.telegram) handles.push(createHandle("Telegram", social.telegram));
      if (social.whatsapp) handles.push(createHandle("WhatsApp", social.whatsapp));
      if (social.linkedin) handles.push(createHandle("LinkedIn", social.linkedin));
      if (social.github) handles.push(createHandle("GitHub", social.github));
      if (social.twitter) handles.push(createHandle("Twitter", social.twitter));
      if (social.instagram) handles.push(createHandle("Instagram", social.instagram));
      if (social.facebook) handles.push(createHandle("Facebook", social.facebook));
      if (social.website) handles.push(createHandle("Website", social.website));

      setSocialHandles(handles);
    }
  }, [social]);


  const handleAddSocial = async (newSocial: SocialHandle_type) => {
    const res = await api.socialLinks.addSocialLink(newSocial);
    if (res.success) {
      api.user.fetchuser(dispatch)
    }
  };

  const handleDeleteSocial = async (index: number) => {
    // Placeholder for delete logic
    console.log("Delete social at index:", index);
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: User Info & Socials */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <UserInfoCard />

          <SocialLinks
            SocialHandlesdata={socialHandles}
            onAdd={handleAddSocial}
            onDelete={handleDeleteSocial}
          />

          <Gamification />
          <SubscriptionDetails />
        </div>

        {/* Right Column: Academic & Performance */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <AcademicProfile />
          <PerformanceStats />
          {/* <ActivityHistory /> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
