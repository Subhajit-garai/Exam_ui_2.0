import { useState } from "react";
import { Card } from "@/design-system/card";
import { Trophy, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

export const QuizLeaderboard = () => {
    const [timeframe, setTimeframe] = useState<'weekly' | 'all-time'>('weekly');

    // Mock data matching API structure
    const weeklyTopUsers = [
        { user: { id: "1", name: "Alex Johnson", avatar: "AJ" }, score: 2450, rank: 1 },
        { user: { id: "2", name: "Sarah Smith", avatar: "SS" }, score: 2300, rank: 2 },
        { user: { id: "3", name: "Mike Brown", avatar: "MB" }, score: 2150, rank: 3 },
        { user: { id: "4", name: "Emily Davis", avatar: "ED" }, score: 2000, rank: 4 },
        { user: { id: "5", name: "Chris Wilson", avatar: "CW" }, score: 1950, rank: 5 },
    ];

    const allTimeTopUsers = [
        { user: { id: "10", name: "David Miller", avatar: "DM" }, score: 15400, rank: 1 },
        { user: { id: "11", name: "Jessica Taylor", avatar: "JT" }, score: 14200, rank: 2 },
        { user: { id: "1", name: "Alex Johnson", avatar: "AJ" }, score: 13500, rank: 3 },
        { user: { id: "12", name: "Robert Anderson", avatar: "RA" }, score: 12800, rank: 4 },
        { user: { id: "2", name: "Sarah Smith", avatar: "SS" }, score: 11000, rank: 5 },
    ];

    const currentData = timeframe === 'weekly' ? weeklyTopUsers : allTimeTopUsers;

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Trophy className="text-yellow-500" size={20} />;
            case 2: return <Medal className="text-gray-400" size={20} />;
            case 3: return <Medal className="text-amber-600" size={20} />;
            default: return <span className="text-zinc-500 font-bold w-5 text-center">{rank}</span>;
        }
    };

    return (
        <Card className="p-6 border-zinc-200 dark:border-zinc-800 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Leaderboard</h3>
                <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
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
                        onClick={() => setTimeframe('all-time')}
                        className={cn(
                            "px-3 py-1 text-xs font-medium rounded-md transition-all",
                            timeframe === 'all-time'
                                ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                        )}
                    >
                        All Time
                    </button>
                </div>
            </div>

            <div className="space-y-4 flex-1">
                {currentData.map((item) => (
                    <div key={item.user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8">
                                {getRankIcon(item.rank)}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
                                {item.user.avatar}
                            </div>
                            <span className="font-medium text-sm text-zinc-700 dark:text-zinc-300">{item.user.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{item.score} XP</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <p className="text-[10px] text-zinc-400 mb-2">Last updated: {new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: '2-digit', minute: '2-digit' })} IST</p>
                <button className="text-xs text-zinc-500 hover:text-indigo-600 transition-colors">
                    View Full Leaderboard
                </button>
            </div>
        </Card>
    );
};
