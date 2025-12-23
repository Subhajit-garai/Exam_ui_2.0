import { Card } from "@/design-system/card";
import { ProgressBar } from "@/design-system/progress/ProgressBar";
import { useApi } from "@/ApiProvider";
import { useEffect, useState } from "react";
import { LoaderFive } from "@repo/design-system/loader/loader";
import { BookOpen } from "lucide-react";

interface TopicProgress {
    topicId: string;
    topicName: string;
    percentage: number;
    timeSpent: number; // in seconds
    status: string;
}

export const TopicProgressCard = () => {
    const _ = useApi();
    const [progressList, setProgressList] = useState<TopicProgress[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                setLoading(true);
                const res = await _.api.progress.getUserTopicsProgress();
                if (res.success) {
                    setProgressList(res.data || []);
                }

            } catch (error) {
                console.error("Failed to fetch progress", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-40"><LoaderFive text="Loading Progress..." /></div>;
    }

    return (
        <Card className="p-6 border-zinc-200 dark:border-zinc-800">
            <div className="mb-6 flex items-center gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <BookOpen className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">Study Progress</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Track your subject completion</p>
                </div>
            </div>

            <div className="flex w-full max-h-[25vh] overflow-y-auto no-visible-scrollbar flex-col gap-6">
                {progressList.map((item) => (
                    <div key={item.topicId} className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <span className="font-medium text-sm">{item.topicName}</span>
                            <span className="text-xs text-muted-foreground">{Math.floor(item.timeSpent / 60)} mins used</span>
                        </div>
                        <ProgressBar
                            value={item.percentage}
                            showLabel={false}
                            height="h-2"
                            color={
                                item.percentage >= 100 ? "bg-green-500" :
                                    item.percentage > 50 ? "bg-blue-500" : "bg-orange-500"
                            }
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{item.status.replace("_", " ")}</span>
                            <span>{item.percentage}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
