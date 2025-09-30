import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SelectionInput } from "@repo/design-system/inputs";
import { useApi } from "@/ApiProvider";
// import type { PerformanceMetrixData_type } from "./types";




// const PerformanceMetrixData:PerformanceMetrixData_type[] = [
//   { key: '21-Feb-2025', score: 15 },
//   { key: '22-Feb-2025', score: 5 },
//   { key: '23-Feb-2025', score: 25 },
//   { key: '24-Feb-2025', score: 35 },
//   { key: '25-Feb-2025', score: 15 },
//   { key: '26-Feb-2025', score: 10 },
//   { key: '27-Feb-2025', score: 20 },
//   { key: '28-Feb-2025', score: 15 },
//   { key: '29-Feb-2025', score: 11 },
// ];

const PerformanceMetrix = () => {
  const [data, setdata] = useState([]);
  const [offset, setOffset] = useState("day");
  // const [range, setrange] = useState(30);
  const _ = useApi()

  const handeOffset = (e:any) => {
    setOffset(e.target.value);
  };

  const MetrixSetUpFunc = (offset:string) => {

    _.api.metrix.getScoreMetrixData(offset).then((data) => {
      data =data.data;
      // setrange(data.range)
      setdata(data);
    });
  };

  useEffect(() => {
    MetrixSetUpFunc(offset);
  }, [offset]);
  useEffect(() => {
    MetrixSetUpFunc("day");
  }, []);

  return (
    <motion.div
      className="bg-s2 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-2 md:p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex  justify-around items-center mb-4">
        <h2 className="md:text-lg font-medium  text-gray-100">
          Performance Overview
        </h2>

        {/* <p className="text-xl font-semibold text-gray-100 mb-4">"--WEEKly"</p> */}
        <SelectionInput
          options={[{
            id: "1",
            inputId: "input-Offcet",
            // placeholder: "Enter Ans ",
            options: ["day","week", "month","hour","minute"],   // only display 20 -30 fileds/ rows 
            required: true,
            name: "offset",
          }]}
          handleInputefn={(e) => handeOffset(e)}
          value={offset}
        />
      </div>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey='key' stroke="#9ca3af" />
            <YAxis dataKey="score" stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default PerformanceMetrix;
