import { Button } from "@repo/ui/button";
import { Card } from "@repo/design-system/card";
import  { useEffect, useState, type ElementType } from "react";
import { Textinput } from "@repo/design-system/inputs";
import useHandleinpute, {
  type handleInputefn_type,
} from "@repo/hooks/useHandleInpute";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GotoSignUpPage } from "../authpages/Login.js";
import { ToastConfig } from "@repo/lib/utils/utils";
import { ShieldCheck, ShieldX } from "lucide-react";
import { useApi } from "@/ApiProvider.js";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import type { InputOption } from "@repo/types/Input.js";

const ValidationUserPage = () => {
  let { email, telegramid, verification } = useAppSelector(
    (state) => state.user
  );

  let [sendTokengen, setsendTokengen] = useState(false);
  let telegramidOption: InputOption[] = [
    {
      id: "1",
      inputId: "input-telegramid",
      placeholder: telegramid,
      required: true,
      name: "token",
      disabled: sendTokengen ? false : true,
    },
  ];
  let EmailOption: InputOption[] = [
    {
      id: "1",
      inputId: "input-email",
      placeholder: email ? email : "",
      required: true,
      name: "token",
      disabled: sendTokengen ? false : true,
    },
  ];

  const _ = useApi();

  const dispatch = useAppDispatch();
  let { value, handleInputefn, setValue } = useHandleinpute({
    token: "",
    email: email ? email : "",
  });

  useEffect(() => {
    _.api.user.fetchuser(dispatch);
  }, []);

  return (
    <div className="">
      {verification?.email ? (
        <>
          <VerificationSuccessDisplayinfoCont
            title={"email verified"}
            Icon={ShieldCheck}
            data={email}
            // btntext={"Validate agin"}
          />

          {verification?.telegram ? (
            <>
              <VerificationSuccessDisplayinfoCont
                title={"Telegram id verified"}
                Icon={ShieldCheck}
                data={telegramid}
                // btntext={"Validate agin"}
              />
            </>
          ) : (
            <>
              <TokenValidationCard
                title={"Telegram  verification"}
                btntext={"validate"}
                option={telegramidOption}
                value={value}
                handleInputefn={handleInputefn}
                isotpSend={sendTokengen}
                Icon={ShieldX}
                otpsendfn={() => {
                  _.api.user
                    .genTockenFroTelegram({ telegramid: telegramid })
                    .then((response:any) => {
                      if (response?.success) {
                        toast.success(response.message, ToastConfig());
                        setsendTokengen(true);
                      }
                    })
                    .catch((error:any) => {
                      console.log(error.response.data);
                      toast.error(error.response.data, ToastConfig());
                      // toast.info(<GotoSignUpPage />, ToastConfig());
                      setsendTokengen(false);
                    });
                }}
                submitfn={() => {
                  _.api.user
                    .veryfyTockenFroTelegram(value)
                    .then((response:any) => {
                      if (response?.success) {
                        toast.success(response.message, ToastConfig());
                        _.api.user.fetchuser(dispatch);
                        setsendTokengen(false);
                      }
                    })
                    .catch((error:any) => {
                      toast.error(error.response.data, ToastConfig());
                      // toast.info(<GotoSignUpPage />, ToastConfig());
                      setsendTokengen(true);
                    });
                }}
              />
            </>
          )}
        </>
      ) : (
        <>
          <TokenValidationCard
            title={"Email verification"}
            btntext={"validate"}
            option={EmailOption}
            value={value}
            Icon={ShieldX}
            handleInputefn={handleInputefn}
            isotpSend={sendTokengen}
            otpsendfn={() => {
              _.api.user
                .genTockenFroEmail({ email: email })
                .then((response:any) => {
                  if (response.success) {
                    toast.success(response.message, ToastConfig());
                    setsendTokengen(true);
                  }
                })
                .catch((error:any) => {
                  toast.error(error.response.data, ToastConfig());
                  // toast.info(<GotoSignUpPage />, ToastConfig());
                  setsendTokengen(false);
                });
            }}
            submitfn={() => {
              _.api.user
                .veryfyTockenFroEmail(value)
                .then((response:any) => {
                  if (response.success) {
                    toast.success(response.message, ToastConfig());
                    _.api.user.fetchuser(dispatch);
                    // navigate("/home");
                    setsendTokengen(false);
                    setValue({
                      token: "",
                    });
                  }
                })
                .catch((error:any) => {
                  toast.error(error.response.data, ToastConfig());
                  // toast.info(<GotoSignUpPage />, ToastConfig());
                  setsendTokengen(true);
                });
            }}
          />
        </>
      )}
    </div>
  );
};

