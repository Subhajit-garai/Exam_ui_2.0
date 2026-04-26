import { useState, useEffect, useMemo } from "react";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import { Timer } from "lucide-react";
import { QuizLeaderboard } from "../Activity/leaderboard/QuizLeaderboard";
import type { LeaderboardEntry } from "@/hooks/useQuizSocket";

interface QuizActivePageProps {
    question: {
        id: string;
        text: string;
        options: { id: string; text: string }[];
    } | null;
    timer: number;
    onAnswer: (answer: string[]) => void;
    onExit: () => void;
    leaderboard?: any[];
}



export const QuizActivePage = ({ question, timer, onAnswer, onExit, leaderboard }: QuizActivePageProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    // Reset selection when question changes
    useEffect(() => {
        setSelectedAnswer(null);
    }, [question?.id]);

    const mappedLeaderboard = useMemo(() => {
        if (!leaderboard) return [];
        return leaderboard.map((item, index): LeaderboardEntry => ({
            name: item.name,
            avatar: item.avatar,
            score: Number(item.score) * 100, // Compensation for QuizLeaderboard division
            rank: index + 1
        }));
    }, [leaderboard]);

    if (!question) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">Loading question...</p>
            </div>
        );
    }

    const handleAnswer = (optionId: string) => {
        setSelectedAnswer(optionId);
        onAnswer([optionId]);
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Question Section */}
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>Quiz Active</span>
                                <Badge variant={timer < 10 ? "destructive" : "outline"} className="flex items-center gap-1 text-lg px-3 py-1">
                                    <Timer className="w-4 h-4" />
                                    {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">{question.text}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {question.options.map((option) => (
                                        <Button
                                            key={option.id}
                                            variant={selectedAnswer === option.id ? "default" : "outline"}
                                            className={`h-auto py-4 text-lg justify-start px-6 ${selectedAnswer === option.id
                                                ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                                                : ""
                                                }`}
                                            onClick={() => handleAnswer(option.id)}
                                        >
                                            {option.text}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <Button variant="ghost" onClick={onExit} className="text-muted-foreground hover:text-destructive">
                                    Exit Quiz
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Leaderboard Section */}
                <div className="lg:col-span-1 h-full min-h-[400px]">
                    <QuizLeaderboard results={mappedLeaderboard} />
                </div>
            </div>
        </div>
    );
};
