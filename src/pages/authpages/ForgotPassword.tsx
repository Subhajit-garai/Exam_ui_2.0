
import useHandleinpute from "@repo/hooks/useHandleInpute";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/design-system/card/Card";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { KeyRound, ArrowRight } from "lucide-react";
import { ToastConfig } from "@repo/lib/utils/utils";
import { Textinput } from "@repo/design-system/inputs/InputComponents";
import { useApi } from "@/ApiProvider.js";
import type { InputOption } from "@repo/types/Input";
import { GotoSignUpPage } from "./Login.js";

let forgotpasswordOptions: InputOption[] = [
  {
    id: "1",
    inputId: "input-email",
    placeholder: "Enter Email",
    required: true,
    name: "email",
  },
];

const ForgotPassword = () => {
  const _ = useApi();
  const navigate = useNavigate();

  let { value, handleInputefn } = useHandleinpute({
    email: "",
  });

  const forgotpasswordFn = async () => {
    let response = await _.api.user.forgotpassword(value);
    if (response.success) {
      toast.success(response.message, ToastConfig());
      navigate("/forgotpassword/verify?email=" + value.email);
    } else {
      toast.error(response.message, ToastConfig());
      toast.info(<GotoSignUpPage />, ToastConfig());
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] w-full p-4">
      <Card className="w-full min-w-[20rem] max-w-[24rem] p-8 gap-6 flex flex-col shadow-lg border-primary/20 rounded-xl relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        
        <div className="flex flex-col gap-3 items-center justify-center mt-2">
          <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-full text-primary shadow-inner">
            <KeyRound size={36} strokeWidth={2} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
              Forgot Password
            </h2>
            <p className="text-sm text-muted-foreground mt-2 px-2">
              Enter your registered email address and we'll send you a link to reset your password.
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5 mt-2">
          <Textinput
            options={forgotpasswordOptions}
            handleInputefn={handleInputefn}
            value={value}
          />
          
          <Button 
            onClick={forgotpasswordFn} 
            className="w-full font-semibold flex items-center justify-center gap-2 py-6 text-md"
            variant="default"
          >
            Send Reset Link
            <ArrowRight size={18} />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 mt-4 pt-4 border-t border-border/50">
          <Link to={"/login"} className="w-full">
            <Button variant="outline" className="w-full text-muted-foreground font-medium">
              Back to Sign In
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-primary font-bold hover:underline transition-all">
              Sign up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
