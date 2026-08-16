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
      className="bg-card bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-border"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <Card className=" px-3  py-4 md:px-5 md:py-6  ">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${color}20`, color: color }}
          >
            <Icon
              size={iconSize ? iconSize : 20}
            />
          </div>
          <span className="text-sm font-medium text-primary">
            {name}
          </span>
        </div>
        <p className="mt-2 text-xl font-semibold text-primary ">{value}</p>
      </Card>
    </motion.div>
  );
};
export default StatCard;
