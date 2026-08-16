import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { ScrollArea } from "@repo/ui/scroll-area";
import { Badge } from "@repo/ui/badge";
import { Loader2, User, Play } from "lucide-react";
import { QuizActivePage } from "./QuizActivePage";

import { QuizLeaderboard } from "@/pages/Activity/components/leaderboard/QuizLeaderboard";
import { useQuizSocketContext } from "@/QuizSocketProvider";

export const QuizStartPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const QuizId = searchParams.get("id");

  const {
    status,
    logs,
    isConnected,
    joinQuiz,
    leaveQuiz,
    setStatus,
    currentQuestion,
    timer,
    submitAnswer,
    quizResult,
    leaderboard,
  } = useQuizSocketContext();

  const [countdown, setCountdown] = useState(3);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasJoined = useRef(false);

  // Reset join flag on disconnect
  useEffect(() => {
    if (!isConnected) {
      hasJoined.current = false;
    }
  }, [isConnected]);

  // Join quiz once connected
  useEffect(() => {
    if (!isConnected) return;
    if (!QuizId) return;
    if (hasJoined.current) return;

    joinQuiz(QuizId);
    hasJoined.current = true;
  }, [isConnected, QuizId, joinQuiz]);

  // Auto scroll logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Countdown logic
  useEffect(() => {
    if (status === "countdown") {
      let count = 10;
      setCountdown(count);

      const interval = setInterval(() => {
        count--;
        setCountdown(count);

        if (count === 0) {
          clearInterval(interval);
          setStatus("active");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status, setStatus]);

  if (status === "finished") {
    return (
      <div className="container mx-auto p-4 max-w-4xl min-h-[80vh] flex flex-col justify-center items-center gap-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl">
              Quiz Completed! 🏆
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            <QuizLeaderboard results={quizResult?.leaderboard || []} />
          </CardContent>
        </Card>

        <Button size="lg" onClick={() => navigate("/activity/quiz")}>
          Back to Quiz Hub
        </Button>
      </div>
    );
  }

  if (status === "countdown") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
        <div className="text-9xl font-bold animate-bounce text-primary">
          {countdown > 0 ? countdown : "GO!"}
        </div>
        <p className="text-xl text-muted-foreground">Get ready...</p>
      </div>
    );
  }

  if (status === "active") {
    return (
      <QuizActivePage
        question={currentQuestion}
        timer={timer || 30}
        onAnswer={submitAnswer}
        onExit={() => {
          if (QuizId) leaveQuiz(QuizId);
          navigate("/activity/quiz");
        }}
        leaderboard={leaderboard}
      />
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl min-h-[80vh] flex flex-col justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Quiz Lobby</CardTitle>

          <div className="flex justify-center gap-2 text-sm text-muted-foreground">
            <Badge variant={isConnected ? "default" : "destructive"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>

            <h3 className="text-xl font-semibold">Waiting for players...</h3>
            <p className="text-muted-foreground">
              The quiz will start once players join.
            </p>
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Activity Log
              </h4>

              <ScrollArea className="h-[200px] rounded-md border bg-background">
                <div ref={scrollRef} className="p-4 space-y-2">
                  {logs.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center italic">
                      No activity yet...
                    </p>
                  )}

                  {logs.map((log: any) => (
                    <div
                      key={log.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="text-xs text-muted-foreground">
                        {log.timestamp.toLocaleTimeString()}
                      </span>

                      <span
                        className={
                          log.type === "join"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      >
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={() => {
                if (QuizId) leaveQuiz(QuizId);
                navigate("/activity/quiz");
              }}
              className="w-full md:w-auto px-8"
              disabled={!isConnected}
            >
              <Play className="w-4 h-4 mr-2" />
              Leave Quiz Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizStartPage;
