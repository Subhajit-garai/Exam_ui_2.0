import { Card } from "@/design-system/card";
import { Calendar, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useApi } from "@/ApiProvider";
import type { DailyChallenge } from "@/types";
import { toast } from "react-toastify";
import { ToastConfig } from "@/lib";
import { Button } from "@repo/ui/button";

export const PastChallengesList = () => {
    const _ = useApi();
    const [pastChallenges, setPastChallenges] = useState<DailyChallenge[]>([]);
    const [loading, setLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchPastChallenges = async () => {
        setLoading(true);
        try {
            const response = await _.api.activity.getPastChallenges();
            if (response.success) {
                setPastChallenges(response.data);
            } else {
                toast.info("Can not find any past challenges", ToastConfig(1500));
            }
        } catch (error) {
            console.error("Failed to fetch past challenges", error);
            toast.error("Failed to fetch past challenges", ToastConfig(1500));
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchPastChallenges();
    }, []);

    const handleRefresh = () => {
        if (isRefreshing) return;

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        setIsRefreshing(true);
        debounceTimeout.current = setTimeout(() => {
            fetchPastChallenges();
        }, 1000); // 1 second debounce
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Past Challenges</h2>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full h-8 w-8"
                    onClick={handleRefresh}
                    disabled={loading || isRefreshing}
                >
                    <RefreshCw size={16} className={loading || isRefreshing ? "animate-spin" : ""} />
                </Button>
            </div>

            <div className="space-y-3">
                {loading && pastChallenges.length === 0 ? (
                    <div className="text-center py-4 text-zinc-500">Loading...</div>
                ) : pastChallenges.length > 0 ? (
                    pastChallenges.map((challenge) => (
                        <Card key={challenge.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full bg-zinc-100 text-zinc-400`}>
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{challenge.title}</h3>
                                    <p className="text-xs text-zinc-500">{new Date(challenge.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-medium text-zinc-500">
                                    {challenge.xp} XP
                                </span>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-4 text-zinc-500">No past challenges found.</div>
                )}
            </div>
        </section>
    );
};
