import { Card } from "@/design-system/card";
import { Trophy, Medal, Flame } from "lucide-react";

export const StreakLeaderboard = () => {
    // Mock data for top Streak users
    const topUsers = [
        { id: 1, name: "Robert Anderson", streak: 145, avatar: "RA", rank: 1 },
        { id: 2, name: "Lisa Thomas", streak: 132, avatar: "LT", rank: 2 },
        { id: 3, name: "James Jackson", streak: 120, avatar: "JJ", rank: 3 },
        { id: 4, name: "Alex Johnson", streak: 98, avatar: "AJ", rank: 4 },
        { id: 5, name: "Sarah Smith", streak: 85, avatar: "SS", rank: 5 },
        { id: 6, name: "Mike Brown", streak: 72, avatar: "MB", rank: 6 },
        { id: 7, name: "Emily Davis", streak: 60, avatar: "ED", rank: 7 },
        { id: 8, name: "Chris Wilson", streak: 45, avatar: "CW", rank: 8 },
        { id: 9, name: "Jessica Taylor", streak: 30, avatar: "JT", rank: 9 },
        { id: 10, name: "David Miller", streak: 15, avatar: "DM", rank: 10 },
    ];

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
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Streak Leaderboard</h3>
                    <p className="text-sm text-zinc-500">Longest active daily streaks</p>
                </div>
                <Flame className="text-orange-500 fill-orange-500" size={28} />
            </div>

            <div className="space-y-2">
                {topUsers.map((user) => (
                    <div key={user.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${user.rank <= 3 ? 'bg-zinc-50 dark:bg-zinc-900/50' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/30'}`}>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8">
                                {getRankIcon(user.rank)}
                            </div>
                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-sm font-bold text-orange-700 dark:text-orange-300 border-2 border-white dark:border-zinc-800 shadow-sm">
                                {user.avatar}
                            </div>
                            <div>
                                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{user.name}</h4>
                                <p className="text-xs text-zinc-500">Active</p>
                            </div>
                        </div>
                        <div className="text-right flex items-center gap-1">
                            <Flame size={16} className="text-orange-500 fill-orange-500" />
                            <span className="block font-bold text-orange-600 dark:text-orange-400">{user.streak} Days</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
