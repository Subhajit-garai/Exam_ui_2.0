import { cn } from "@/lib/utils";

interface ProgressBarProps {
    value: number; // 0 to 100
    color?: string; // Tailwind bg class
    height?: string; // Tailwind h class
    className?: string;
    showLabel?: boolean;
}

export const ProgressBar = ({
    value,
    color = "bg-primary",
    height = "h-2.5",
    className,
    showLabel = false
}: ProgressBarProps) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
        <div className={cn("w-full", className)}>
            {showLabel && (
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-muted-foreground">Progress</span>
                    <span className="font-bold">{Math.round(clampedValue)}%</span>
                </div>
            )}
            <div className={cn("w-full bg-secondary rounded-full overflow-hidden", height)}>
                <div
                    className={cn("h-full rounded-full transition-all duration-500 ease-out", color)}
                    style={{ width: `${clampedValue}%` }}
                />
            </div>
        </div>
    );
};
