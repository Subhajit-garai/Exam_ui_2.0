import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { ScrollArea } from "@repo/ui/scroll-area";
import { Badge } from "@repo/ui/badge";
import { Loader2, User, Play } from "lucide-react";
import { useQuizSocket } from "@/hooks/useQuizSocket";
import { QuizActivePage } from "./QuizActivePage";

export const QuizStartPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const QuizId = searchParams.get("id");
    const subject = searchParams.get("subject");
    const topic = searchParams.get("topic");

    const {
        status,
        logs,
        isConnected,
        connect,
        joinQuiz,
        leaveQuiz,
        startQuiz,
        setStatus,
        currentQuestion,
        timer,
        submitAnswer
    } = useQuizSocket("ws://localhost:8080/quiz");

    const [countdown, setCountdown] = useState(3);
    const scrollRef = useRef<HTMLDivElement>(null);


    // Connect on mount
    useEffect(() => {
        connect();
    }, [connect]);

    // Join lobby when connected
    useEffect(() => {
        if (isConnected && QuizId) {
            console.log("joining quiz now---> ");
            joinQuiz(QuizId);
        }
    }, [isConnected, joinQuiz]);

    // Auto-scroll logs
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    // Handle countdown transition
    useEffect(() => {
        if (status === "countdown") {
            let count = 3;
            setCountdown(3);
            const timer = setInterval(() => {
                count--;
                setCountdown(count);
                if (count === 0) {
                    clearInterval(timer);
                    // In a real app, the server would send NEW_QUESTION to switch to active
                    // For demo, we manually switch if server doesn't
                    setStatus("active");
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [status, setStatus]);

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
                question={currentQuestion || {
                    id: "demo",
                    text: "What is the capital of France?",
                    options: [
                        { id: "1", text: "London" },
                        { id: "2", text: "Paris" },
                        { id: "3", text: "Berlin" },
                        { id: "4", text: "Madrid" }
                    ]
                }}
                timer={timer || 30}
                onAnswer={submitAnswer}
                onExit={() => navigate("/activity/quiz")}
            />
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl min-h-[80vh] flex flex-col justify-center">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Quiz Lobby
                    </CardTitle>
                    <div className="flex justify-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{subject}</Badge>
                        <Badge variant="secondary">{topic}</Badge>
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
                        <p className="text-muted-foreground">The quiz will start once players join.</p>
                    </div>

                    <Card className="bg-muted/50">
                        <CardContent className="p-4">
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Activity Log
                            </h4>
                            <ScrollArea className="h-[200px] rounded-md border bg-background p-4" ref={scrollRef}>
                                <div className="space-y-2">
                                    {logs.length === 0 && (
                                        <p className="text-sm text-muted-foreground text-center italic">No activity yet...</p>
                                    )}
                                    {logs.map((log) => (
                                        <div key={log.id} className="flex items-center gap-2 text-sm">
                                            <span className="text-xs text-muted-foreground">
                                                {log.timestamp.toLocaleTimeString()}
                                            </span>
                                            <span className={log.type === "join" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                                                {log.message}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <div className="flex justify-center pt-4">
                        <Button size="lg" onClick={startQuiz} className="w-full md:w-auto px-8" disabled={!isConnected}>
                            <Play className="w-4 h-4 mr-2" />
                            Start Quiz Now
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuizStartPage;
