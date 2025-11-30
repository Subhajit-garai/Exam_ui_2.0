import { Button } from "@repo/ui/button";
import { Card } from "@repo/design-system/card/Card";
import { Currencyicon } from "@repo/design-system/OwnCurrency/Currency";

export function PaymentSubcriptionCard({
  data,
  checkout,
}: {
  data: any;
  checkout: (price: number, plan: string, type: string) => Promise<void>;
}) {
  let {
    type,
    price,
    title,
    time,
    offerActive,
    offerInActive,
    btncolor,
    buttontext = "Choose plan",
  } = data;


  return (
    <Card className="min-w-[20rem] max-w-sm  md:max-w-sm ">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">₹</span>
        <span className="text-5xl font-extrabold tracking-tight">{price}</span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400 flex  items-center gap-2">
          /{time}
        </span>
      </div>
      <ul className="my-7 space-y-5">
        {offerActive.map((text: any, i: number) => {
          return (
            <OfferActiveInactiveListCard key={i} isactive={true} text={text} />
          );
        })}
        {offerInActive.map((text: any, i: number) => {
          return (
            <OfferActiveInactiveListCard key={i} isactive={false} text={text} />
          );
        })}
      </ul>
      <Button
        color={`${btncolor ? btncolor : "blue"}`}
        onClick={() => checkout(price, title, type)}
      >
        {buttontext}
      </Button>
    </Card>
  );
}
export function PaymentTokenCard({
  data,
  checkout,
}: {
  data: any;
  checkout: (price: number, plan: string, type: string) => Promise<void>;
}) {
  let {
    type,
    price,
    title,
    token,
    offerActive,
    offerInActive,
    btncolor,
    buttontext = "Choose plan",
  } = data;


  return (
    <Card className=" min-w-[20rem] max-w-sm  md:max-w-sm ">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">₹</span>
        <span className="text-5xl font-extrabold tracking-tight">{price}</span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400 flex  items-center gap-2">
          /{token} <Currencyicon color="text-blue-600" />
        </span>
      </div>
      <ul className="my-7 space-y-5">
        {offerActive.map((text: any, i: number) => {
          return (
            <OfferActiveInactiveListCard key={i} isactive={true} text={text} />
          );
        })}
        {offerInActive.map((text: any, i: number) => {
          return (
            <OfferActiveInactiveListCard key={i} isactive={false} text={text} />
          );
        })}
      </ul>
      <Button
        color={`${btncolor ? btncolor : "blue"}`}
        onClick={() => {
          console.log("check out....");
          checkout(price,title,type);
        }}
      >
        {buttontext}
      </Button>
    </Card>
  );
}


export const OfferActiveInactiveListCard = ({
  isactive,
  text,
}: {
  isactive: boolean;
  text: string;
}) => {
  return (
    <>
      <li className={`flex space-x-3 ${!isactive && "line-through"}`}>
        <svg
          className={`h-5 w-5 shrink-0 ${
            isactive
              ? "text-cyan-600 dark:text-cyan-500"
              : "text-gray-400 dark:text-gray-500"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
          {text}
        </span>
      </li>
    </>
  );
};
