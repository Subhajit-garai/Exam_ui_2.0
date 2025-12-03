import { DailyChallengeCard } from "./components/DailyChallengeCard";
import { StreakCard } from "@/pages/Activity/components/achievements/StreakCard";
import { PastChallengesList } from "./components/PastChallengesList";
import { BetaTag } from "@repo/design-system/DevComponents/BetaTag";

export const ChallengePage = () => {
    return (

        <BetaTag>
            <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full mb-20">
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">Daily Challenges</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">Complete daily tasks to keep your streak alive!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Today's Challenge</h2>
                            <DailyChallengeCard />
                        </section>

                        <PastChallengesList />
                    </div>

                    <div className="space-y-6">
                        <StreakCard />
                    </div>
                </div>
            </div>
        </BetaTag>
    );
};

export default ChallengePage;