export const TokenValidationCard = ({
  title,
  handleInputefn,
  value,
  btntext,
  option,
  otpsendfn,
  submitfn,
  Icon,
  isotpSend,
}: {
  title: string;
  handleInputefn: handleInputefn_type;
  value: any;
  btntext: string;
  option: InputOption[];
  otpsendfn: () => void;
  submitfn: () => void;
  Icon: ElementType;
  isotpSend: boolean;
}) => {
  return (
    <Card className="w-fit p-4  gap-4 items-center">
      <span className="flex gap-2 items-center justify-center">
        <Icon color="red" />
        <h1 className=" text-center text-lg">{title} </h1>
      </span>

      <Textinput
        options={option}
        handleInputefn={handleInputefn}
        value={value}
      />
      {isotpSend ? (
        <Button onClick={submitfn}>Submit</Button>
      ) : (
        <Button onClick={otpsendfn}>{btntext}</Button>
      )}
    </Card>
  );
};

export const VerificationSuccessDisplayinfoCont = ({
  title,
  Icon,
  data,
  // btntext,
}: {
  title: string;
  Icon: ElementType;
  data: any;
  // btntext: string;
}) => {
  return (
    <>
      <Card className="card">
        <span className="flex gap-2 justify-center">
          <h1 className=" text-center text-lg">{title} </h1>
          <Icon color="lightgreen" />
        </span>
        <input type="text" size={30} value={data} />

        {/* <Button onClick={() => {}}>{btntext}</Button> */}
      </Card>
    </>
  );
};

export const ValidationForgotpassword = () => {
  const navigate = useNavigate();
  const _ = useApi();

  let [serchparems] = useSearchParams();
  let email = serchparems.get("email");

  let EmailOption: InputOption[] = [
    {
      id: "1",
      inputId: "input-Forgotpassword",
      placeholder: "your Forgot password token",
      required: true,
      name: "ForgotpasswordToken",
      disabled: false,
    },
    {
      id: "2",
      inputId: "input-newpassword",
      placeholder: "your newpassword ",
      required: true,
      name: "newpassword",
      disabled: false,
    },
  ];

  let { value, handleInputefn } = useHandleinpute({
    ForgotpasswordToken: "",
    newpassword: "",
  });

  const forgotpasswordToken_verify = async () => {
    console.log("forgotpasswordToken_validate");
    let data = {
      email,
      ForgotpasswordToken: value.ForgotpasswordToken,
      newpassword: value.newpassword,
    };
    await _.api.user
      .forgotpassword(data)
      .then((response:any) => {
        toast.success(response.data.message, ToastConfig());
        navigate("/login");
      })
      .catch((error:any) => {
        toast.error(error.response.data.message, ToastConfig());
        toast.info(<GotoSignUpPage />, ToastConfig());
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="flex-1 overflow-auto relative flex  flex-col items-center ">
      <div className="cont w-[25rem]">
        <Card>
          <h1 className=" text-center"> verify Forgotpassword Token </h1>
          <Textinput
            options={EmailOption}
            handleInputefn={handleInputefn}
            value={value}
          />
          <Button onClick={forgotpasswordToken_verify}>verify</Button>
        </Card>
      </div>
    </div>
  );
};

export default ValidationUserPage;
