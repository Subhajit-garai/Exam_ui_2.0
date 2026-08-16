import { Button } from "@repo/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full flex flex-col items-center text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="w-32 h-32 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"
        >
          <AlertTriangle className="w-16 h-16 text-red-600 dark:text-red-400" />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-8xl font-black text-primary/20 select-none">
            404
          </h1>
          <h2 className="text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button
            className="gap-2 bg-primary hover:bg-primary/90"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
