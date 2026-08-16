import { Card } from "@/design-system/card";
import { useApi } from "@/ApiProvider";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setActivityStats, setLoading, setError } from "@/store/slice/activitySlice";
import { RefreshCw, Flame } from "lucide-react";
import { Button } from "@repo/ui/button";
import { cn } from "@/lib/utils";

interface StreakCardProps {
    variant?: "gradient" | "minimal" | "compact";
    className?: string;
    showRefresh?: boolean;
}

export const StreakCard = ({ variant = "gradient", className, showRefresh = true }: StreakCardProps) => {
    const _ = useApi();
    const dispatch = useDispatch();
    const { stats, loading } = useSelector((state: RootState) => state.activity);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchStats = async () => {
        dispatch(setLoading(true));
        try {
            const response = await _.api.activity.getActivityStats();
            if (response.success && response.data) {
                dispatch(setActivityStats(response.data));
            } else {
                dispatch(setError("Failed to fetch stats"));
            }
        } catch (error) {
            console.error("Failed to fetch activity stats", error);
            dispatch(setError("Failed to fetch activity stats"));
        } finally {
            dispatch(setLoading(false));
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        if (!stats) {
            fetchStats();
        }
    }, []);

    const handleRefresh = () => {
        if (isRefreshing) return;

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        setIsRefreshing(true);
        debounceTimeout.current = setTimeout(() => {
            fetchStats();
        }, 1000); // 1 second debounce
    };

    const streak = stats?.streak || 0;

    if (variant === "compact") {
        return (
            <div className={cn("flex items-center gap-3 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20", className)}>
                <div className="p-2 bg-orange-500 rounded-full text-white">
                    <Flame size={20} />
                </div>
                <div className="flex-1">
                    <p className="font-bold text-lg">{streak} Day Streak!</p>
                    <p className="text-xs text-muted-foreground">Keep learning to maintain it</p>
                </div>
                <div className="text-orange-600 font-bold text-xl">
                </div>
                {showRefresh && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-orange-500 hover:bg-orange-500/10 h-8 w-8"
                        onClick={handleRefresh}
                        disabled={loading || isRefreshing}
                    >
                        <RefreshCw size={14} className={loading || isRefreshing ? "animate-spin" : ""} />
                    </Button>
                )}
            </div>
        );
    }

    if (variant === "minimal") {
        return (
            <Card className={cn("p-4 border-zinc-200 dark:border-zinc-800", className)}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Flame className="text-orange-500" size={24} />
                        <div>
                            <span className="text-2xl font-bold">{streak}</span>
                            <span className="text-sm text-muted-foreground ml-1">days streak</span>
                        </div>
                    </div>
                    {showRefresh && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground h-8 w-8"
                            onClick={handleRefresh}
                            disabled={loading || isRefreshing}
                        >
                            <RefreshCw size={16} className={loading || isRefreshing ? "animate-spin" : ""} />
                        </Button>
                    )}
                </div>
            </Card>
        );
    }

    // Default Gradient Variant
    return (
        <Card className={cn("p-6 bg-gradient-to-br from-orange-400 to-pink-500 text-white border-none relative overflow-hidden", className)}>
            {showRefresh && (
                <div className="absolute top-2 right-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                        onClick={handleRefresh}
                        disabled={loading || isRefreshing}
                    >
                        <RefreshCw size={16} className={loading || isRefreshing ? "animate-spin" : ""} />
                    </Button>
                </div>
            )}
            <h3 className="font-bold text-lg mb-2">Your Streak</h3>
            <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">{streak}</span>
                <span className="mb-1 opacity-90">days</span>
            </div>
            <p className="text-sm mt-2 opacity-90">Keep it up! You're on fire!</p>
        </Card>
    );
};
