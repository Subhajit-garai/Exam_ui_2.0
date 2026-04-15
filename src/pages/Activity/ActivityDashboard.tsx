import { Card } from "@/design-system/card";
import { Trophy, Swords, BrainCircuit, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DailyChallengeCard } from "./components/DailyChallengeCard";
import { BetaTag } from "@repo/design-system/DevComponents/BetaTag";

export const ActivityDashboard = () => {
    const navigate = useNavigate();

    const activitySections = [
        {
            title: "Quizzes",
            description: "Practice with 1v1, 1vMany, and team quizzes.",
            icon: BrainCircuit,
            color: "text-indigo-500",
            bg: "bg-indigo-100 dark:bg-indigo-900/30",
            path: "/activity/quiz"
        },
        {
            title: "Contests",
            description: "Compete in scheduled contests and win prizes.",
            icon: Trophy,
            color: "text-amber-500",
            bg: "bg-amber-100 dark:bg-amber-900/30",
            path: "/activity/contest"
        },
        {
            title: "Challenges",
            description: "Daily challenges to keep your streak alive.",
            icon: Swords,
            color: "text-rose-500",
            bg: "bg-rose-100 dark:bg-rose-900/30",
            path: "/activity/challenge"
        }
    ];

    return (


        <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full mb-20">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">Activity Dashboard</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">Track your progress and join activities.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Quick Access Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activitySections.map((section) => (
                            <Card
                                key={section.title}
                                className="p-4 hover:border-indigo-500 cursor-pointer transition-all hover:shadow-md border-zinc-200 dark:border-zinc-800"
                                onClick={() => navigate(section.path)}
                            >
                                <div className={`w-10 h-10 rounded-lg ${section.bg} flex items-center justify-center mb-3`}>
                                    <section.icon className={section.color} size={20} />
                                </div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{section.title}</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{section.description}</p>
                            </Card>
                        ))}
                    </div>

                    <BetaTag>
                        {/* Recent Activity / Stats Placeholder */}
                        <Card className="p-6 border-zinc-200 dark:border-zinc-800">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">Recent Activity</h3>
                                <button className="text-sm text-indigo-600 hover:underline">View All</button>
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                <Trophy size={14} className="text-zinc-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Completed Physics Quiz</p>
                                                <p className="text-xs text-zinc-500">2 hours ago</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-green-600">+50 XP</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </BetaTag>
                </div>
                <BetaTag>
                    <div className="space-y-6">
                        <DailyChallengeCard />

                        <Card className="p-6 bg-zinc-900 text-white border-none">
                            <h3 className="font-bold text-lg mb-2">Leaderboard</h3>
                            <p className="text-zinc-400 text-sm mb-4">See where you stand among your peers.</p>
                            <button
                                onClick={() => navigate('/activity/leaderboard')}
                                className="w-full py-2 bg-white text-zinc-900 rounded-md font-medium text-sm hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                            >
                                View Leaderboard <ChevronRight size={16} />
                            </button>
                        </Card>
                    </div>
                </BetaTag>
            </div>
        </div >


    );
};

export default ActivityDashboard;
