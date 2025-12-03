import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { IconTrophy } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useApi } from "@/ApiProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastConfig } from "@/lib";
import { toast } from "react-toastify";

interface DailyChallengeData {
    id: string;
    title: string;
    description: string;
    xp: number;
}

export const DailyChallenge = () => {
    const { api } = useApi();
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState<DailyChallengeData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await api.activity.getDailyChallenge();

                if (
                    response.success
                ) {

                    setChallenge(response.data)

                }
            } catch (error) {
                toast.error("Failed to fetch daily challenge", ToastConfig(1000));
            } finally {
                setLoading(false);
            }
        };

        fetchChallenge();
    }, []);

    if (loading) {
        return (
            <Card className="p-6 h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            </Card>
        );
    }

    if (!challenge) {
        return (
            <Card className="p-6 h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                <IconTrophy size={48} className="mb-4 opacity-20" />
                <p>No challenges for today</p>
                <p className="text-sm">Check back tomorrow!</p>
            </Card>
        );
    }

    return (
        <motion.div whileHover={{ scale: 1.02 }} className="h-full">
            <Card className="p-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-none relative overflow-hidden h-full">
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold mb-1"> {challenge.title}</h3>
                        <p className="text-indigo-100 text-sm mb-4">{challenge.description}</p>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white/10 hover:bg-white/20 text-white border-0"
                            // onClick={() => navigate(`/activity/challenge/${challenge.id}`)}
                            onClick={() => navigate(`/activity/challenge`)}
                        >
                            Start Challenge
                        </Button>
                    </div>
                    <div className="hidden sm:block p-4 bg-white/10 rounded-full backdrop-blur-sm">
                        <IconTrophy size={32} className="text-yellow-300" />
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-8 -mb-8 blur-xl" />
            </Card>
        </motion.div>
    );
};
