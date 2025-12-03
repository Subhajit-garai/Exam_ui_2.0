import { Card } from "@/design-system";
import { StreakCard } from "@/pages/Activity/components/achievements/StreakCard";
import { MyBadges } from "@/pages/Activity/components/achievements/MyBadges";

export const Achievements = () => {
    return (
        <Card className="p-6 flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Achievements</h3>
            <StreakCard variant="compact" showRefresh={false} />
            <MyBadges />
        </Card>
    );
};

