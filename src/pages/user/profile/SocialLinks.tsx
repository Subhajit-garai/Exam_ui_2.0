import { Card, NestedCard } from "@/design-system/card";
import { Tooltip_two } from "@/design-system/tooltip/tooltip_two";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Button } from "@repo/ui/button";
import { IconBrandTelegram, IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconBrandInstagram, IconBrandFacebook, IconWorld, IconBrandWhatsapp } from "@tabler/icons-react";
import { EditSocial } from "./EditSocial";
import { useApi } from "@/ApiProvider";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useState, useEffect } from "react";

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

export const SocialLinks = ({ className }: { className?: string }) => {
    const { api } = useApi();
    const dispatch = useAppDispatch();
    const { social } = useAppSelector((state) => state.user);
    const [socialHandles, setSocialHandles] = useState<SocialHandle_type[]>([]);

    useEffect(() => {
        if (social) {
            const handles: SocialHandle_type[] = [];

            const createHandle = (platformName: string, value: string): SocialHandle_type => {
                const platform = SOCIAL_PLATFORMS.find(p => p.label === platformName || p.value === platformName);
                return {
                    title: platformName,
                    value: value,
                    Icon: platform ? platform.icon : null,
                };
            };

            // Map social fields to handles
            if (social.telegram) handles.push(createHandle("Telegram", social.telegram));
            if (social.whatsapp) handles.push(createHandle("WhatsApp", social.whatsapp));
            if (social.linkedin) handles.push(createHandle("LinkedIn", social.linkedin));
            if (social.github) handles.push(createHandle("GitHub", social.github));
            if (social.twitter) handles.push(createHandle("Twitter", social.twitter));
            if (social.instagram) handles.push(createHandle("Instagram", social.instagram));
            if (social.facebook) handles.push(createHandle("Facebook", social.facebook));
            if (social.website) handles.push(createHandle("Website", social.website));

            setSocialHandles(handles);
        }
    }, [social]);

    const handleAddSocial = async (newSocial: SocialHandle_type) => {
        const res = await api.socialLinks.addSocialLink(newSocial);
        if (res.success) {
            api.user.fetchuser(dispatch);
        }
    };

    const handleDeleteSocial = async (index: number) => {
        // Placeholder for delete logic - assuming we need an ID or platform name to delete
        // Since the current API might require an ID, and we are mapping from user object, 
        // we might need to adjust this based on how delete works.
        // For now, keeping the structure but noting that delete might need specific implementation details.
        console.log("Delete social at index:", index);
        // Example: if we had an ID
        // const handle = socialHandles[index];
        // if (handle.id) {
        //    const res = await api.socialLinks.deleteSocialLink(handle.id);
        //    if (res.success) api.user.fetchuser(dispatch);
        // }
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
                    : <div className="text-center text-muted-foreground text-sm py-2">No social links added.</div>}
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
