import { useEffect, useState } from "react";
import useHandleinpute from "@repo/hooks/useHandleInpute";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/design-system/card/Card";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ToastConfig } from "@repo/lib/utils/utils";
import { Textinput } from "@repo/design-system/inputs/InputComponents";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider.js";
import type { InputOption } from "@repo/types/Input";

let loginOptions: InputOption[] = [
  {
    id: "1",
    inputId: "input-email",
    placeholder: "Enter Email",
    required: true,
    name: "email",
  },
  {
    id: "2",
    inputId: "input-password",
    placeholder: "Enter password",
    required: true,
    name: "password",
  },
];
let forgotpasswordOptions: InputOption[] = [
  {
    id: "1",
    inputId: "input-email",
    placeholder: "Enter Email",
    required: true,
    name: "email",
  },
];

const Login = () => {
  const _ = useApi();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { islogin } = useAppSelector((state: any) => state.user);
  const [forgotpasswordPage, setForgotpasswordPage] = useState(false);

  useEffect(() => {
    if (islogin) {
      let lastPage = localStorage.getItem("lastPage");
      if (lastPage) {
        navigate(lastPage);
      } else {
        navigate("/home");
      }
    } else {
      toast.error("Login Required", ToastConfig());
    }
  }, [islogin]);

  useEffect(() => {
    // set user data
    _.api.user.fetchuser(dispatch);
    // console.log("user data loding ...");
  }, []);

  let { value, handleInputefn } = useHandleinpute({
    email: "",
    password: "",
  });

  const forgotpasswordToggle = () => {
    setForgotpasswordPage(!forgotpasswordPage);
  };

  const Loginfn = async () => {
    let url = _.api.client.createUrl("/user/signin");
    await axios
      .post(url, value, { withCredentials: true })
      .then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message, ToastConfig());
          _.api.user.fetchuser(dispatch);
          navigate(`/login/validate/email?email=${response.data.email}`);
          // navigate("/home");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, ToastConfig());
        toast.info(<GotoSignUpPage />, ToastConfig());
      });
  };

  const forgotpasswordFn = async () => {
    let url = _.api.client.createUrl("/user/forgotpassword");
    await axios
      .post(url, value, { withCredentials: true })
      .then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message, ToastConfig());

          navigate("/user/forgotpassword?email=" + value.email);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, ToastConfig());

        toast.info(<GotoSignUpPage />, ToastConfig());
      });
  };

  return (
    <>
      <div className=" flex justify-center">
        {forgotpasswordPage ? (
          <Card className="inputCont w-fit flex-col p-8 rounded-lg">
            <div className="gap-2 flex-col flex">
              <h2 className="text-center font-bold text-primary">
                forgot password
              </h2>
              <Textinput
                options={forgotpasswordOptions}
                handleInputefn={handleInputefn}
                value={value}
              />
            </div>
            <div className="link flex justify-between gap-5">
              <Link to={"/signup"}>
                <p className=" underline font-bold text-sm text-muted-foreground  hover:text-blue-500">
                  or sign up
                </p>
              </Link>
              <Link to={"#"} onClick={forgotpasswordToggle}>
                <p className=" underline font-bold text-sm text-muted-foreground hover:text-blue-500">
                  sign in
                </p>
              </Link>
            </div>
            <div className="btc mt-4 w-full flex justify-center">
              <Button color="blue" onClick={forgotpasswordFn}>
                forgot password
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="inputCont w-fit flex-col p-8 rounded-lg ">
            <div className="gap-2 flex-col flex">
              <h2 className="text-center text-primary font-bold capitalize ">
                Sign in now
              </h2>
              <Textinput
                options={loginOptions}
                handleInputefn={handleInputefn}
                value={value}
              />
              <div className="link flex justify-between gap-5">
                <Link to={"/signup"}>
                  <p className=" underline font-bold text-sm text-muted-foreground  hover:text-blue-500">
                    or sign up
                  </p>
                </Link>
                <Link to={"#"} onClick={forgotpasswordToggle}>
                  <p className=" underline font-bold text-sm text-muted-foreground hover:text-blue-500">
                    forgot password
                  </p>
                </Link>
              </div>
            </div>
            <div className="btc mt-4 w-full flex justify-center">
              <Button
                color="blue"
                className=" hover:text-hover cursor-pointer"
                onClick={Loginfn}
              >
                Log In
              </Button>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export const GotoSignUpPage = () => {
  return (
    <>
      <span className="flex gap-2 items-center">
        <Button color="blue" onClick={() => {}}>
          {/* //navigate("/signup") */}
          Go TO
        </Button>
        <p className="text-primary font-bold text-lg"> login page </p>
      </span>
    </>
  );
};

export default Login;
