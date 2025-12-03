import { Card } from "@/design-system";
import { Button } from "@repo/ui/button";
import { IconPremiumRights, IconCheck, IconX, IconClock } from "@tabler/icons-react";
import type { ExamType, PrimeStatus as PrimeStatusType } from "@/lib/constants/question.constants.type";
import { useEffect, useState } from "react";
import { useApi } from "@/ApiProvider";
import { useNavigate } from "react-router-dom";

// Types matching the Prisma model
export const PrimeStatus = {
    None: "None",
    Bronze: "Bronze",
    Silver: "Silver",
    Gold: "Gold"
} as const;

export interface TierBenefit {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    tierId: string;
    feature: ExamType;
    access: boolean;
    limit: number | null;
    used: number | null;
}

export interface SubscriptionDetailsResponse {
    currentPlan: PrimeStatusType;
    expiry: Date | undefined;
    expiryInday: number | null | undefined;
    tierDetails: ({
        benefits: TierBenefit[];
    } & {
        id: string;
        name: PrimeStatusType;
        createdAt: Date;
        updatedAt: Date;
    }) | null;
    lastPayment: {
        amount: number;
        date: Date;
        orderId: string;
    } | null;
}

export const SubscriptionDetails = () => {
    const { api } = useApi();
    const [subscription, setSubscription] = useState<SubscriptionDetailsResponse | null>(null);
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const res = await api.user.getSubscriptionTiers();
                if (res.success) {
                    setSubscription(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch subscription details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscription();
    }, []);

    if (loading) {
        return <Card className="p-6 h-full flex items-center justify-center">Loading subscription details...</Card>;
    }

    if (!subscription || !subscription.tierDetails) {
        return (
            <Card className="p-6 relative overflow-hidden flex flex-col ">
                <div className="text-center text-muted-foreground">No active subscription found.</div>
                <div className="mt-4">
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 shadow-md transition-all hover:shadow-lg">
                        View Plans
                    </Button>
                </div>
            </Card>
        );
    }

    const { currentPlan, expiryInday, tierDetails, lastPayment } = subscription;

    // Determine color based on plan
    let color = "bg-gray-500";
    if (currentPlan === PrimeStatus.Bronze) color = "bg-amber-600";
    if (currentPlan === PrimeStatus.Silver) color = "bg-slate-400";
    if (currentPlan === PrimeStatus.Gold) color = "bg-yellow-500";

    return (
        <Card className="p-6 relative overflow-hidden flex flex-col ">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <IconPremiumRights size={120} />
            </div>

            <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-semibold">Subscription Plan</h3>
                        <p className="text-muted-foreground text-sm">Manage your billing and plan details</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${color}/10 text-${color.replace('bg-', '')} text-sm font-medium border ${color}/20`}>
                        {currentPlan}
                    </div>
                </div>

                <div className="bg-secondary/10 rounded-lg p-4 mb-4 border border-border">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-lg">{currentPlan} Tier</span>
                        <div className="text-right">
                            <span className="text-xl font-bold">
                                {lastPayment ? `$${lastPayment.amount}` : "Free"}
                            </span>
                            {expiryInday !== null && expiryInday !== undefined && (
                                <div className="flex items-center gap-1 text-xs text-orange-500 font-medium mt-1">
                                    <IconClock size={12} />
                                    <span>Expires in {expiryInday} days</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-3 mt-4">
                        {tierDetails.benefits.map((benefit) => (
                            <div key={benefit.id} className="flex items-center gap-3 text-sm">
                                {benefit.access ? (
                                    <div className="p-1 rounded-full bg-green-500/10 text-green-500">
                                        <IconCheck size={14} />
                                    </div>
                                ) : (
                                    <div className="p-1 rounded-full bg-red-500/10 text-red-500">
                                        <IconX size={14} />
                                    </div>
                                )}
                                <div className="flex flex-col w-full">
                                    <div className="flex justify-between items-center">
                                        <span className={benefit.access ? "text-foreground" : "text-muted-foreground"}>
                                            {benefit.feature} Access
                                        </span>
                                        {benefit.limit && currentPlan !== PrimeStatus.None && (
                                            <span className="text-xs text-muted-foreground">
                                                {benefit.used || 0} / {benefit.limit > 1000 ? "∞" : benefit.limit}
                                            </span>
                                        )}
                                    </div>
                                    {benefit.limit && benefit.limit < 1000 && currentPlan !== PrimeStatus.None && (
                                        <div className="w-full bg-secondary h-1.5 rounded-full mt-1 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${benefit.access ? 'bg-green-500' : 'bg-gray-300'}`}
                                                style={{ width: `${Math.min(100, ((benefit.used || 0) / benefit.limit) * 100)}%` }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-auto">
                {currentPlan !== PrimeStatus.Gold && (
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 shadow-md transition-all hover:shadow-lg"
                        onClick={() => { navigate('/payment') }}
                    >
                        Upgrade Plan
                    </Button>
                )}
            </div>
        </Card>
    );
};
