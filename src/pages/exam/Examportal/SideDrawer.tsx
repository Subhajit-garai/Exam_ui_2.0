import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@repo/lib/utils";
import { Button } from "@repo/ui/button";

interface SideDrawerProps {
    open: boolean;
    onClose: () => void;
    position?: "left" | "right";
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const SideDrawer = ({
    open,
    onClose,
    position = "left",
    title,
    children,
    className,
}: SideDrawerProps) => {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
            document.body.style.overflow = "";
            return () => clearTimeout(timer);
        }
    }, [open]);

    if (!mounted) return null;

    if (!isVisible && !open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex" style={{ justifyContent: position === "left" ? "flex-start" : "flex-end" }}>
            {/* Backdrop */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out",
                    open ? "opacity-100" : "opacity-0"
                )}
                onClick={onClose}
            />

            {/* Drawer Content */}
            <div
                className={cn(
                    "relative z-10 flex h-full w-[80%] max-w-sm flex-col bg-background shadow-xl transition-transform duration-300 ease-in-out",
                    position === "left"
                        ? open ? "translate-x-0" : "-translate-x-full"
                        : open ? "translate-x-0" : "translate-x-full",
                    className
                )}
            >
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <X className="h-5 w-5" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
