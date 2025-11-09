import { useApi } from "@/ApiProvider";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExamAttemptQuestionChart = ({ examid }: { examid: string }) => {
  const [data, setData] = useState({
    not_attempt: 0,
    total_questions: 0,
  });

  const _ = useApi();
  let ExamAttempData = [
    {
      name: "Attemp",
      value: data?.total_questions - data?.not_attempt,
      color: "#6366F1",
    },
    { name: "Un-Attemp", value: data?.not_attempt, color: "#00C49F" },
  ];

  useEffect(() => {
    if (examid) {
      (async () => {
        let data = await _.api.exam.ExamAttemptQuestionMetaData({ examid });
        setData(data.data);
      })();
    }
  }, [examid]);
  return (
    <motion.div
      className="bg-s2 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-4 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex  justify-around items-center mb-4">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Exam Question Attempt
        </h2>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={ExamAttempData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) =>
                `${name} ${(
                  ((value as number) / data.total_questions) *
                  100
                ).toFixed(0)}%`
              }
            >
              {ExamAttempData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default ExamAttemptQuestionChart;
