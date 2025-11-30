import { NestedCard } from "@/design-system/card";
import { cn } from "@/lib/utils";
import { IconActivity, IconArrowRight } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export interface ActionItem {
    title: string;
    desc: string;
    icon: ReactNode;
    href: string;
    color: string;
}

interface QuickActionsProps {
    actions: ActionItem[];
}

export const QuickActions = ({ actions }: QuickActionsProps) => {


    const navigate = useNavigate();

    const redirect = (href: string) => {
        navigate(href)
    }

    return (
        <div className="lg:col-span-2 flex flex-col gap-4" >
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <IconActivity size={20} className="text-primary" /> Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {actions.map((action, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-full"
                    >
                        <NestedCard className="p-4 items-start gap-3 hover:bg-secondary/20 cursor-pointer group relative overflow-hidden h-full" onClick={() => redirect(action.href)} >
                            <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover:scale-150", action.color)} />
                            <div className={cn("p-3 rounded-xl text-white shadow-md", action.color)}>
                                {action.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold group-hover:text-primary transition-colors">{action.title}</h3>
                                <p className="text-xs text-muted-foreground">{action.desc}</p>
                            </div>
                            <IconArrowRight size={16} className="absolute bottom-4 right-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </NestedCard>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
