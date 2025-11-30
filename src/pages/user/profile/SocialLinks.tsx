import { Card, NestedCard } from "@/design-system/card";
import { Tooltip_two } from "@/design-system/tooltip/tooltip_two";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Button } from "@repo/ui/button";
import { IconBrandTelegram, IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconBrandInstagram, IconBrandFacebook, IconWorld, IconBrandWhatsapp } from "@tabler/icons-react";
import { EditSocial } from "./EditSocial";

export type SocialHandle_type = {
    id?: string;
    Icon: ReactNode;
    title: string;
    iconText?: string;
    value: string;
    ActionIcon?: ReactNode;
    actionValue?: string;
    actionfn?: () => void | Promise<unknown>;
};

export const SOCIAL_PLATFORMS = [
    { label: "Telegram", value: "Telegram", icon: <IconBrandTelegram size={20} />, color: "text-blue-500 bg-blue-500/10" },
    { label: "WhatsApp", value: "WhatsApp", icon: <IconBrandWhatsapp size={20} />, color: "text-green-500 bg-green-500/10" },
    { label: "LinkedIn", value: "Linkedin", icon: <IconBrandLinkedin size={20} />, color: "text-blue-700 bg-blue-700/10" },
    { label: "GitHub", value: "GitHub", icon: <IconBrandGithub size={20} />, color: "text-gray-900 dark:text-gray-100 bg-gray-500/10" },
    { label: "Twitter", value: "Twitter", icon: <IconBrandTwitter size={20} />, color: "text-sky-500 bg-sky-500/10" },
    { label: "Instagram", value: "Instagram", icon: <IconBrandInstagram size={20} />, color: "text-pink-500 bg-pink-500/10" },
    { label: "Facebook", value: "Facebook", icon: <IconBrandFacebook size={20} />, color: "text-blue-600 bg-blue-600/10" },
    { label: "Website", value: "Website", icon: <IconWorld size={20} />, color: "text-emerald-500 bg-emerald-500/10" },
];

export const SocialLinks = ({
    SocialHandlesdata,
    className,
    onAdd,
    onDelete
}: {
    SocialHandlesdata: SocialHandle_type[];
    className?: string;
    onAdd?: (newSocial: SocialHandle_type) => void;
    onDelete?: (index: number) => void;
}) => {
    return (
        <Card className={cn("w-full gap-3 p-4", className)}>
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Social Links</h3>
                <EditSocial
                    socialHandles={SocialHandlesdata}
                    onAdd={onAdd}
                    onDelete={onDelete}
                />
            </div>
            <div className="grid grid-cols-1 gap-3 w-full">
                {SocialHandlesdata
                    ? SocialHandlesdata.map((handle, index: number) => {
                        // Find platform to get color
                        const platform = SOCIAL_PLATFORMS.find(p => p.label === handle.title || p.value === handle.title) ||
                            SOCIAL_PLATFORMS.find(p => handle.title.includes(p.label));
                        const colorClass = platform ? platform.color : "text-primary bg-background/50";

                        return (
                            <SocialLinkItem
                                key={index}
                                {...handle}
                                colorClass={colorClass}
                            />
                        );
                    })
                    : null}
            </div>
        </Card>
    );
};

export const SocialLinkItem = ({
    Icon,
    title,
    iconText,
    value,
    ActionIcon,
    actionValue,
    actionfn,
    colorClass
}: SocialHandle_type & { colorClass?: string }) => {
    return (
        <NestedCard className=" w-full group p-3 flex-row items-center justify-between gap-3 hover:bg-secondary/20 transition-colors border-border/50 hover:border-primary/20">
            <div className="flex items-center gap-3 overflow-hidden">
                <Tooltip_two tooltiptext={iconText ?? "Icon"}>
                    <div className={cn("p-2 rounded-xl transition-transform shadow-sm group-hover:scale-110", colorClass || "bg-background/50 text-primary")}>
                        {Icon}
                    </div>
                </Tooltip_two>

                <div className="flex flex-col min-w-0">
                    <p className="text-xs text-muted-foreground font-medium truncate uppercase tracking-wider">{title}</p>
                    <p className="text-sm font-semibold truncate text-foreground">{value}</p>
                </div>
            </div>

            {ActionIcon && (
                <Tooltip_two tooltiptext={actionValue ?? "Action"}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-background/50"
                        onClick={actionfn}
                    >
                        {ActionIcon}
                    </Button>
                </Tooltip_two>
            )}
        </NestedCard>
    );
};
