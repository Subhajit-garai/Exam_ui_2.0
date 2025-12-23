import { Card } from "@/design-system/card";
import { Heatmap, type HeatmapData } from "@/design-system/heatmap/Heatmap";
import { useApi } from "@/ApiProvider";
import { useEffect, useMemo, useState } from "react";
import { LoaderFive } from "@repo/design-system/loader/loader";

export const ActivityHeatmap = () => {
    const _ = useApi();
    const [activities, setActivities] = useState<HeatmapData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true);
                // Fetch real heatmap data
                const res = await _.api.activity.getActivityHeatmap();
                if (res.success) {
                    setActivities(res.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch activities", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    const heatmapData: HeatmapData[] = useMemo(() => {
        // Assuming API returns { date: string, count: number, level: number }[] directly as 'activities'
        // If the API returns raw activities list, we still need aggregation. 
        // Guide said: Response: [ { "date": "2023-01-01", "count": 5, "level": 2 }, ... ]
        // So 'activities' state (typed ActivityItem[]) is likely wrong type now.
        // I should update the state type to HeatmapData[] and remove client-side aggregation.

        return activities as unknown as HeatmapData[];
    }, [activities]);

    if (loading) {
        return <div className="flex justify-center items-center h-40"><LoaderFive text="Loading Heatmap..." /></div>;
    }

    return (
        <Card className="p-6 border-zinc-200 dark:border-zinc-800">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Learning Activity</h3>
                <p className="text-sm text-[var(--text-secondary)]">Your daily study momentum</p>
            </div>
            <Heatmap data={heatmapData} className="w-full" />
        </Card>
    );
};
