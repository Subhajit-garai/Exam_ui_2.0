import { useEffect, useState } from "react";
import {
  BarChart2,
  Users,
  Zap,
  ChartLine,
  ChartSpline,
} from "lucide-react";
import { motion } from "motion/react";

import StatCard from "../common/StatCard";
import PerformanceMetrix from "../metrix/PerformanceMetrix";
import WeaknessSegmentation from "../metrix/WeaknessSegmentationOfOverAll";
import { useApi } from "@/ApiProvider";

interface progress {
  id: string;
  rank: number;
  time: Date;
  attempted: number;
  attendedContest: number;
  attendedQuiz: number;
  attendedExam: number;
  attendedMock: number;
  attendedPYQ: number;
  userid: string;
  inTopten: number;
  accuracy: number;
  topinexam: number;
  topinContest: number;
  openRegister: number;
  lastExamid: string;
  lastDppid: string;
  lastMockid: string;
  lastContestid: string;
  lastQuizid: string;
  lastExamRank: number;
  lastDppRank: number;
  lastMockRank: number;
  lastContestRank: number;
  lastQuizRank: number;
}

export const Overview = () => {
  const [metrix, setmetrix] = useState<progress | null>(null);
  const _ = useApi();

  useEffect(() => {
    (async () => {
      let data = await _.api.metrix.getperformanceMetrix();
      if (!data) console.log("you don't have any performance score");
      setmetrix(data.data);
    })();
  }, []);

  return (
    <div className="flex-1 relative  mb-10 no-visible-scrollbar ">
      <main className="max-w-7xl mx-auto  mb-10 ">
        {/* STATS */}
        {metrix ? (
          <motion.div
            className="grid gap-2.5 grid-cols-2 lg:grid-cols-5  mb-4 md:gap-5 md:mb-8 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total Attempt"
              icon={Zap}
              value={metrix?.attempted}
              color="#6366F1"
            />
            <StatCard
              name="In Top Ten(10)"
              icon={Users}
              value={metrix?.inTopten}
              color="#8B5CF6"
            />
            <StatCard
              name="GMR Rank"
              icon={BarChart2}
              value={metrix?.rank} // change to rank gmr rank
              color="#10B981"
            />
            <StatCard
              name="Last Exam Rank"
              icon={ChartLine}
              value={metrix?.lastExamRank}
              color="#F59E0B"
            />
            <StatCard
              name="Last Contest Rank"
              icon={ChartSpline}
              value={metrix?.lastContestRank}
              color="#EC4899"
            />
          </motion.div>
        ) : (
          <p>empty</p>
        )}

        {/* CHARTS */}

        <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2 md:gap-8 mb-20">
          <PerformanceMetrix />
          <WeaknessSegmentation />
        </div>
      </main>
    </div>
  );
};
