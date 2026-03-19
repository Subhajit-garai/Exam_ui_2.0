import { useState, useEffect } from "react";
import { Card } from "@/design-system/card";
import { Trophy, Medal, Star } from "lucide-react";
import { useApi } from "@/ApiProvider";
import { cn } from "@/lib/utils";
import type { activity_time_range } from "./QuizLeaderboard";

export const XPLeaderboard = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timeframe, setTimeframe] = useState<activity_time_range>('weekly');
    const { api } = useApi();

    useEffect(() => {
        setIsLoading(true);
        api.activity.getLeaderboard('xp', timeframe, 10)
            .then((response: any) => {
                const data = response.data || [];
                // Map API data to component structure
                const mappedUsers = data.map((item: any, index: number) => ({
                    id: item.user?.id || index,
                    name: item.user?.name || "User",
                    xp: item.score || 0,
                    avatar: (item.user?.name || "U").substring(0, 2).toUpperCase(),
                    rank: item.rank || index + 1,
                    level: Math.floor(Math.sqrt((item.score || 0) / 100)) + 1 // Rough level calc based on XP
                }));
                setUsers(mappedUsers);
            })
            .catch(err => console.error("Failed to fetch XP leaderboard", err))
            .finally(() => setIsLoading(false));
    }, [api, timeframe]);

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Trophy className="text-yellow-500" size={24} />;
            case 2: return <Medal className="text-gray-400" size={24} />;
            case 3: return <Medal className="text-amber-600" size={24} />;
            default: return <span className="text-zinc-500 font-bold w-6 text-center text-lg">{rank}</span>;
        }
    };

    return (
        <Card className="p-6 border-zinc-200 dark:border-zinc-800">

            <div className="flex items-center justify-between mb-6 gap-4">
                <Star className="text-yellow-500 fill-yellow-200" size={28} />
                <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">XP Leaderboard</h3>
                    <p className="text-sm text-zinc-500">Highest experience points</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                        <button
                            onClick={() => setTimeframe("today")}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                timeframe === 'today'
                                    ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                            )}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setTimeframe('weekly')}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                timeframe === 'weekly'
                                    ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                            )}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => setTimeframe('global')}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                timeframe === 'global'
                                    ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                            )}
                        >
                            All Time
                        </button>
                    </div>

                </div>
            </div>

            <div className="space-y-2">
                {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading...</div>
                ) : users.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No data available</div>
                ) : (
                    users.map((user) => (
                        <div key={user.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${user.rank <= 3 ? 'bg-zinc-50 dark:bg-zinc-900/50' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/30'}`}>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-8">
                                    {getRankIcon(user.rank)}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-sm font-bold text-indigo-700 dark:text-indigo-300 border-2 border-white dark:border-zinc-800 shadow-sm">
                                    {user.avatar}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{user.name}</h4>
                                    <p className="text-xs text-zinc-500">Level {user.level}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block font-bold text-indigo-600 dark:text-indigo-400">{user.xp.toLocaleString()} XP</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};
