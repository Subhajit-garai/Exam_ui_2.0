import { Button } from "@repo/ui/button";
import { Card } from "@repo/design-system/card";
import { useEffect, useState, type ElementType } from "react";
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
import type { user_social_type } from "@/store/index.js";

const ValidationUserPage = () => {
  let { social } = useAppSelector(
    (state) => state.user
  );


  // let [telegram, settelegram] = useState<user_social_type>({
  //   platform: "telegram",
  //   link: "",
  //   isVerified: false
  // });

  let [email, setemail] = useState<user_social_type>({
    platform: "telegram",
    link: "",
    isVerified: false
  });
  useEffect(() => {

    if (social) {
      social.map((link) => {
        // if (link.platform === "telegram") {
        //   settelegram(link)
        // }
        if (link.platform === "email") {
          setemail(link)
        }
      })

    }
  }, [social])

  let [sendTokengen, setsendTokengen] = useState(false);

  // let telegramIdOption: InputOption[] = [
  //   {
  //     id: "1",
  //     inputId: "input-telegramid",
  //     placeholder: telegram.link,
  //     required: true,
  //     name: "token",
  //     disabled: sendTokengen ? false : true,
  //   },
  // ];
  let emailOption: InputOption[] = [
    {
      id: "1",
      inputId: "input-email",
      placeholder: email ? email.link : "",
      required: true,
      name: "token",
      disabled: sendTokengen ? false : true,
    },
  ];

  const _ = useApi();

  const dispatch = useAppDispatch();
  let { value, handleInputefn, setValue } = useHandleinpute({
    token: "",
    email: email ? email.link : "",
  });

  useEffect(() => {
    _.api.user.fetchuser(dispatch);
  }, []);

  return (
    <div className=" flex gap-4">
      {email.isVerified ? (
        <>
          <VerificationSuccessDisplayinfoCont
            title={"Email Verified"}
            Icon={ShieldCheck}
            data={email.link}
          // btntext={"Validate agin"}
          />

          {/* {telegram.isVerified ? (
            <>
              <VerificationSuccessDisplayinfoCont
                title={"Telegram ID Verified"}
                Icon={ShieldCheck}
                data={telegram.link}
              // btntext={"Validate agin"}
              />
            </>
          ) : (
            <>
              <VerificationRequirdCard
                title={"Telegram Verification"}
                btntext={"Validate"}
                option={telegramIdOption}
                value={value}
                handleInputefn={handleInputefn}
                isotpSend={sendTokengen}
                Icon={ShieldX}
                otpsendfn={() => {
                  _.api.user
                    .genTockenFroTelegram({ telegramid: telegram.link })
                    .then((response: any) => {
                      if (response?.success) {
                        toast.success(response.message, ToastConfig());
                        setsendTokengen(true);
                      }
                    })
                    .catch((error: any) => {
                      console.log(error.response.data);
                      toast.error(error.response.data, ToastConfig());
                      // toast.info(<GotoSignUpPage />, ToastConfig());
                      setsendTokengen(false);
                    });
                }}
                submitfn={() => {
                  _.api.user
                    .veryfyTockenFroTelegram({ email: email.link, token: value.token })
                    .then((response: any) => {
                      if (response?.success) {
                        toast.success(response.message, ToastConfig());
                        _.api.user.fetchuser(dispatch);
                        setsendTokengen(false);
                      }
                    })
                    .catch((error: any) => {
                      toast.error(error.response.data, ToastConfig());
                      // toast.info(<GotoSignUpPage />, ToastConfig());
                      setsendTokengen(true);
                    });
                }}
              />
            </>
          )} */}



        </>
      ) : (
        <>
          <VerificationRequirdCard
            title={"Email Verification"}
            btntext={"Validate"}
            option={emailOption}
            value={value}
            Icon={ShieldX}
            handleInputefn={handleInputefn}
            isotpSend={sendTokengen}
            otpsendfn={() => {
              _.api.user
                .genTockenFroEmail({ email: email.link })
                .then((response: any) => {
                  if (response.success) {
                    toast.success(response.message, ToastConfig());
                    setsendTokengen(true);
                  }
                })
                .catch((error: any) => {
                  toast.error(error.response.data, ToastConfig());
                  // toast.info(<GotoSignUpPage />, ToastConfig());
                  setsendTokengen(false);
                });
            }}
            submitfn={() => {
              _.api.user
                .veryfyTockenFroEmail({ email: email.link, token: value.token })
                .then((response: any) => {
                  if (response.success) {
                    toast.success(response.message, ToastConfig());
                    _.api.user.fetchuser(dispatch);
                    // navigate("/home");
                    setsendTokengen(false);
                    setValue({
                      token: "",
                      email: "",
                    });
                  }
                })
                .catch((error: any) => {
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

export const VerificationRequirdCard = ({
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
    <Card className="w-full min-w-[20rem] max-w-[24rem] p-6 gap-6 items-center flex flex-col shadow-sm border-red-500/30">
      <div className="flex flex-col gap-3 items-center justify-center text-red-600 dark:text-red-400">
        <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
          <Icon size={32} strokeWidth={2.5} />
        </div>
        <h1 className="text-center text-xl font-bold tracking-tight">{title}</h1>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="w-full">
          <Textinput
            options={option}
            handleInputefn={handleInputefn}
            value={value}
          />
        </div>

        {isotpSend ? (
          <Button onClick={submitfn} className="w-full" variant="default">
            Submit
          </Button>
        ) : (
          <Button onClick={otpsendfn} className="w-full" variant="outline">
            {btntext}
          </Button>
        )}
      </div>
    </Card>
  );
};

export const VerificationSuccessDisplayinfoCont = ({
  title,
  Icon,
  data,
}: {
  title: string;
  Icon: ElementType;
  data: any;
}) => {
  return (
    <Card className="w-full min-w-[20rem] max-w-[24rem] p-6 gap-5 items-center flex flex-col shadow-sm border-green-500/30">
      <div className="flex flex-col gap-3 items-center justify-center text-green-600 dark:text-green-400">
        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
          <Icon size={32} strokeWidth={2.5} />
        </div>
        <h1 className="text-center text-xl font-bold tracking-tight">{title}</h1>
      </div>
      <div className="w-full bg-secondary/50 p-3 rounded-md border border-border text-center font-medium text-sm text-muted-foreground break-all">
        {data}
      </div>
    </Card>
  );
};

export const ValidationForgotpassword = () => {
  const navigate = useNavigate();
  const _ = useApi();

  let [searchParams] = useSearchParams();
  let email = searchParams.get("email");

  let emailOption: InputOption[] = [
    {
      id: "1",
      inputId: "input-Forgotpassword",
      placeholder: "Your Forgot Password Token",
      required: true,
      name: "ForgotpasswordToken",
      disabled: false,
    },
    {
      id: "2",
      inputId: "input-newpassword",
      placeholder: "Your New Password",
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
      .forgotpasswordverify(data)
      .then((response: any) => {
        toast.success(response.data.message, ToastConfig());
        navigate("/login");
      })
      .catch((error: any) => {
        toast.error(error.response.data.message, ToastConfig());
        toast.info(<GotoSignUpPage />, ToastConfig());
      });
  };

  useEffect(() => { }, []);

  return (
    <div className="flex-1 overflow-auto relative flex  flex-col items-center ">
      <div className="cont w-[25rem]">
        <Card>
          <h1 className=" text-center"> Verify Forgot Password Token </h1>
          <Textinput
            options={emailOption}
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
