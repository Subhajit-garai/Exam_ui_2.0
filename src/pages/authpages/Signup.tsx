import { Textinput } from "@repo/design-system/inputs";
import useHandleinpute from "@repo/hooks/useHandleInpute";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/design-system/card";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastConfig } from "@repo/lib/utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useApi } from "@/ApiProvider.js";
import type { InputOption } from "@repo/types/Input";


let loginOptions: InputOption[] = [
  {
    id: "1",
    inputId: "input-name",
    placeholder: "Enter full name",
    required: true,
    name: "name",
  },
  {
    id: "2",
    inputId: "input-email",
    placeholder: "Enter Email",
    required: true,
    name: "email",
  },
  {
    id: "3",
    inputId: "input-telegram",
    placeholder: "Enter telegram id",
    required: true,
    name: "telegram",
    type: "number",

  },
  {
    id: "4",
    inputId: "input-password",
    placeholder: "Enter password",
    required: true,
    name: "password",

  },
];

const Signup = () => {
  let { value, handleInputefn } = useHandleinpute({
    name: "",
    email: "",
    password: "",
    telegram: "",
  });



  const _ = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupfn = async () => {

    let url = _.api.client.createUrl("/user/signup");
    await axios
      .post(url, value, { withCredentials: true })
      .then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message, ToastConfig());
          _.api.user.fetchuser(dispatch);
          navigate("/user/validation?email=" + value.email, { replace: true });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, ToastConfig());
      });
  };
  return (
    <>
      <div className="main flex justify-center">
        <Card className="inputCont w-fit flex-col p-8 rounded-lg">
          <div className="gap-2 flex-col flex">
            <h2 className="text-center font-bold capitalize  text-primary ">Sign up now</h2>
            <Textinput
              options={loginOptions}
              handleInputefn={handleInputefn}
              value={value}
            />
            <Link to={"/login"}><p className=" underline font-bold text-sm text-muted-foreground text-center hover:text-blue-500">or log in</p></Link>
            {/* <Link><p className=" underline font-bold text-sm text-muted-foreground">forgot password</p></Link> */}
          </div>
          <div className="btc mt-4 w-full flex justify-center">
            <Button color="blue" onClick={signupfn}>
              Sign up
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Signup;
