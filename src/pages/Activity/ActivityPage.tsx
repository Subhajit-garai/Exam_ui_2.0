import { useState } from "react";
import { QuizSetupModal } from "./QuizSetupModal";
import { DailyChallengeCard } from "./components/DailyChallengeCard";
import { QuizModesCard } from "./components/QuizModesCard";
import { AvailableQuizzes } from "./components/AvailableQuizzes";

export const ActivityPage = () => {
    const [isQuizSetupOpen, setIsQuizSetupOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState<string>("1v1");
    const [filterMode, setFilterMode] = useState<string | null>(null);

    // When clicking a mode card, we filter the available quizzes
    const handleModeFilter = (mode: string) => {
        setFilterMode(mode === filterMode ? null : mode);
    };

    // When clicking "Create Quiz", we open the modal with default or current filter mode
    const handleCreateQuiz = () => {
        setSelectedMode(filterMode || "1v1");
        setIsQuizSetupOpen(true);
    };

    return (
        <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full mb-20">
            <QuizSetupModal
                isOpen={isQuizSetupOpen}
                onClose={() => setIsQuizSetupOpen(false)}
                mode={selectedMode}
            />
            <div className="flex flex-col gap-6">
                <div className="mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">Activity Dashboard</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">Challenge yourself and track your progress.</p>
                </div>

                {/* Quiz Modes & Daily Challenge */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DailyChallengeCard />
                    <QuizModesCard onModeSelect={handleModeFilter} selectedMode={filterMode} />
                </div>

                {/* Available Quizzes Section */}
                <AvailableQuizzes filterMode={filterMode} onCreateQuiz={handleCreateQuiz} />
            </div>
        </div>
    );
};

export default ActivityPage;
