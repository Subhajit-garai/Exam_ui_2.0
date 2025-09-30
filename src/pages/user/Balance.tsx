
import { Plus } from "lucide-react";
import { motion } from "motion/react";

import { useEffect, useState } from "react";
import {
  CurrencyCard,
  Currencyicon,
  Ticketicon,
} from "@repo/design-system/OwnCurrency";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@repo/store/hook";
import { Card } from "@repo/design-system/card";


type transition_type = {
  head: string[];
  body: string[][];
};

export const Balance = () => {
  let { blance, ticket } = useAppSelector((state) => state.user);

  const [data, setdata] = useState<transition_type>({ head: [], body: [] });

  let demo_data = {
    head: ["tx name", "status", "date", "amount"],
    body: [
      ["iasdoa", "success", "23/04", "50"],
      ["iasdo2", "success", "23/26", "120"],
      ["iasdo4", "faild", "3/14", "70"],
      ["iasdo6", "success", "21/24", "50"],
    ],
  };

  useEffect(()=>{
    setdata(demo_data)
  },[])

  return (
    <>
      <div className=" w-full  overflow-auto gap-4 flex flex-col  pt-4 md:px-8 mt-8 ">
        <div className=" grid grid-cols-2 md:flex gap-2 md:gap-4 justify-between">
          <CurrencyCard
            title={"Token"}
            balance={blance ? blance : undefined}
            Icon={Currencyicon}
            size={30}
          />
          <CurrencyCard
            title={"Ticket"}
            balance={ticket ? ticket : undefined}
            Icon={Ticketicon}
            size={30}
          />
          <AddTotenCard />
        </div>
        <div className="transtion  max-h-120 overflow-auto  ">
          {/* <TabledataDisplay
            data={data}
          /> */}
        </div>
      </div>
    </>
  );
};
export const AddTotenCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className=" "
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
        <Card
          onClick={() => navigate("/payment")}
          className=" hover:cursor-pointer p-2"
        >
          <div className="flex gap-2  items-center ">
            <Plus size={45} color="#10B981" />
            <p>Add Token Or Ticket</p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// export const TabledataDisplay = ({
//   data,
//   tableclass,
//   headclass,
//   headCellclass,
//   tbodyclass,
//   trowclass,
//   tCellclass
// }: {
//   data:transition_type;
//   tableclass?:string;
//   headclass?:string;
//   headCellclass?:string;
//   tbodyclass?:string;
//   trowclass?:string;
//   tCellclass?:string;
// }) => {
//   return (
//     <>
//       <h1>table</h1>
//     </>
//   );
// };
