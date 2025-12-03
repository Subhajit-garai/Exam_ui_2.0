import { Button } from "@repo/ui/button";
import { Card } from "@repo/design-system/card";
import { BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useIsMobile } from "@repo/hooks/isMobile"
import { useEffect, useState } from "react";
import { useApi } from "@/ApiProvider";
import { LoaderFive } from "@repo/design-system/loader/loader";

const RewardsDisplay = () => {
    const _ = useApi();
    const [rewards, setRewards] = useState<{ xp: number; badges: string[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const res = await _.api.activity.getRewards();
                if (res.success) {
                    setRewards(res.data);
                    if (res.data.xp > 0) {
                        try {
                            await _.api.activity.logActivity({
                                type: "XP_EARNED",
                                title: "XP Earned",
                                description: `You earned ${res.data.xp} XP!`,
                                metadata: { xp: res.data.xp }
                            });
                        } catch (e) { console.error(e); }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch rewards", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRewards();
    }, []);

    if (loading) return <div className="py-4"><LoaderFive text="Loading Rewards..." /></div>;
    if (!rewards) return null;

    return (
        <div className="mt-6 flex flex-col items-center gap-3">
            {rewards.xp > 0 && (
                <div className="flex items-center gap-2 bg-[var(--card)] border-[var(--border)] px-4 py-2 rounded-full border border-yellow-200 dark:border-yellow-800">
                    <span className="text-2xl">🏆</span>
                    <span className="font-bold text-[var(--text-primary)]">+{rewards.xp} XP Earned</span>
                </div>
            )}
            {rewards.badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 bg-[var(--card)] border-[var(--border)]  px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800">
                    <span className="text-2xl">🎖️</span>
                    <span className="font-bold text-[var(--text-primary)]">{badge} Unlocked!</span>
                </div>
            ))}
            <p className="text-sm text-[var(--text-secondary)]">Great job! Keep up the streak.</p>
        </div>
    );
};

const ExamSubmitSuccess = () => {
    let ismobile = useIsMobile()

    return (
        <div className='flex h-fit justify-center p-4'>
            <Card className='md:min-w-[25rem] gap-4 p-4'>
                <div className="submit-logo flex items-center justify-center">
                    <BadgeCheck size={40} colorProfile={12} color='green' />
                </div>

                <div className="examInfo">
                    <h4 className='text-center font-bold text-[var(--text-tertiary)]'>Exam Submitted Successfully</h4>
                    <RewardsDisplay />
                </div>

                <div className="actinbtn flex gap-1 md:gap-2 justify-center">
                    <Link to={"/home"} ><Button size={ismobile ? "sm" : "default"}>Home</Button></Link>
                    <Link to={"/exam "}><Button size={ismobile ? "sm" : "default"}>Exam</Button></Link>
                    <Link to={"/quiz"}><Button size={ismobile ? "sm" : "default"}>Quiz</Button></Link>
                    <Link to={"/analysis/test"}><Button size={ismobile ? "sm" : "default"}>Performance</Button></Link>
                </div>
            </Card>
        </div>
    )
}

export default ExamSubmitSuccess
