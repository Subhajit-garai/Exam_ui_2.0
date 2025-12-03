import { useState } from "react";
import { AvailableQuizzes } from "../quiz/component/AvailableQuizzes";
import { QuizModesCard } from "./components/QuizModesCard";
import { QuizLeaderboard } from "./components/QuizLeaderboard";
import { OfficialQuizzes } from "./components/OfficialQuizzes";
import { QuizSetupModal } from "./QuizSetupModal";
import { BetaTag } from "@/design-system/DevComponents/BetaTag";

export const QuizPage = () => {
    const [isQuizSetupOpen, setIsQuizSetupOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState<string>("1v1");
    const [filterMode, setFilterMode] = useState<string | null>(null);

    const handleModeFilter = (mode: string) => {
        setFilterMode(mode === filterMode ? null : mode);
    };

    const handleCreateQuiz = () => {
        setSelectedMode(filterMode || "1v1");
        setIsQuizSetupOpen(true);


    };

    return (

        <BetaTag>
            <div className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full mb-20">
                <QuizSetupModal
                    isOpen={isQuizSetupOpen}
                    onClose={() => setIsQuizSetupOpen(false)}
                    mode={selectedMode}
                />

                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">Quizzes</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">Practice with quizzes in different modes.</p>
                </div>

                <div className="flex flex-col gap-10">
                    {/* Top Section: Modes (Left) and Leaderboard (Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                        <div className="lg:col-span-2">
                            <QuizModesCard onModeSelect={handleModeFilter} selectedMode={filterMode} />
                        </div>
                        <div className="lg:col-span-1">
                            <QuizLeaderboard />
                        </div>
                    </div>

                    {/* Middle Section: Official Quizzes */}
                    <OfficialQuizzes />

                    {/* Bottom Section: Available Quizzes */}
                    <AvailableQuizzes filterMode={filterMode} onCreateQuiz={handleCreateQuiz} />
                </div>
            </div>

        </BetaTag>
    );
};

export default QuizPage;
