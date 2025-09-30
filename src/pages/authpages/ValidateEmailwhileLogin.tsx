import { type ElementType, useState } from "react";
import useHandleinpute, {
  type handleInputefn_type,
} from "@repo/hooks/useHandleInpute";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastConfig } from "@repo/lib/utils/utils";
import { ShieldX } from "lucide-react";
import { useApi } from "@/ApiProvider.js";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/design-system/card";
import { Textinput } from "@repo/design-system/inputs";
import { type InputOption } from "@repo/types/Input";

const ValidateEmailwhileLogin = () => {
  const navigate = useNavigate();
  const _ = useApi();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  let [sendTokengen, setsendTokengen] = useState(false);

  let { value, handleInputefn } = useHandleinpute({
    token: "",
    email: email || "",
  });

  let EmailOption: InputOption[] = [
    {
      id: "1",
      inputId: "input-email",
      placeholder: email ?? "Enter Email ",
      required: true,
      name: "token",
      disabled: sendTokengen ? false : true,
      className:"min-w-[15rem]"
      
    },
  ];

  return (
    <div className=" flex justify-center ">
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
            .veryfyTockenFroEmail(value)
            .then((response: any) => {
              if (response.success) {
                toast.success(response.message, ToastConfig());
                navigate("/home");
              }
            })
            .catch((error: any) => {
              toast.error(error.response?.data?.message, ToastConfig());
              // toast.info(<GotoSignUpPage />, ToastConfig());
              setsendTokengen(true);
            });
        }}
      />
    </div>
  );
};

export default ValidateEmailwhileLogin;

export interface TokenValidationCardProps {
  title: string;
  handleInputefn: handleInputefn_type;
  value: Record<string, string>; // assuming you're binding inputs with name-based keys
  btntext: string;
  option: InputOption[];
  otpsendfn: () => void;
  submitfn: () => void;
  Icon?: ElementType; // optional JSX icon component
  isotpSend: boolean;
}

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
}: TokenValidationCardProps) => {
  return (
    <Card className="w-fit p-4  gap-4 items-center">
      <span className="flex gap-2">
        {Icon && <Icon color="red" />}
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

export interface VerificationSuccessDisplayinfoContProps {
  title: string;
  btntext?: string;
  Icon?: ElementType; // optional JSX icon component
  data: string | number | readonly string[] | undefined;
}

export const VerificationSuccessDisplayinfoCont = ({
  title,
  Icon,
  data,
}: // btntext,
VerificationSuccessDisplayinfoContProps) => {
  return (
    <>
      <Card className="card">
        <span className="flex gap-2 justify-center">
          <h1 className=" text-center text-lg">{title} </h1>
          {Icon && <Icon color="red" />}
        </span>
        <input disabled size={30} value={data} />
      </Card>
    </>
  );
};
