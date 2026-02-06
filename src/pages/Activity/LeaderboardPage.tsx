import { useState } from "react";
import { Button } from "@repo/ui/button";
import { QuizLeaderboard } from "./components/leaderboard/QuizLeaderboard";
import { XPLeaderboard } from "./components/leaderboard/XPLeaderboard";
import { StreakLeaderboard } from "./components/leaderboard/StreakLeaderboard";
import { BrainCircuit, Star, Flame } from "lucide-react";

export const LeaderboardPage = () => {
    const [activeTab, setActiveTab] = useState<"quiz" | "xp" | "streak">("quiz");

    return (
        <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full mb-20">
            <div className="mb-8 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Leaderboards</h1>
                <p className="text-[var(--text-secondary)] mt-1">See who's topping the charts in different categories.</p>
            </div>

            <div className="flex justify-center mb-8">
                <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <Button
                        variant="ghost"
                        className={`gap-2 rounded-md ${activeTab === "quiz" ? "bg-white dark:bg-zinc-900 shadow-sm text-indigo-600 dark:text-indigo-400" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                        onClick={() => setActiveTab("quiz")}
                    >
                        <BrainCircuit size={16} />
                        Quiz
                    </Button>
                    <Button
                        variant="ghost"
                        className={`gap-2 rounded-md ${activeTab === "xp" ? "bg-white dark:bg-zinc-900 shadow-sm text-yellow-600 dark:text-yellow-400" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                        onClick={() => setActiveTab("xp")}
                    >
                        <Star size={16} />
                        XP
                    </Button>
                    <Button
                        variant="ghost"
                        className={`gap-2 rounded-md ${activeTab === "streak" ? "bg-white dark:bg-zinc-900 shadow-sm text-orange-600 dark:text-orange-400" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                        onClick={() => setActiveTab("streak")}
                    >
                        <Flame size={16} />
                        Streak
                    </Button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                {activeTab === "quiz" && <QuizLeaderboard />}
                {activeTab === "xp" && <XPLeaderboard />}
                {activeTab === "streak" && <StreakLeaderboard />}
            </div>
        </div>
    );
};

export default LeaderboardPage;
