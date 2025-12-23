import { Card, NestedCard } from "@/design-system/card";
import { Tooltip_two } from "@/design-system/tooltip/tooltip_two";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Button } from "@repo/ui/button";
import { IconBrandTelegram, IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconBrandInstagram, IconBrandFacebook, IconWorld, IconBrandWhatsapp, IconBrandGmail } from "@tabler/icons-react";
import { EditSocial } from "./EditSocial";
import { useApi } from "@/ApiProvider";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useState, useEffect } from "react";
import type { SocialPlatform } from "@/lib/constants/question.constants.type";

export type SocialHandle_type = {
    id?: string;
    Icon: ReactNode;
    platform: string;
    iconText?: string;
    link: string;
    ActionIcon?: ReactNode;
    actionValue?: string;
    actionfn?: () => void | Promise<unknown>;
};

export const SOCIAL_PLATFORMS = [
    { label: "telegram", value: "telegram", icon: <IconBrandTelegram size={20} />, color: "text-blue-500 bg-blue-500/10" },
    { label: "email", value: "email", icon: <IconBrandGmail size={20} />, color: "text-blue-600 bg-blue-600/10" },
    { label: "whatsapp", value: "whatsapp", icon: <IconBrandWhatsapp size={20} />, color: "text-green-500 bg-green-500/10" },
    { label: "linkedIn", value: "linkedIn", icon: <IconBrandLinkedin size={20} />, color: "text-blue-700 bg-blue-700/10" },
    { label: "github", value: "github", icon: <IconBrandGithub size={20} />, color: "text-[var(--text-primary)] bg-gray-500/10" },
    { label: "twitter", value: "twitter", icon: <IconBrandTwitter size={20} />, color: "text-sky-500 bg-sky-500/10" },
    { label: "instagram", value: "instagram", icon: <IconBrandInstagram size={20} />, color: "text-pink-500 bg-pink-500/10" },
    { label: "facebook", value: "facebook", icon: <IconBrandFacebook size={20} />, color: "text-blue-600 bg-blue-600/10" },
    { label: "website", value: "website", icon: <IconWorld size={20} />, color: "text-emerald-500 bg-emerald-500/10" },
];

export const SocialLinks = ({ className }: { className?: string }) => {
    const { api } = useApi();
    const dispatch = useAppDispatch();
    const { social } = useAppSelector((state) => state.user);
    const [socialHandles, setSocialHandles] = useState<SocialHandle_type[]>([]);

    useEffect(() => {
        if (social && Array.isArray(social)) {
            const handles: SocialHandle_type[] = social.map((item: any) => {
                const platformName = item.platform;
                const platform = SOCIAL_PLATFORMS.find(
                    p => p.label.toLowerCase() === platformName.toLowerCase() ||
                        p.value.toLowerCase() === platformName.toLowerCase()
                );

                return {
                    platform: platform ? platform.label : platformName,
                    link: item.link,
                    Icon: platform ? platform.icon : null,
                };
            });
            setSocialHandles(handles);
        }
    }, [social]);

    const handleAddSocial = async (newSocial: SocialHandle_type) => {
        const res = await api.socialLinks.createOrupdateSocialLink({ platform: newSocial.platform as SocialPlatform, link: newSocial.link });
        if (res.success) {
            api.user.fetchuser(dispatch);
        }
    };

    const handleDeleteSocial = async (index: number) => {
        console.log("Delete social at index:", index);
        const handle = socialHandles[index];
        console.log(handle);

        if (handle) {
            const res = await api.socialLinks.deleteSocialLink({ platform: handle.platform as SocialPlatform });
            if (res.success) api.user.fetchuser(dispatch);
        }
    };

    return (
        <Card className={cn("w-full gap-3 p-4", className)}>
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Social Links</h3>
                <EditSocial
                    socialHandles={socialHandles}
                    onAdd={handleAddSocial}
                    onDelete={handleDeleteSocial}
                />
            </div>
            <div className="grid grid-cols-1 gap-3 w-full">
                {socialHandles.length > 0
                    ? socialHandles.map((handle, index: number) => {
                        // Find platform to get color
                        const platform = SOCIAL_PLATFORMS.find(p => p.label === handle.platform || p.value === handle.platform) ||
                            SOCIAL_PLATFORMS.find(p => handle.platform.includes(p.label));
                        const colorClass = platform ? platform.color : "text-primary bg-background/50";

                        return (
                            <SocialLinkItem
                                key={index}
                                {...handle}
                                actionfn={() => handleDeleteSocial(index)}
                                colorClass={colorClass}
                            />
                        );
                    })
                    : <div className="text-center text-muted-foreground text-sm py-2">No social links added.</div>}
            </div>
        </Card>
    );
};

export const SocialLinkItem = ({
    Icon,
    platform,
    iconText,
    link,
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
                    <p className="text-xs text-muted-foreground font-medium truncate uppercase tracking-wider">{platform}</p>
                    <p className="text-sm font-semibold truncate text-foreground">{link}</p>
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
