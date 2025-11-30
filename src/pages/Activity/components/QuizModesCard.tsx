import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { cn } from "@/lib/utils";

interface QuizModesCardProps {
    onModeSelect: (mode: string) => void;
    selectedMode: string | null;
}

export const QuizModesCard = ({ onModeSelect, selectedMode }: QuizModesCardProps) => {
    const modes = [
        { id: "1v1", title: "1v1", subtitle: "Duel" },
        { id: "1v2", title: "1v2", subtitle: "Triple Threat" },
        { id: "1v3", title: "1v3", subtitle: "Fatal 4-Way" },
        { id: "1v4", title: "1v4", subtitle: "Battle Royale" },
    ];

    return (
        <Card className="p-6 border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-semibold mb-4">Multiplayer Quiz</h3>
            <div className="grid grid-cols-2 gap-3">
                {modes.map((mode) => (
                    <Button
                        key={mode.id}
                        onClick={() => onModeSelect(mode.id)}
                        variant="outline"
                        className={cn(
                            "h-20 flex flex-col gap-1 hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
                            selectedMode === mode.id && "border-indigo-500 text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                        )}
                    >
                        <span className="text-2xl font-bold">{mode.title}</span>
                        <span className="text-xs text-muted-foreground">{mode.subtitle}</span>
                    </Button>
                ))}
            </div>
        </Card>
    );
};
