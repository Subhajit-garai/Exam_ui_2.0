import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApi } from "@/ApiProvider";
import { toast } from "react-toastify";
import { ToastConfig } from "@repo/lib/utils/utils";
import { useAppSelector } from "@repo/store/hook";
import { Card } from "@repo/design-system/card/Card";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { LoaderFive } from "@/design-system/loader/loader";
import { ArrowLeft, Tag, Info, CheckCircle, AlertCircle } from "lucide-react";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const _ = useApi();
    const { name, email, contact } = useAppSelector((state) => state.user);

    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Get data from navigation state
    const { plan: planName, price: originalPrice, type } = location.state || {};

    useEffect(() => {
        if (!planName || !originalPrice || !type) {
            toast.error("Invalid checkout session", ToastConfig());
            navigate("/payment");
        }
    }, [planName, originalPrice, type, navigate]);

    const finalPrice = Math.max(0, originalPrice - discount);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponMessage({ type: 'error', text: "Please enter a coupon code" });
            return;
        }

        setVerifying(true);
        setCouponMessage(null);

        try {
            const response = await _.api.payment.applyCoupon({
                couponCode: couponCode,
                orderAmount: (originalPrice * 100),
            });

            if (response.success) {
                setDiscount((response.data.discountAmount / 100) || 0); // Assuming API returns discountAmount
                setIsCouponApplied(true);
                setCouponMessage({ type: 'success', text: "Coupon applied successfully!" });
                toast.success("Coupon applied!", ToastConfig());
            } else {
                setDiscount(0);
                setIsCouponApplied(false);
                setCouponMessage({ type: 'error', text: response.message || "Invalid coupon code" });
            }
        } catch (error: any) {
            setDiscount(0);
            setIsCouponApplied(false);
            setCouponMessage({ type: 'error', text: error.message || "Failed to apply coupon" });
        } finally {
            setVerifying(false);
        }
    };

    const handleRemoveCoupon = () => {
        setCouponCode("");
        setDiscount(0);
        setIsCouponApplied(false);
        setCouponMessage(null);
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            let key_res = await _.api.payment.getKey();
            if (!key_res) {
                toast.error(key_res.message, ToastConfig());
                setLoading(false);
                return;
            }
            const { key } = key_res;

            let response;
            const checkoutData = {
                amount: String(originalPrice * 100),
                plan: planName,
                type: type,
            };

            if (type === "SUBSCRIPTION") {
                response = await _.api.payment.SubscriptionCheckout(checkoutData, isCouponApplied ? couponCode : undefined);
            } else if (type === "TOKEN") {
                response = await _.api.payment.TokenCheckout(checkoutData, isCouponApplied ? couponCode : undefined);
            }

            if (!response.success) {
                toast.error(response.message, ToastConfig());
                setLoading(false);
                return;
            }

            const { order } = response;
            let PaymentSuccessurl = _.api.client.createUrl("/payment/paymentverification");

            var options = {
                key: key,
                amount: order.amount,
                currency: order.currency,
                name: "ExamBuddys",
                description: `Payment for ${planName}`,
                image: "./assets/logo/logo-svg.svg",
                order_id: order.id,
                callback_url: PaymentSuccessurl,
                prefill: {
                    name: name,
                    email: email,
                    contact: contact,
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const razor = new window.Razorpay(options);
            razor.open();

            // We don't turn off loading here because razorpay is open and we await callback or user action
            // But actually razorpay might be async in a way that doesn't block JS main thread like this
            // Usually we stop loading after opening, or keep it until success.
            setLoading(false);

        } catch (error: any) {
            toast.error(error.message || "Payment initialization failed", ToastConfig());
            setLoading(false);
        }
    };

    if (!planName) return <LoaderFive text="Loading..." />;

    return (
        <div className="w-full h-full min-h-screen bg-background p-4 md:p-8 overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="rounded-full hover:bg-muted"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        Checkout
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Order Details Column */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="p-6 shadow-sm border-border/60">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-primary" />
                                Order Details
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-border/40">
                                    <div>
                                        <p className="font-medium text-lg">{planName} Plan</p>
                                        <p className="text-sm text-muted-foreground capitalize">{type.toLowerCase()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl">₹{originalPrice}</p>
                                    </div>
                                </div>

                                {isCouponApplied && (
                                    <div className="flex justify-between items-center py-2 text-green-600 dark:text-green-400 bg-green-500/10 px-3 rounded-lg">
                                        <span className="flex items-center gap-2 text-sm font-medium">
                                            <Tag className="w-4 h-4" />
                                            Coupon Discount ({couponCode})
                                        </span>
                                        <span className="font-bold">- ₹{discount}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-bold">Total Payable</span>
                                    <span className="text-2xl font-extrabold text-primary">₹{finalPrice}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Payment Method - Placeholder for now as we use Razorpay
                        <Card className="p-6 shadow-sm border-border/60 opacity-80 cursor-not-allowed">
                            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-muted-foreground" />
                                Payment Method
                            </h2>
                            <p className="text-sm text-muted-foreground">Redirecting to Razorpay secure gateway...</p>
                        </Card> */}
                    </div>

                    {/* Coupon & Summary Column */}
                    <div className="space-y-6">
                        <Card className="p-6 shadow-sm border-border/60">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-primary" />
                                Have a Coupon?
                            </h3>

                            <div className="space-y-3">
                                <div className="relative">
                                    <Input
                                        placeholder="Enter code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        disabled={isCouponApplied || verifying}
                                        className="pr-20 uppercase font-mono tracking-wider"
                                    />
                                    {isCouponApplied && (
                                        <button
                                            onClick={handleRemoveCoupon}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-500 hover:underline font-medium"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                {!isCouponApplied && (
                                    <Button
                                        className="w-full"
                                        variant="outline"
                                        onClick={handleApplyCoupon}
                                        disabled={!couponCode || verifying}
                                    >
                                        {verifying ? (
                                            <LoaderFive text="Applying..." />
                                        ) : "Apply Coupon"}
                                    </Button>
                                )}

                                {couponMessage && (
                                    <div className={`text-xs flex items-start gap-2 p-2 rounded-md ${couponMessage.type === 'success'
                                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                                        : 'bg-red-500/10 text-red-600 dark:text-red-400'
                                        }`}>
                                        {couponMessage.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                                        <span>{couponMessage.text}</span>
                                    </div>
                                )}
                            </div>
                        </Card>

                        <Button
                            className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                            onClick={handlePayment}
                            disabled={loading}
                            size="lg"
                        >
                            {loading ? "Processing..." : `Pay ₹${finalPrice}`}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground px-4">
                            By clicking "Pay", you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
