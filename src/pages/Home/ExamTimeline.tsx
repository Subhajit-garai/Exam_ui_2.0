import { useState, useRef, useEffect } from "react";
import { Card, NestedCard } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { cn } from "@/lib/utils";
import { IconLayoutList, IconLayoutColumns, IconCalendarEvent, IconBell, IconCheck, IconCircle, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Tooltip_two } from "@/design-system/tooltip/tooltip_two";
import { motion } from "motion/react";
import type { ExamStatus } from "@/lib/constants/question.constants.type";

export type TimelineEvent = {
    id: string;
    title: string;
    date: string;
    description?: string;
    status: ExamStatus;
    notification?: string;
}

interface ExamTimelineProps {
    events: TimelineEvent[];
    className?: string;
}

export const ExamTimeline = ({ events, className }: ExamTimelineProps) => {
    const [orientation, setOrientation] = useState<"vertical" | "horizontal">("horizontal");
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const currentEventRef = useRef<HTMLDivElement>(null);

    const scrollToCurrent = () => {
        if (currentEventRef.current) {
            currentEventRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = direction === "left" ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    useEffect(() => {
        // Scroll to current event on mount and when orientation changes
        setTimeout(scrollToCurrent, 300);
    }, [orientation]);

    // Handle mouse wheel scrolling for horizontal view
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || orientation !== "horizontal") return;

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };

        // passive: false is required to preventDefault
        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, [orientation]);

    return (
        <Card className={cn("flex flex-col gap-4 p-4 w-full overflow-hidden", className)}>
            <div className="flex justify-between items-center lg:gap-4 gap-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <IconCalendarEvent className="text-primary" /> Exam Timeline
                </h3>
                <div className="flex gap-2">
                    <Tooltip_two tooltiptext="Scroll to Current">
                        <Button variant="outline" size="sm" onClick={scrollToCurrent}>
                            Current
                        </Button>
                    </Tooltip_two>
                    <div className="flex bg-secondary/20 p-1 rounded-lg">
                        <Tooltip_two tooltiptext="Horizontal View">
                            <button
                                onClick={() => setOrientation("horizontal")}
                                className={cn(
                                    "p-1.5 rounded-md transition-all",
                                    orientation === "horizontal" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <IconLayoutColumns size={18} />
                            </button>
                        </Tooltip_two>
                        <Tooltip_two tooltiptext="Vertical View">
                            <button
                                onClick={() => setOrientation("vertical")}
                                className={cn(
                                    "p-1.5 rounded-md transition-all",
                                    orientation === "vertical" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <IconLayoutList size={18} />
                            </button>
                        </Tooltip_two>
                    </div>
                </div>
            </div>

            <div className="relative group/timeline w-full">
                {orientation === "horizontal" && (
                    <>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full shadow-md bg-background/80 backdrop-blur opacity-0 group-hover/timeline:opacity-100 transition-opacity"
                            onClick={() => scroll("left")}
                        >
                            <IconChevronLeft size={20} />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full shadow-md bg-background/80 backdrop-blur opacity-0 group-hover/timeline:opacity-100 transition-opacity"
                            onClick={() => scroll("right")}
                        >
                            <IconChevronRight size={20} />
                        </Button>
                    </>
                )}

                <div
                    ref={scrollContainerRef}
                    className={cn(
                        "relative p-4 overflow-auto scrollbar-hide min-h-[400px] scroll-smooth",
                        orientation === "horizontal" ? "flex flex-row items-center overflow-x-auto" : "flex flex-col items-start overflow-y-auto h-[600px]"
                    )}
                >
                {/* Connecting Line */}
                <div
                    className={cn(
                        "absolute bg-border/50 rounded-full",
                        orientation === "horizontal"
                            ? "h-1 top-1/2 left-4 right-4 -translate-y-1/2 w-[calc(100%-2rem)]"
                            : "w-1 left-8 top-4 bottom-4 h-[calc(100%-2rem)]"
                    )}
                />

                {events.map((event, index) => {
                    const isCurrent = event.status === "SCHEDULED";
                    const isCompleted = event.status === "COMPLETED";

                    return (
                        <div
                            key={event.id}
                            ref={isCurrent ? currentEventRef : null}
                            className={cn(
                                "relative flex-shrink-0 z-10 transition-all duration-300",
                                orientation === "horizontal" ? "w-[280px] px-4" : "w-full pl-16 py-4"
                            )}
                        >
                            {/* Node Indicator */}
                            <div
                                className={cn(
                                    "absolute flex items-center justify-center w-8 h-8 rounded-full border-4 transition-colors bg-background",
                                    orientation === "horizontal"
                                        ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        : "left-4 top-1/2 -translate-y-1/2",
                                    isCompleted ? "border-green-500 text-green-500" :
                                        isCurrent ? "border-primary text-primary scale-110 shadow-[0_0_15px_rgba(var(--primary),0.5)]" : "border-muted text-muted-foreground"
                                )}
                            >
                                {isCompleted ? <IconCheck size={14} stroke={3} /> : <IconCircle size={10} fill="currentColor" />}
                            </div>

                            {/* Content Card */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={cn(
                                    "transition-all duration-300",
                                    orientation === "horizontal"
                                        ? index % 2 === 0 ? "-translate-y-[calc(50%+2rem)]" : "translate-y-[calc(50%+2rem)]"
                                        : ""
                                )}
                            >
                                <NestedCard
                                    className={cn(
                                        "p-3 gap-2 items-start text-left border-l-4",
                                        isCurrent ? "border-l-primary bg-primary/5 ring-1 ring-primary/20" :
                                            isCompleted ? "border-l-green-500" : "border-l-muted"
                                    )}
                                >
                                    <div className="flex justify-between items-start w-full">
                                        <span className="text-xs font-mono bg-background/50 px-2 py-0.5 rounded text-muted-foreground border border-border/50">
                                            {event.date}
                                        </span>
                                        {event.notification && (
                                            <Tooltip_two tooltiptext={event.notification}>
                                                <div className="relative">
                                                    <IconBell size={16} className="text-yellow-500 animate-pulse" />
                                                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-background" />
                                                </div>
                                            </Tooltip_two>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className={cn("font-semibold text-sm", isCurrent && "text-primary")}>{event.title}</h4>
                                        {event.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>}
                                    </div>
                                    {isCurrent && (
                                        <div className="w-full mt-2">
                                            <Button size="sm" className="w-full h-7 text-xs" variant="outline">View Details</Button>
                                        </div>
                                    )}
                                </NestedCard>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
            </div>
        </Card>
    );
};
