import { Ticket, Tickets } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useIsMobile } from "@repo/hooks/isMobile";
import { useAppSelector } from "@repo/store/hook";
import { type ElementType } from "react";
import { Tooltip_one as Tooltip } from "@repo/design-system/tooltip/tooltip_one";
import { Card } from "@repo/design-system/card/Card";
import { Button } from "@repo/ui/button";

export const Currencyicon = ({ size = 25, color = "#344CB7" }) => {
  let ismobile = useIsMobile();
  return <Ticket size={ismobile ? 15 : size} color={color} />;
};
export const Ticketicon = ({ size = 25, color = "#344CB7" }) => {
  let ismobile = useIsMobile();

  return <Tickets size={ismobile ? 15 : size} color={color} />;
};

export const CurrencyComp = () => {
  let { blance } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        whileHover={{
          y: -5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Tooltip text="my currency">
          <Button
            color="gray"
            className="group rounded-lg  shadow-none  w-16 h-10 md:w-fit md:h-fit items-center  border-b-4  border-e-4 "
            onClick={() => navigate("/payment")}
          >
            <div className=" flex  justify-center items-center font-bold text-sm gap-1  md:text-[22px] md:gap-4">
              <h2>{blance}</h2>
              <Currencyicon />
            </div>
            <span className="sr-only">currency count</span>
          </Button>
        </Tooltip>
      </motion.div>
    </motion.div>
  );
};

export const CurrencyCard = ({
  title,
  balance = 0,
  Icon,
  size,
}: {
  title: string;
  balance?: number;
  Icon: ElementType;
  size: any;
}) => {
  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        whileHover={{
          y: -5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Card className="p-4">
          <div className="flex gap-2 items-center">
            <p className="text-sm">{title}</p>
            <p className=" text-sm md:text-2xl font-bold">{balance}</p>
            <Icon size={size} />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
