import { Card } from "@/design-system/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { motion } from "motion/react";

export interface StatItem {
    label: string;
    value: string;
    icon: ReactNode;
    color: string;
    bg: string;
}

interface StatsGridProps {
    stats: StatItem[];
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                    className="rounded-xl"
                >
                    <Card className="p-4 flex flex-col gap-2 hover:border-primary/20 transition-colors h-full">
                        <div className="flex justify-between items-start">
                            <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                                {stat.icon}
                            </div>
                            <span className={cn("text-xs font-medium px-2 py-1 rounded-full bg-secondary", stat.color)}>
                                +2.5%
                            </span>
                        </div>
                        <div className="mt-2">
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};
