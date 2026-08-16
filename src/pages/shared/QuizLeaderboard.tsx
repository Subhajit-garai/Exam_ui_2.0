import { useState, useMemo, useEffect } from "react";
import { Trophy, Medal, BrainCircuit } from "lucide-react";
import { useApi } from "@/ApiProvider";
import type { LeaderboardEntry } from "@/hooks/useQuizSocket";
import { LeaderboardComponent } from "@/pages/Activity/components/LeaderboardComponent";
import type { activity_time_range } from "@/pages/Activity/components/LeaderboardComponent";

export type { activity_time_range };

interface QuizLeaderboardProps {
  results?: LeaderboardEntry[]; // Allow external results to be passed in
  quizId?: string; // ID for fetching specific exam leaderboard
}

export const QuizLeaderboard = ({ results, quizId }: QuizLeaderboardProps) => {
  const [timeframe, setTimeframe] = useState<activity_time_range>("weekly");
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { api } = useApi();

  // Fetch data if no results passed
  useEffect(() => {
    if (!results) {
      setIsLoading(true);
      const fetchPromise = quizId
        ? api.quiz.getQuizLeaderboard(quizId)
        : api.activity.getLeaderboard("quiz", timeframe);

      fetchPromise
        .then((response: any) => {
          const data = response.data || [];
          setFetchedData(data);
        })
        .catch((err: any) => {
          console.error("Failed to fetch leaderboard", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [results, quizId, timeframe, api]);

  const currentData = useMemo(() => {
    const sourceData = results || fetchedData;

    console.log("Fetched Data:", sourceData);

    if (sourceData && sourceData.length > 0) {
      return sourceData.map(
        (item: any, index: number): LeaderboardEntry => ({
          name: item.name ?? "Participant",
          avatar: item?.avatar ?? "P".substring(0, 2).toUpperCase(),
          score: item.score ? item.score / 100 : 0,
          rank: item.rank || index + 1,
        }),
      );
    }
    return [];
  }, [results, fetchedData]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Medal className="text-amber-600" size={20} />;
      default:
        return (
          <span className="text-zinc-500 font-bold w-5 text-center">
            {rank}
          </span>
        );
    }
  };

  return (
    <LeaderboardComponent
      title="Leaderboard"
      icon={
        <BrainCircuit className="text-indigo-600 fill-indigo-200" size={28} />
      }
      timeframe={timeframe}
      onTimeframeChange={setTimeframe}
      hideTimeframe={!!results}
      isLoading={isLoading}
      data={currentData}
      renderItem={(item) => (
        <div
          key={(item.name + item.score).toString()}
          className="flex items-center justify-between py-1"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8">
              {getRankIcon(item.rank as number)}
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
              {item.avatar}
            </div>
            <span className="font-medium text-sm text-zinc-700 dark:text-zinc-300">
              {item.name}
            </span>
          </div>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            {item.score} Points
          </span>
        </div>
      )}
      footer={
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-[10px] text-zinc-400 mb-2">
            Last updated:{" "}
            {new Date().toLocaleTimeString("en-IN", {
              timeZone: "Asia/Kolkata",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            IST
          </p>
          <button className="text-xs text-zinc-500 hover:text-indigo-600 transition-colors">
            View Full Leaderboard
          </button>
        </div>
      }
    />
  );
};
