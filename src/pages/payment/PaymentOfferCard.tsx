import { Button } from "@repo/ui/button";
import { Card } from "@repo/design-system/card/Card";
import { Currencyicon } from "@repo/design-system/OwnCurrency/Currency";
import { Check, X, Zap, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const isPopular = title.toLowerCase().includes("gold") || title.toLowerCase().includes("pro");
  const isPremium = title.toLowerCase().includes("gold") || title.toLowerCase().includes("premium");

  return (
    <Card className={cn(
      "min-w-[18rem] max-w-xs md:max-w-sm relative flex flex-col p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      isPremium ? "border-amber-500/50 dark:border-amber-500/50 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-950/10 dark:to-transparent" : ""
    )}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
          <Crown size={10} fill="currentColor" />
          MOST POPULAR
        </div>
      )}

      <div className="mb-4">
        <h5 className="text-base font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          {title}
          {isPremium && <Star size={14} className="text-amber-500" fill="currentColor" />}
        </h5>
        <div className="mt-2 flex items-baseline text-foreground">
          <span className="text-2xl font-semibold">₹</span>
          <span className="text-4xl font-extrabold tracking-tight">{price}</span>
          <span className="ml-1.5 text-base font-normal text-muted-foreground">
            /{time}
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {offerActive.map((text: any, i: number) => (
          <OfferActiveInactiveListCard key={`active-${i}`} isactive={true} text={text} />
        ))}
        {offerInActive.map((text: any, i: number) => (
          <OfferActiveInactiveListCard key={`inactive-${i}`} isactive={false} text={text} />
        ))}
      </ul>

      <Button
        className={cn(
          "w-full font-semibold shadow-md transition-all hover:shadow-lg h-9 text-sm",
          isPremium
            ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
            : ""
        )}
        color={btncolor || "blue"}
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

  const isBestValue = title.toLowerCase().includes("mega") || title.toLowerCase().includes("ultra");

  return (
    <Card className={cn(
      "min-w-[18rem] max-w-xs md:max-w-sm relative flex flex-col p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      isBestValue ? "border-blue-500/50 dark:border-blue-500/50 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/10 dark:to-transparent" : ""
    )}>
      {isBestValue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
          <Zap size={10} fill="currentColor" />
          BEST VALUE
        </div>
      )}

      <div className="mb-4">
        <h5 className="text-base font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h5>
        <div className="mt-2 flex items-baseline text-foreground">
          <span className="text-2xl font-semibold">₹</span>
          <span className="text-4xl font-extrabold tracking-tight">{price}</span>
          <span className="ml-1.5 text-base font-normal text-muted-foreground flex items-center gap-1">
            / {token} <Currencyicon className="w-4 h-4 text-blue-500" />
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {offerActive.map((text: any, i: number) => (
          <OfferActiveInactiveListCard key={`active-${i}`} isactive={true} text={text} />
        ))}
        {offerInActive.map((text: any, i: number) => (
          <OfferActiveInactiveListCard key={`inactive-${i}`} isactive={false} text={text} />
        ))}
      </ul>

      <Button
        className={cn(
          "w-full font-semibold shadow-md transition-all hover:shadow-lg h-9 text-sm",
          isBestValue
            ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0"
            : ""
        )}
        color={btncolor || "blue"}
        onClick={() => checkout(price, title, type)}
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
    <li className={cn("flex items-start gap-3", !isactive && "opacity-60")}>
      <div className={cn(
        "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
        isactive ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
      )}>
        {isactive ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
      </div>
      <span className={cn("text-sm font-medium leading-tight", isactive ? "text-foreground" : "text-muted-foreground line-through decoration-gray-400/50")}>
        {text}
      </span>
    </li>
  );
};

export function PaymentSubcriptionCard__2({
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

  const isPopular = title.toLowerCase().includes("gold") || title.toLowerCase().includes("pro");
  const isPremium = title.toLowerCase().includes("gold") || title.toLowerCase().includes("premium");

  return (
    <Card className={cn(
      "min-w-[18rem] max-w-xs relative flex flex-col p-5 overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group",
      isPremium
        ? "border-amber-500/30 bg-gradient-to-br from-background via-background to-amber-500/5"
        : "border-border bg-card"
    )}>
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
            <Crown size={10} fill="currentColor" />
            POPULAR
          </div>
        </div>
      )}

      <div className={cn("py-4 pb-4  border-b", isPremium ? "border-amber-500/10" : "border-border/50")}>
        <h5 className={cn(
          "text-sm font-bold uppercase tracking-widest mb-2",
          isPremium ? "text-amber-600 dark:text-amber-500" : "text-muted-foreground"
        )}>
          {title}
        </h5>
        <div className="flex items-baseline text-foreground gap-1">
          <span className="text-xl font-semibold text-muted-foreground">₹</span>
          <span className="text-4xl font-black tracking-tighter">{price}</span>
          <span className="text-sm font-medium text-muted-foreground">/{time}</span>
        </div>
      </div>

      <div className="py-2 pb-4 flex-1 flex flex-col">
        <ul className="space-y-3 mb-6 flex-1">
          {offerActive.map((text: any, i: number) => (
            <OfferActiveInactiveListCard key={`active-${i}`} isactive={true} text={text} />
          ))}
          {offerInActive.map((text: any, i: number) => (
            <OfferActiveInactiveListCard key={`inactive-${i}`} isactive={false} text={text} />
          ))}
        </ul>

        <Button
          className={cn(
            "w-full font-bold shadow-sm transition-all hover:shadow-md h-10 text-sm rounded-lg",
            isPremium
              ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
              : ""
          )}
          color={btncolor || "blue"}
          onClick={() => checkout(price, title, type)}
        >
          {buttontext}
        </Button>
      </div>
    </Card>
  );
}

export function PaymentTokenCard__2({
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

  const isBestValue = title.toLowerCase().includes("mega") || title.toLowerCase().includes("ultra");

  return (
    <Card className={cn(
      "min-w-[18rem] max-w-xs relative flex flex-col overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group",
      isBestValue
        ? "border-blue-500/30 bg-gradient-to-br from-background via-background to-blue-500/5"
        : "border-border bg-card"
    )}>
      {isBestValue && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
            <Zap size={10} fill="currentColor" />
            BEST VALUE
          </div>
        </div>
      )}

      <div className={cn("p-6 pb-4 border-b", isBestValue ? "border-blue-500/10" : "border-border/50")}>
        <h5 className={cn(
          "text-sm font-bold uppercase tracking-widest mb-2",
          isBestValue ? "text-blue-600 dark:text-blue-500" : "text-muted-foreground"
        )}>
          {title}
        </h5>
        <div className="flex items-baseline text-foreground gap-1">
          <span className="text-xl font-semibold text-muted-foreground">₹</span>
          <span className="text-4xl font-black tracking-tighter">{price}</span>
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
            / {token} <Currencyicon className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <ul className="space-y-3 mb-6 flex-1">
          {offerActive.map((text: any, i: number) => (
            <OfferActiveInactiveListCard key={`active-${i}`} isactive={true} text={text} />
          ))}
          {offerInActive.map((text: any, i: number) => (
            <OfferActiveInactiveListCard key={`inactive-${i}`} isactive={false} text={text} />
          ))}
        </ul>

        <Button
          className={cn(
            "w-full font-bold shadow-sm transition-all hover:shadow-md h-10 text-sm rounded-lg",
            isBestValue
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
              : ""
          )}
          color={btncolor || "blue"}
          onClick={() => checkout(price, title, type)}
        >
          {buttontext}
        </Button>
      </div>
    </Card>
  );
}
