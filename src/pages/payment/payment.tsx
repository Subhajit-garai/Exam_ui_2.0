import { useEffect, useState } from "react";
import { PaymentOfferCard, PaymentSubcriptionCard } from "./PaymentOfferCard";
import { toast } from "react-toastify";
import { ToastConfig } from "@repo/lib/utils/utils";
import { Award } from "lucide-react";
import { Currencyicon } from "@repo/design-system/OwnCurrency";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";
import type { Dispatch } from "@reduxjs/toolkit";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const buySubscription = async (
  price: number,
  plan: string,
  dispatch: Dispatch
) => {
  const _ = useApi();
  let responce = await _.api.payment.SubscriptionCheckout({
    amount: String(price),
    plan: plan,
  });

  if (responce.success) {
    toast.success(responce.message, ToastConfig());
    _.api.user.fetchuser(dispatch);
  } else {
    toast.error(responce.message, ToastConfig());
  }
};
const Payment = () => {
  const _ = useApi();
  const dispatch = useAppDispatch();
  const [tokens, setTokens] = useState<any[]>([]);
  const [subcriptions, setSubcriptions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let offerandSubcription = await _.api.payment.getOfferAndSubscription();
      if (offerandSubcription.success) {
        let tokenData = [];
        let subcriptionData = [];

        offerandSubcription.data.map((item: any) => {
          switch (item.type) {
            case "subcription":
              subcriptionData.push(item);
              break;
            case "token":
              tokenData.push(item);
              break;

            default:
              console.log("not match");
              break;
          }

          setSubcriptions(subcriptionData);
          setTokens(tokenData);
        });
      }
    })();
  }, []);

  let { name, email, contact } = useAppSelector((state) => state.user);

  const checkout = async (price: number, token: number) => {
    let key_res = await _.api.payment.getKey();

    if (!key_res) {
      return toast.error(key_res.message, ToastConfig());
    }

    const { key } = key_res;

    let responce = await _.api.payment.Checkout({
      amount: price,
      token: token,
    });

    if (!responce.success) {
      return toast.error(responce.message, ToastConfig());
    }

    const { order } = responce;

    let PaymentSuccessurl = _.api.client.createUrl("/payment/paymentverification");

    var options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "exambuddys", //your business name
      description: "exambuddys  Transaction",
      image: "./assets/logo/logo-svg.svg",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: PaymentSuccessurl,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: name, //your customer's name
        email: email,
        contact: contact, //Provide the customer's phone number for better conversion rates
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
  };

  const SubscriptionCheckoutfn = async (price:number, plan:string) => {
    const confirmed = window.confirm(
      "Are you sure you want to buy this subscription?"
    );
    if (confirmed) {
      // Proceed with payment logic
      buySubscription(price, plan, dispatch);
    }
  };

  let PaymentOptions = [
    {
      id: 1,
      title: "Token",
      icon: () => <Currencyicon color="#6366f1" />,
      isDisable: false,
      component: (
        <PaymentOptionsCont
          type={"Token"}
          data={tokens}
          checkoutFN={checkout}
        />
      ),
    },
    {
      id: 2,
      title: "Subscription",
      icon: () => <Award color="#e1e515" />,
      isDisable: false,
      component: (
        <PaymentOptionsCont
          type="Subscription"
          data={subcriptions}
          checkoutFN={SubscriptionCheckoutfn}
        />
      ),
    },
  ];
  return (
    <div className="  h-full ">
      <main className="  h-full mx-auto  flex flex-col gap-4 overflow-auto py-6 lg:px-8 mb-20">
        {/* <TabManue
          config={PaymentOptions}
          parentClass={""}
          variant="underline"
        /> */}
      </main>
    </div>
  );
};

export default Payment;

export const PaymentOptionsCont = ({
  type = "offer",
  data,
  checkoutFN,
}: {
  type: "offer" | "Subscription" |"Token";
  data: any;
  checkoutFN:any;
}) => {
  return (
    <>
      <div className=" flex flex-wrap  md:flex-row  items-center  justify-center  gap-2 md:gap-8 ">
        {data.map((sub: any, idx: any) => {
          return type == "Subscription" ? (
            <PaymentSubcriptionCard
              key={idx}
              data={sub}
              checkout={checkoutFN}
            />
          ) : (
            <PaymentOfferCard key={idx} data={sub} checkout={checkoutFN} />
          );
        })}
      </div>
    </>
  );
};

// export const SubscriptionTiers = () => {
//   const tiers = [
//     { label: "GOLD", color: "bg-yellow-400", textColor: "text-yellow-800" },
//     { label: "SILVER", color: "bg-gray-300", textColor: "text-gray-700" },
//     { label: "BRONZE", color: "bg-amber-500", textColor: "text-amber-900" },
//   ];

//   return (
//     <div className="flex justify-center gap-8 py-8">
//       {tiers.map((tier) => (
//         <div
//           key={tier.label}
//           className={`w-32 h-32 rounded-full shadow-md flex flex-col justify-center items-center ${tier.color}`}
//         >
//           <div className="text-2xl font-bold uppercase tracking-wide">
//             <span className={tier.textColor}>{tier.label}</span>
//           </div>
//           <div className="text-sm mt-1 text-white">★</div>
//         </div>
//       ))}
//     </div>
//   );
// };
