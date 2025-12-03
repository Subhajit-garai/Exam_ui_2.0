import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { Trophy, RefreshCw } from "lucide-react";

import { useApi } from "@/ApiProvider";
import type { DailyChallenge } from "@/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ToastConfig } from "@/lib";

export const DailyChallengeCard = () => {
    const _ = useApi();
    const [challenge, setChallenge] = useState<DailyChallenge | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchDailyChallenge = async () => {
        setLoading(true);
        try {
            const response = await _.api.activity.getDailyChallenge();
            if (response.success) {
                setChallenge(response.data);
            } else {
                toast.info("Can not find any daily challenges", ToastConfig(1500));
                setChallenge(undefined);
            }
        } catch (error) {
            console.error("Failed to fetch daily challenge", error);
            toast.error("Failed to fetch daily challenge", ToastConfig(1500));
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDailyChallenge();
    }, []);

    const handleRefresh = () => {
        if (isRefreshing) return;

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        setIsRefreshing(true);
        debounceTimeout.current = setTimeout(() => {
            fetchDailyChallenge();
        }, 1000); // 1 second debounce
    };

    const handleStart = async () => {
        if (!challenge) return;
        try {
            await _.api.activity.logActivity({
                type: "DAILY_CHALLENGE_STARTED",
                title: "Daily Challenge Started",
                description: `Started the daily challenge: ${challenge.title}`,
                metadata: { challengeId: challenge.id }
            });
            // Navigate to challenge or show success
            console.log("Challenge started");
        } catch (error) {
            console.error("Failed to log activity", error);
        }
    };

    if (!challenge && !loading) {
        return (
            <Card className="p-6 bg-zinc-100 dark:bg-zinc-800 border-none relative">
                <div className="absolute top-2 right-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full h-8 w-8"
                        onClick={handleRefresh}
                        disabled={loading || isRefreshing}
                    >
                        <RefreshCw size={16} className={loading || isRefreshing ? "animate-spin" : ""} />
                    </Button>
                </div>
                <div className="text-center text-zinc-500 mt-4">
                    <p>No daily challenge available right now.</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none relative">
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
            {loading && !challenge ? (
                <div className="flex justify-center items-center h-40">
                    <RefreshCw className="animate-spin text-white" size={32} />
                </div>
            ) : (
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold mb-2">{challenge?.title}</h3>
                        <p className="text-indigo-100 mb-4">{challenge?.description}</p>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                {challenge?.xp} XP
                            </span>
                        </div>
                        <Button
                            variant="secondary"
                            className="bg-white text-indigo-600 hover:bg-indigo-50"
                            onClick={handleStart}
                        >
                            Start Challenge
                        </Button>
                    </div>
                    <Trophy size={48} className="text-indigo-200 opacity-50" />
                </div>
            )}
        </Card>
    );
};
