import { Button } from "@repo/ui/button";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useApi } from "@/ApiProvider";
import { CheckCircle, Copy, Home, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _ = useApi();

  useEffect(() => {
    _.api.user.fetchuser(dispatch);
  }, []);

  const copyToClipboard = () => {
    if (reference) {
      navigator.clipboard.writeText(reference);
      toast.success("Reference ID copied!");
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-card border border-border rounded-2xl shadow-xl p-8 flex flex-col items-center text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your transaction has been completed
            successfully.
          </p>
        </div>

        {reference && (
          <div className="w-full bg-muted/50 rounded-lg p-4 flex items-center justify-between border border-border">
            <div className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Reference ID
              </span>
              <span className="font-mono text-sm font-medium text-foreground">
                {reference}
              </span>
            </div>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-background rounded-md transition-colors text-muted-foreground hover:text-foreground"
              title="Copy Reference ID"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="w-full grid grid-cols-2 gap-3 pt-4">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
          <Button
            className="w-full gap-2 bg-primary hover:bg-primary/90"
            onClick={() => navigate("/exam/join")}
          >
            <BookOpen className="w-4 h-4" />
            Exams
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
