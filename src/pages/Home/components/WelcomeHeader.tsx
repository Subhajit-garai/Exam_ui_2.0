import { Button } from "@repo/ui/button";
import { IconPlayerPlay } from "@tabler/icons-react";

interface WelcomeHeaderProps {
    name: string | null;
    date: string;
}

export const WelcomeHeader = ({ name, date }: WelcomeHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {name || "Student"}! 👋</h1>
                <p className="text-muted-foreground mt-1">{date}</p>
            </div>
            <Button className="bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                <IconPlayerPlay size={18} className="mr-2" /> Resume Learning
            </Button>
        </div>
    );
};
