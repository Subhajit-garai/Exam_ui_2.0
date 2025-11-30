import { Button } from "@repo/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@repo/ui/dialog";
import { Input } from "@repo/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/select";
import { IconBrandTelegram, IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconBrandInstagram, IconBrandFacebook, IconWorld, IconPencil, IconTrash, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import type { SocialHandle_type } from "./SocialLinks";

const SOCIAL_PLATFORMS = [
    { label: "Telegram", value: "Telegram", icon: <IconBrandTelegram size={20} />, color: "text-blue-500 bg-blue-500/10" },
    { label: "LinkedIn", value: "Linkedin", icon: <IconBrandLinkedin size={20} />, color: "text-blue-700 bg-blue-700/10" },
    { label: "GitHub", value: "GitHub", icon: <IconBrandGithub size={20} />, color: "text-gray-900 dark:text-gray-100 bg-gray-500/10" },
    { label: "Twitter", value: "Twitter", icon: <IconBrandTwitter size={20} />, color: "text-sky-500 bg-sky-500/10" },
    { label: "Instagram", value: "Instagram", icon: <IconBrandInstagram size={20} />, color: "text-pink-500 bg-pink-500/10" },
    { label: "Facebook", value: "Facebook", icon: <IconBrandFacebook size={20} />, color: "text-blue-600 bg-blue-600/10" },
    { label: "Website", value: "Website", icon: <IconWorld size={20} />, color: "text-emerald-500 bg-emerald-500/10" },
];

interface EditSocialProps {
    socialHandles: SocialHandle_type[];
    onAdd?: (newSocial: SocialHandle_type) => void;
    onDelete?: (index: number) => void;
}

export const EditSocial = ({ socialHandles, onAdd, onDelete }: EditSocialProps) => {
    const [newPlatform, setNewPlatform] = useState<string>("");
    const [newValue, setNewValue] = useState<string>("");

    const handleAdd = () => {
        if (newPlatform && newValue && onAdd) {
            const platform = SOCIAL_PLATFORMS.find(p => p.value === newPlatform);
            if (platform) {
                onAdd({
                    Icon: platform.icon,
                    title: platform.label,
                    iconText: platform.label,
                    value: newValue,
                    ActionIcon: null,
                });
                setNewPlatform("");
                setNewValue("");
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <IconPencil size={18} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Social Links</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    {/* List Existing */}
                    <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                        {socialHandles.map((handle, index) => (
                            <div key={index} className="flex items-center justify-between p-2 rounded-lg border bg-secondary/10">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <div className="p-1.5 rounded-md bg-background/50 text-muted-foreground">
                                        {handle.Icon}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-medium truncate">{handle.title}</span>
                                        <span className="text-xs text-muted-foreground truncate">{handle.value}</span>
                                    </div>
                                </div>
                                {onDelete && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                        onClick={() => onDelete(index)}
                                    >
                                        <IconTrash size={16} />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add New */}
                    <div className="flex flex-col gap-3 pt-4 border-t">
                        <span className="text-sm font-medium">Add New Link</span>
                        <div className="flex gap-2">
                            <Select value={newPlatform} onValueChange={setNewPlatform}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SOCIAL_PLATFORMS.map((platform) => (
                                        <SelectItem key={platform.value} value={platform.value}>
                                            <div className="flex items-center gap-2">
                                                {platform.icon}
                                                <span>{platform.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input
                                placeholder="Username or Link"
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                className="flex-1"
                            />
                        </div>
                        <Button onClick={handleAdd} disabled={!newPlatform || !newValue} className="w-full">
                            <IconPlus size={16} className="mr-2" /> Add Link
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
