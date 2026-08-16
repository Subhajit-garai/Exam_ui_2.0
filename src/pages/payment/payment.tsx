import { useEffect, useState } from "react";
import { PaymentSubcriptionCard__2, PaymentTokenCard__2 } from "./components/PaymentOfferCard";
import { useNavigate } from "react-router-dom";
import { Card } from "@repo/design-system/card/Card";
import { useApi } from "@/ApiProvider";
import { LoaderFive } from "@/design-system/loader/loader";
import { Tabs } from "@/design-system/tabs/Tabs";
import type { PurchaseType } from "@/lib/constants/question.constants.type";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = () => {
  const _ = useApi();
  const [tokens, setTokens] = useState<any[]>([]);
  const [subcriptions, setSubcriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let offerandSubcription = await _.api.payment.getOfferAndSubscription();
      if (offerandSubcription.success) {
        let tokenData = [];
        let subcriptionData = [];

        offerandSubcription.data.map((item: any) => {
          switch (item.type as PurchaseType) {
            case "SUBSCRIPTION":
              subcriptionData.push(item);
              break;
            case "TOKEN":
              tokenData.push(item);
              break;

            default:
              console.log("not match");
              break;
          }

          setSubcriptions(subcriptionData);
          setTokens(tokenData);

          setLoading(false);
        });
      }
    })();
  }, []);

  // let { name, email, contact } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const checkout = async (amount: number, plan: string, type: string) => {
    navigate("/payment/checkout", { state: { plan, price: amount, type } });
  };

  const SubscriptionCheckoutfn = async (
    price: number,
    plan: string,
    type: PurchaseType
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to buy this subscription?"
    );
    if (confirmed) {
      checkout(price, plan, type);
    }
  };
  const TokenCheckoutfn = async (price: number, plan: string, type: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to buy this token plan?"
    );
    if (confirmed) {
      checkout(price, plan, type);
    }
  };

  const PaymentTabs = [
    {
      title: "Subscription",
      value: "Subscription",
      content: (
        <Card
          key={`Subscription`}
          className="w-full overflow-y-auto relative h-full px-2 py-4 rounded-xl font-bold text-primary bg-card"
        >
          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <PaymentOptionsCont
              type="SUBSCRIPTION"
              data={subcriptions}
              checkoutFN={SubscriptionCheckoutfn}
            />
          )}
        </Card>
      ),
    },
    {
      title: "Token",
      value: "Token",
      content: (
        <Card
          key={`Token`}
          className="w-full overflow-y-auto relative h-full px-2 py-4 rounded-xl font-bold text-primary bg-card"
        >
          {loading ? (
            <LoaderFive text="Loading..." />
          ) : (
            <PaymentOptionsCont
              type="TOKEN"
              data={tokens}
              checkoutFN={TokenCheckoutfn}
            />
          )}
        </Card>
      ),
    },
  ];

  return (
    <div className="main w-full h-full overflow-auto no-visible-scrollbar">
      <div className="flex-1 md:h-160  relative  mb-20 md:mb-0 ">
        <div className="h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
          <Tabs
            tabs={PaymentTabs}
            contentClassName="mt-10"
            activeTabClassName=""
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;

export const PaymentOptionsCont = ({
  type = "SUBSCRIPTION",
  data,
  checkoutFN,
}: {
  type: PurchaseType;
  data: any;
  checkoutFN: any;
}) => {
  return (
    <>
      <div className=" flex  w-full h-full  py-8 flex-wrap  md:flex-row  items-center  justify-center  gap-2 overflow-auto no-visible-scrollbar">
        {data.map((sub: any, idx: any) => {
          return type == "SUBSCRIPTION" ? (
            <PaymentSubcriptionCard__2
              key={idx}
              data={sub}
              checkout={checkoutFN}
            />
          ) : (
            <PaymentTokenCard__2 key={idx} data={sub} checkout={checkoutFN} />
          );
        })}
      </div>
    </>
  );
};
