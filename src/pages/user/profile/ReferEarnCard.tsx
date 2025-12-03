import { Card } from "@/design-system";
import { IconShare, IconCopy } from "@tabler/icons-react";
import { Button } from "@repo/ui/button";

export const ReferEarnCard = () => {
    return (
        <Card className="p-6 flex flex-col gap-4">
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
        </Card>
    );
};
