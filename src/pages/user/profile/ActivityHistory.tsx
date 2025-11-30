import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Activity, Calendar, CheckCircle2, FileText, Trophy, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useApi } from "@/ApiProvider";
import { LoaderFive } from "@repo/design-system/loader/loader";

interface ActivityItem {
    id: string;
    title: string;
    description: string;
    date: string;
    status: string;
    type: string;
    score: string;
}

const ActivityIcon = ({ type, status }: { type: string; status: string }) => {
    if (type === "STREAK") return <Trophy className="text-orange-500" size={20} />;
    if (type === "NOTE") return <FileText className="text-blue-500" size={20} />;
    if (status === "Completed") return <CheckCircle2 className="text-emerald-500" size={20} />;
    if (status === "Failed") return <XCircle className="text-rose-500" size={20} />;
    return <Activity className="text-zinc-500" size={20} />;
};

export const ActivityHistory = () => {
    const _ = useApi();
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true);
                const res = await _.api.activity.getActivities();
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

    if (loading) {
        return <div className="flex justify-center items-center h-40"><LoaderFive text="Loading Activity..." /></div>;
    }

    return (
        <Card className="p-6 border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Activity History</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Your recent learning milestones.</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <Calendar size={14} />
                    Filter
                </Button>
            </div>
            <div className="flex flex-col gap-4">
                {activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex gap-4 items-start border-b border-zinc-100 dark:border-zinc-800 pb-4 last:border-0 last:pb-0"
                        >
                            <div className={cn(
                                "p-2 rounded-full shrink-0",
                                activity.type === "STREAK" ? "bg-orange-100 dark:bg-orange-900/20" :
                                    activity.type === "NOTE" ? "bg-blue-100 dark:bg-blue-900/20" :
                                        activity.status === "Completed" ? "bg-emerald-100 dark:bg-emerald-900/20" :
                                            "bg-rose-100 dark:bg-rose-900/20"
                            )}>
                                <ActivityIcon type={activity.type} status={activity.status} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{activity.title}</h4>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{activity.description}</p>
                                    </div>
                                    <span className="text-xs text-zinc-400 shrink-0 ml-2">{activity.date}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-8 text-zinc-500 text-sm">
                        No recent activity found.
                    </div>
                )}
            </div>
        </Card>
    );
};
