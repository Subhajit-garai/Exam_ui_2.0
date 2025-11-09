import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SelectionInput } from "@repo/design-system/inputs";
import { useApi } from "@/ApiProvider";

export const LeaderBoard = ({
  examid,
  color,
  isfull = false,
  initoffset = 4,
}: {
  examid: string;
  color?: string;
  isfull?: boolean;
  initoffset?: number;
}) => {
  color = color ? color : "#0088FE";
  isfull = initoffset === 4 || initoffset === 10 ? false : true;

  const [data, setdata] = useState([]);
  const [offset, setOffset] = useState(4);
  const _ = useApi();

  const handeOffset = (e: any) => {
    let offsetnewValue = e.target.value;
    offsetnewValue = offsetnewValue.split("-")[1];
    setOffset(parseInt(offsetnewValue));

    if (examid) {
      _.api.metrix
        .getleaderboardMetrix(examid, offsetnewValue)
        .then((response) => {
          let processData = response.data.map((data: any) => {
            return {
              name: data.name,
              score: data.score / 100,
            };
          });

          setdata(processData);
        });
    }
  };

  useEffect(() => {
    try {
      if (isfull) {
        if (examid) {
          _.api.metrix.getFullleaderboardMetrix(examid).then((response) => {
            let processData = response.data.map((data: any) => {
              return {
                name: data.name,
                score: data.score / 100, // for floting point
              };
            });

            setdata(processData);
          });
        }
      } else {
        if (examid) {
          _.api.metrix.getleaderboardMetrix(examid, String(offset)).then((response) => {
            let processData = response.data.map((data:any) => {
              return {
                name: data.name,
                score: data.score / 100,
              };
            });

            setdata(processData);
          });
        }
      }
    } catch (error) {
      console.log(" error", error);
    }
  }, [examid]);

  return (
    <motion.div
      className="bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-2 md:p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex  justify-around items-center mb-4">
        <h2 className="md:text-lg font-medium  text-primary">Leaderboard</h2>

        {/* <p className="text-xl font-semibold text-gray-100 mb-4">"--WEEKly"</p> */}
        <SelectionInput
          options={[
            {
              id: "1",
              inputId: "input-Offcet",
              // placeholder: "Enter Ans ",
              options: ["Top-4", "Top-10"], // only display 20 -30 fileds/ rows
              required: true,
              name: "offset",
            },
          ]}
          handleInputefn={(e) => handeOffset(e)}
          value={String(offset)}
        />
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Bar dataKey="score" fill={color} />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default LeaderBoard;
