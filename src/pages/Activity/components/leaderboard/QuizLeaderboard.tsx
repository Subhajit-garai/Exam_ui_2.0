import { useState, useMemo, useEffect } from "react";
import { Card } from "@/design-system/card";
import { Trophy, Medal, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApi } from "@/ApiProvider";
import type { LeaderboardEntry } from "@/hooks/useQuizSocket";


interface QuizLeaderboardProps {
  results?: LeaderboardEntry[]; // Allow external results to be passed in
  quizId?: string; // ID for fetching specific exam leaderboard
}
export type activity_time_range = "today" | "weekly" | "global";

export const QuizLeaderboard = ({ results, quizId }: QuizLeaderboardProps) => {
  const [timeframe, setTimeframe] = useState<activity_time_range>("weekly");
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { api } = useApi();

  // Fetch data if no results passed
  useEffect(() => {
    if (!results) {
      setIsLoading(true);

      const Timeframe: activity_time_range = timeframe;

      const fetchPromise = quizId
        ? api.quiz.getQuizLeaderboard(quizId)
        : api.activity.getLeaderboard("quiz", Timeframe);

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
  }, [results, quizId, timeframe]);

  // Use results if provided, otherwise fetched data
  const currentData = useMemo(() => {
    const sourceData = results || fetchedData;

    console.log("Fetched Data:", sourceData);

    if (sourceData && sourceData.length > 0) {
      return sourceData.map(
        (item, index): LeaderboardEntry => ({
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
    <Card className="p-6 border-zinc-200 dark:border-zinc-800 h-full flex flex-col">


      <div className="flex items-center justify-between mb-6 gap-4">
        <BrainCircuit className="text-indigo-600 fill-indigo-200" size={28} />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Leaderboard
        </h3>
        {!results && (
          <div className="flex  bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
            <button
              onClick={() => setTimeframe("today")}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                timeframe === "today"
                  ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300",
              )}
            >
              Today
            </button>
            <button
              onClick={() => setTimeframe("weekly")}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                timeframe === "weekly"
                  ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300",
              )}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe("global")}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                timeframe === "global"
                  ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300",
              )}
            >
              All Time
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4 flex-1">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading...
          </div>
        ) : currentData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No results available
          </div>
        ) : (
          currentData.map((item, _) => (
            <div
              key={(item.name + item.score).toString()} // Use combination of name and score as key
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(item.rank)}
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
          ))
        )}
      </div>

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
    </Card>
  );
};
