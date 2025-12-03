import { Card } from "@/design-system/card";
import { IconBug, IconCheck, IconClock } from "@tabler/icons-react";
import { BetaTag } from "@repo/design-system/DevComponents/BetaTag";

export const IssueDashboard = () => {
    return (

        <BetaTag>
            <div className="p-4 max-w-7xl mx-auto flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Issue Dashboard</h1>
                    <p className="text-muted-foreground">Track and manage reported issues.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-6 flex items-center gap-4 border-l-4 border-l-red-500">
                        <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                            <IconBug size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">12</h3>
                            <p className="text-muted-foreground">Open Issues</p>
                        </div>
                    </Card>
                    <Card className="p-6 flex items-center gap-4 border-l-4 border-l-yellow-500">
                        <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-500">
                            <IconClock size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">5</h3>
                            <p className="text-muted-foreground">In Progress</p>
                        </div>
                    </Card>
                    <Card className="p-6 flex items-center gap-4 border-l-4 border-l-green-500">
                        <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                            <IconCheck size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">28</h3>
                            <p className="text-muted-foreground">Resolved</p>
                        </div>
                    </Card>
                </div>

                <Card className="p-6 min-h-[400px] flex items-center justify-center text-muted-foreground">
                    <p>Issue list will appear here.</p>
                </Card>
            </div>

        </BetaTag>
    );
};
