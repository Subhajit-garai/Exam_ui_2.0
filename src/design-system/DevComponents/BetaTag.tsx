import React from "react";
import { cn } from "@/lib/utils";
import { FlaskConical } from "lucide-react";

interface BetaTagProps {
    children?: React.ReactNode;
    variant?: "default" | "corner" | "ribbon" | "floating";
    className?: string;
    text?: string;
}

export const BetaTag = ({
    children,
    variant = "ribbon",
    className,
    text = "BETA",
}: BetaTagProps) => {
    const badgeStyles = "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 w-fit";

    if (!children) {
        return (
            <div className={cn(badgeStyles, className)}>
                <FlaskConical size={10} fill="currentColor" />
                {text}
            </div>
        );
    }

    return (
        <div className={cn("relative border border-indigo-500/30 p-2 rounded-xl", className)}>
            {children}
            {variant === "corner" && (
                <div className="absolute -top-2 -right-2 z-50">
                    <div className={cn(badgeStyles, "px-1.5 py-0.5 shadow-md")}>
                        <span className="text-[9px]">{text}</span>
                    </div>
                </div>
            )}
            {variant === "floating" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-50">
                    <div className={cn(badgeStyles, "shadow-md border border-white/20")}>
                        <FlaskConical size={12} fill="currentColor" />
                        {text}
                    </div>
                </div>
            )}
            {variant === "ribbon" && (
                <div className="absolute top-0 right-0 z-10 overflow-hidden w-20 h-20 pointer-events-none">
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-[9px] font-bold px-8 py-1 rotate-45 translate-x-[28%] translate-y-[40%] shadow-md">
                        {text}
                    </div>
                </div>
            )}
            {variant === "default" && (
                <div className="absolute -top-3 -right-2 z-50">
                    <div className={cn(badgeStyles, "shadow-md border border-white/20")}>
                        <FlaskConical size={12} fill="currentColor" />
                        {text}
                    </div>
                </div>
            )}
        </div>
    );
};
