import { Card } from "@/design-system";
import { IconFlame, IconShare, IconCopy } from "@tabler/icons-react";
import { Button } from "@repo/ui/button";

export const Gamification = () => {
    return (
        <Card className="p-6 flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Achievements</h3>

            <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500 rounded-full text-white">
                        <IconFlame size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-lg">7 Day Streak!</p>
                        <p className="text-xs text-muted-foreground">Keep learning to maintain it</p>
                    </div>
                </div>
                <div className="text-orange-600 font-bold text-xl">
                    +50 XP
                </div>
            </div>

            <div className="mt-2">
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">Refer & Earn</h4>
                <div className="flex gap-2">
                    <div className="flex-1 bg-secondary/20 rounded border border-border px-3 py-2 font-mono text-sm flex items-center justify-between">
                        <span>SUBHA2025</span>
                        <IconCopy size={16} className="text-muted-foreground cursor-pointer hover:text-foreground" />
                    </div>
                    <Button size="icon" variant="outline">
                        <IconShare size={18} />
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    Share your code with friends and earn 100 credits when they sign up.
                </p>
            </div>
        </Card>
    );
};
