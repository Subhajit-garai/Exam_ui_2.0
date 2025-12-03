import { Card } from "@/design-system/card";
import { useApi } from "@/ApiProvider";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setActivityStats, setLoading, setError } from "@/store/slice/activitySlice";
import { RefreshCw } from "lucide-react";
import { Button } from "@repo/ui/button";

export const StreakCard = () => {
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

    return (
        <Card className="p-6 bg-gradient-to-br from-orange-400 to-pink-500 text-white border-none relative overflow-hidden">
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
            <h3 className="font-bold text-lg mb-2">Your Streak</h3>
            <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">{stats?.streak || 0}</span>
                <span className="mb-1 opacity-90">days</span>
            </div>
            <p className="text-sm mt-2 opacity-90">Keep it up! You're on fire!</p>
        </Card>
    );
};
