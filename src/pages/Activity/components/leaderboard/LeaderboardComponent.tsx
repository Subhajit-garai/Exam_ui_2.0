import React from "react";
import { Card } from "@/design-system/card";
import { cn } from "@/lib/utils";

export type activity_time_range = "today" | "weekly" | "global";

export interface LeaderboardComponentProps<T> {
    title: string;
    description?: string;
    icon: React.ReactNode;

    timeframe?: activity_time_range;
    onTimeframeChange?: (timeframe: activity_time_range) => void;
    hideTimeframe?: boolean;

    isLoading: boolean;
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;

    footer?: React.ReactNode;
}

export function LeaderboardComponent<T>({
    title,
    description,
    icon,
    timeframe,
    onTimeframeChange,
    hideTimeframe,
    isLoading,
    data,
    renderItem,
    footer
}: LeaderboardComponentProps<T>) {
    return (
        <Card className="p-6 border-zinc-200 dark:border-zinc-800 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4 flex-1">
                    {icon}
                    <div>
                        <h3 className={cn("font-bold text-zinc-900 dark:text-zinc-100", description ? "text-xl" : "text-lg font-semibold")}>
                            {title}
                        </h3>
                        {description && <p className="text-sm text-zinc-500">{description}</p>}
                    </div>
                </div>

                {!hideTimeframe && onTimeframeChange && timeframe && (
                    <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                        {(["today", "weekly", "global"] as const).map((tf) => (
                            <button
                                key={tf}
                                onClick={() => onTimeframeChange(tf)}
                                className={cn(
                                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                    timeframe === tf
                                        ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                                )}
                            >
                                {tf === "today" ? "Today" : tf === "weekly" ? "Weekly" : "All Time"}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-2 flex-1">
                {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading...</div>
                ) : data.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No data available</div>
                ) : (
                    data.map((item, index) => renderItem(item, index))
                )}
            </div>

            {footer}
        </Card>
    );
}
