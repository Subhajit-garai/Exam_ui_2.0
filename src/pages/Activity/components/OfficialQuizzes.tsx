import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { BadgeCheck, Play, Star } from "lucide-react";

export const OfficialQuizzes = () => {
    // Mock data for official quizzes
    const officialQuizzes = [
        {
            id: 1,
            title: "Physics: Mechanics Masterclass",
            author: "Exam Buddy Team",
            questions: 25,
            rating: 4.8,
            image: "from-blue-600 to-indigo-600",
            tags: ["Physics", "Hard"]
        },
        {
            id: 2,
            title: "Chemistry: Organic Series",
            author: "Exam Buddy Team",
            questions: 30,
            rating: 4.9,
            image: "from-emerald-600 to-teal-600",
            tags: ["Chemistry", "Medium"]
        },
        {
            id: 3,
            title: "Math: Calculus Essentials",
            author: "Exam Buddy Team",
            questions: 20,
            rating: 4.7,
            image: "from-amber-600 to-orange-600",
            tags: ["Math", "Easy"]
        }
    ];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <BadgeCheck className="text-blue-500" size={24} />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Official Quizzes</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium">
                    Verified
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {officialQuizzes.map((quiz) => (
                    <Card key={quiz.id} className="group overflow-hidden border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-all cursor-pointer">
                        <div className={`h-24 bg-gradient-to-r ${quiz.image} p-4 flex flex-col justify-between text-white relative`}>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            <div className="flex justify-between items-start z-10">
                                <div className="flex gap-1">
                                    {quiz.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded text-white font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1 text-xs font-medium bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                    {quiz.rating}
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1 line-clamp-1">{quiz.title}</h3>
                            <p className="text-xs text-zinc-500 mb-4 flex items-center gap-1">
                                <BadgeCheck size={12} className="text-blue-500" />
                                Created by {quiz.author}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-zinc-500 font-medium">{quiz.questions} Questions</span>
                                <Button size="sm" className="h-8 gap-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800">
                                    <Play size={12} className="fill-current" />
                                    Start
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
