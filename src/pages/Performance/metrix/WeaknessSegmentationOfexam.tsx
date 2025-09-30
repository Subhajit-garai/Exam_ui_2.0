import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
} from "recharts";
import { useApi } from "@/ApiProvider";
// import type { WeaknessSegmentationData_type } from "./types";



// const WeaknessSegmentationData:WeaknessSegmentationData_type[] = [
//   { subject: "OS", A: 92, B: 11, fullMark: 100 },
//   { subject: "OS", A: 72, B: 21, fullMark: 100 },
//   { subject: "DBMS", A: 98, B: 13, fullMark: 100 },
//   { subject: "C", A: 86, B: 13, fullMark: 100 },
//   { subject: "OOP", A: 99, B: 10, fullMark: 100 },
//   { subject: "NETWORK", A: 85, B: 79, fullMark: 100 },
//   { subject: "UNIX", A: 65, B: 85, fullMark: 100 },
//   { subject: "ML", A: 65, B: 85, fullMark: 100 },
//   { subject: "SE", A: 65, B: 85, fullMark: 100 },
// ];

const WeaknessSegmentationOfexam = ({ examid }: { examid: string  }) => {
  const _ = useApi();
  const [data, setdata] = useState([]);
  const [range, setrange] = useState(20);

  const MetrixSetUpFunc = () => {
    if (examid) {
      _.api.metrix.getExamWeeknessMetrix(examid).then((data) => {
        setdata(data.data);
        setrange(data.range);
      });
    }
  };

  useEffect(() => {
    MetrixSetUpFunc();
  }, [examid]);

  return (
    <motion.div
      className="bg-s2 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-3 md:p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex  justify-around items-center mb-4">
        <h2 className="md:text-xl font-semibold text-gray-100">
          Weakness Segmentation
        </h2>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
            <PolarRadiusAxis angle={30} domain={[0, range]} stroke="#9CA3AF" />
            <Radar
              name="Right"
              dataKey="A"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.6}
            />
            <Radar
              name="Wrong"
              dataKey="B"
              stroke="#EC4899"
              fill="#EC4899"
              fillOpacity={0.5}
            />
            <Legend />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default WeaknessSegmentationOfexam;
