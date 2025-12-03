import { Card } from "@/design-system/card";
import { Trophy, Medal, Star } from "lucide-react";

export const XPLeaderboard = () => {
    // Mock data for top XP users
    const topUsers = [
        { id: 1, name: "Alex Johnson", xp: 15450, avatar: "AJ", rank: 1, level: 42 },
        { id: 2, name: "Sarah Smith", xp: 14300, avatar: "SS", rank: 2, level: 40 },
        { id: 3, name: "Mike Brown", xp: 13150, avatar: "MB", rank: 3, level: 38 },
        { id: 4, name: "Emily Davis", xp: 12000, avatar: "ED", rank: 4, level: 35 },
        { id: 5, name: "Chris Wilson", xp: 11950, avatar: "CW", rank: 5, level: 35 },
        { id: 6, name: "Jessica Taylor", xp: 10500, avatar: "JT", rank: 6, level: 32 },
        { id: 7, name: "David Miller", xp: 9800, avatar: "DM", rank: 7, level: 30 },
        { id: 8, name: "Robert Anderson", xp: 9200, avatar: "RA", rank: 8, level: 29 },
        { id: 9, name: "Lisa Thomas", xp: 8900, avatar: "LT", rank: 9, level: 28 },
        { id: 10, name: "James Jackson", xp: 8500, avatar: "JJ", rank: 10, level: 27 },
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
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">XP Leaderboard</h3>
                    <p className="text-sm text-zinc-500">All-time highest experience points</p>
                </div>
                <Star className="text-yellow-500 fill-yellow-500" size={28} />
            </div>

            <div className="space-y-2">
                {topUsers.map((user) => (
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
                ))}
            </div>
        </Card>
    );
};
