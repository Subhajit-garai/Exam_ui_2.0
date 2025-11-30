import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";


export interface ActivityItem {
    title: string;
    score: string;
    date: string;
    status: string;
}

interface RecentActivityProps {
    activities: ActivityItem[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {


    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <Button variant="link" size="sm" className="text-muted-foreground hover:text-primary h-auto p-0">View All</Button>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} className="h-full">
                <Card className="p-4 flex-1 h-full">
                    <div className="flex flex-col gap-0">
                        {
                            activities.length > 0 ? activities.map((activity, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 hover:bg-secondary/10 rounded-lg transition-colors border-b border-border/40 last:border-0">
                                    <div className={cn("w-2 h-2 rounded-full", activity.status === "Completed" ? "bg-green-500" : "bg-orange-500")} />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{activity.title}</p>
                                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn("text-sm font-semibold", activity.status === "Completed" ? "text-foreground" : "text-orange-500")}>
                                            {activity.score}
                                        </p>
                                    </div>
                                </div>
                            ))
                                : <div className="flex items-center gap-3 p-3 hover:bg-secondary/10 rounded-lg transition-colors border-b border-border/40 last:border-0">
                                    <div className={cn("w-2 h-2 rounded-full")} />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">No Recent Activity</p>
                                        <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: "short", day: 'numeric' })}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn("text-sm font-semibold", "text-orange-500")}>
                                            Empty
                                        </p>
                                    </div>
                                </div>}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};
