import { Card } from "@/design-system";
import { IconChartBar, IconTrophy, IconActivity } from "@tabler/icons-react";
import { useAppSelector } from "@repo/store/hook";



export const PerformanceStats = () => {
    const { stats } = useAppSelector((state) => state.user);
    return (
        <Card className="p-6 flex flex-col justify-start gap-20">
            <h3 className="text-xl font-semibold">Performance Overview</h3>

            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <IconChartBar className="text-blue-500 mb-2" size={24} />
                    <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.testsAttempted.value}</span>
                    <span className="text-xs text-muted-foreground text-center">Tests Taken</span>
                </div>

                <div className="flex flex-col items-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <IconTrophy className="text-green-500 mb-2" size={24} />
                    <span className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.avgScore.value}</span>
                    <span className="text-xs text-muted-foreground text-center">Avg Score</span>
                </div>

                <div className="flex flex-col items-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <IconActivity className="text-purple-500 mb-2" size={24} />
                    <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.accuracy.value}</span>
                    <span className="text-xs text-muted-foreground text-center">Accuracy</span>
                </div>
            </div>

        </Card>
    );
};
