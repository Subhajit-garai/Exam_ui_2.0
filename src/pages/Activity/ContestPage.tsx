import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { Users, Trophy, Timer } from "lucide-react";
import { BetaTag } from "@repo/design-system/DevComponents/BetaTag";

export const ContestPage = () => {
    // Mock data
    const contests = [
        {
            id: 1,
            title: "Weekly Physics Championship",
            startTime: "Starts in 2h 30m",
            participants: 1240,
            prize: "1000 XP",
            status: "Upcoming",
            image: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            title: "National Mathematics Olympiad Mock",
            startTime: "Live Now",
            participants: 532,
            prize: "Gold Badge",
            status: "Live",
            image: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            title: "Chemistry Speed Run",
            startTime: "Ended yesterday",
            participants: 890,
            prize: "500 XP",
            status: "Ended",
            image: "from-emerald-500 to-teal-500"
        }
    ];

    return (

        <BetaTag>
            <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full mb-20">
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">Contests</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Compete with others and win rewards.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contests.map((contest) => (
                        <Card key={contest.id} className="overflow-hidden flex flex-col">
                            <div className={`h-32 bg-gradient-to-r ${contest.image} p-4 flex flex-col justify-between text-white`}>
                                <div className="flex justify-between items-start">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${contest.status === 'Live' ? 'bg-red-500 animate-pulse' : 'bg-black/30 backdrop-blur-sm'
                                        }`}>
                                        {contest.status}
                                    </span>
                                    <Trophy size={20} className="opacity-80" />
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-zinc-100">{contest.title}</h3>

                                <div className="space-y-2 mb-4 flex-1">
                                    <div className="flex items-center text-sm text-zinc-500 gap-2">
                                        <Timer size={16} />
                                        <span>{contest.startTime}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-zinc-500 gap-2">
                                        <Users size={16} />
                                        <span>{contest.participants} Participants</span>
                                    </div>
                                </div>

                                <Button className="w-full" variant={contest.status === 'Ended' ? "outline" : "default"}>
                                    {contest.status === 'Live' ? 'Join Now' : contest.status === 'Ended' ? 'View Results' : 'Register'}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

        </BetaTag>
    );
};

export default ContestPage;
