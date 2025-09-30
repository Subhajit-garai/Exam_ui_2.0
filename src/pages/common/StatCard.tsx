import { Card } from "@/design-system";
import { motion } from "motion/react";
import type { ElementType } from "react";

const StatCard = ({
  name,
  icon: Icon,
  value,
  color,
  iconSize,
}: {
  name: string;
  icon: ElementType;
  value: number;
  color: string;
  iconSize?: number;
}) => {
  return (
    <motion.div
      className="bg-s2 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <Card className=" px-3  py-4 md:px-5 md:py-6  ">
        <span className="flex items-center text-sm font-medium text-primary">
          <Icon
            size={iconSize ? iconSize : 20}
            className="mr-2 "
            style={{ color }}
          />
          {name}
        </span>
        <p className="mt-1 text-xl font-semibold text-primary ">{value}</p>
      </Card>
    </motion.div>
  );
};
export default StatCard;
