import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/tooltip";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export interface HeatmapData {
    date: string;
    count: number;
    level: number; // 0-4
}

interface HeatmapProps {
    data: HeatmapData[];
    startDate?: Date;
    endDate?: Date;
    className?: string;
}

export const Heatmap = ({ data, startDate, endDate, className }: HeatmapProps) => {
    // Generate dates for the last year if not provided
    const dates = useMemo(() => {
        const end = endDate || new Date();
        const start = startDate || new Date(new Date().setFullYear(end.getFullYear() - 1));
        const days = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d));
        }
        return days;
    }, [startDate, endDate]);

    // Map data for quick lookup
    const dataMap = useMemo(() => {
        const map = new Map<string, HeatmapData>();
        data.forEach(d => map.set(d.date, d));
        return map;
    }, [data]);

    const getColor = (level: number) => {
        switch (level) {
            case 1: return "bg-green-200 dark:bg-green-900";
            case 2: return "bg-green-400 dark:bg-green-700";
            case 3: return "bg-green-600 dark:bg-green-500";
            case 4: return "bg-green-800 dark:bg-green-300";
            default: return "bg-secondary/50";
        }
    };

    return (
        <div className={cn("flex flex-col gap-2 overflow-x-auto", className)}>
            <div className="flex gap-1 min-w-max">
                {/* We can group by weeks for a calendar view, but for simplicity let's do a flex grid or similar 
                    Actually, GitHub style is weeks (columns) x days (rows).
                */}
                <div className="grid grid-rows-7 grid-flow-col gap-1">
                    {dates.map((date, i) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const entry = dataMap.get(dateStr);
                        const level = entry?.level || 0;
                        const count = entry?.count || 0;

                        return (
                            <TooltipProvider key={i}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div
                                            className={cn(
                                                "w-3 h-3 rounded-sm transition-colors hover:ring-1 hover:ring-ring hover:z-10",
                                                getColor(level)
                                            )}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs font-medium">{date.toLocaleDateString()}</p>
                                        <p className="text-xs text-muted-foreground">{count} activities</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className={cn("w-3 h-3 rounded-sm", getColor(0))} />
                    <div className={cn("w-3 h-3 rounded-sm", getColor(1))} />
                    <div className={cn("w-3 h-3 rounded-sm", getColor(2))} />
                    <div className={cn("w-3 h-3 rounded-sm", getColor(3))} />
                    <div className={cn("w-3 h-3 rounded-sm", getColor(4))} />
                </div>
                <span>More</span>
            </div>
        </div>
    );
};
