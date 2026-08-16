import { Badge } from "@/pages/activity/components/achievements/Badge";
import { useApi } from "@/ApiProvider";
import { useEffect, useState } from "react";
import { Medal } from "lucide-react";

interface Reward {
  id: string;
  title: string;
  description: string;
  type: string; // e.g., "BADGE"
  icon?: string;
  dateEarned: string;
}

export const MyBadges = () => {
  const _ = useApi();
  const [badges, setBadges] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      try {
        const response = await _.api.activity.getRewards();
        if (response.success) {
          const userBadges = response.data.badges.filter(
            (r: Reward) => r.type === "BADGE" || !r.type,
          );
          setBadges(userBadges);
        }
      } catch (error) {
        console.error("Failed to fetch rewards", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-sm text-muted-foreground py-4">
        Loading badges...
      </div>
    );
  }

  if (badges.length === 0) {
    return (
      <div className="text-center py-4 border border-dashed rounded-lg border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-muted-foreground">No badges earned yet.</p>
        <p className="text-xs text-muted-foreground mt-1">
          Complete challenges to earn badges!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground">My Badges</h4>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <Badge
            key={badge.id}
            variant="secondary"
            className="gap-1 py-1 pl-1 pr-3"
          >
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-1 rounded-full text-yellow-600 dark:text-yellow-400">
              <Medal size={12} />
            </div>
            <span>{badge.title}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
};
