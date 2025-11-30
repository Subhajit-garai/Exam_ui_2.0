import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { Trophy } from "lucide-react";

import { useApi } from "@/ApiProvider";

export const DailyChallengeCard = () => {
    const _ = useApi();

    const handleStart = async () => {
        try {
            await _.api.activity.logActivity({
                type: "DAILY_CHALLENGE_STARTED",
                title: "Daily Challenge Started",
                description: "Started the daily challenge: Thermodynamics",
                metadata: { challengeId: "thermodynamics-1" }
            });
            // Navigate to challenge or show success
            console.log("Challenge started");
        } catch (error) {
            console.error("Failed to log activity", error);
        }
    };

    return (
        <Card className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold mb-2">Daily Challenge</h3>
                    <p className="text-indigo-100 mb-4">You have 3 uncompleted activities for today.</p>
                    <Button
                        variant="secondary"
                        className="bg-white text-indigo-600 hover:bg-indigo-50"
                        onClick={handleStart}
                    >
                        Continue Learning
                    </Button>
                </div>
                <Trophy size={48} className="text-indigo-200 opacity-50" />
            </div>

            {/*  ui for what are today's daily challenge */}

        </Card>
    );
};
