import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import { Timer } from "lucide-react";

interface QuizActivePageProps {
    question: {
        id: string;
        text: string;
        options: { id: string; text: string }[];
    } | null;
    timer: number;
    onAnswer: (answerId: string) => void;
    onExit: () => void;
}

export const QuizActivePage = ({ question, timer, onAnswer, onExit }: QuizActivePageProps) => {
    if (!question) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">Loading question...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Card>
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
                                    variant="outline"
                                    className="h-auto py-4 text-lg justify-start px-6"
                                    onClick={() => onAnswer(option.id)}
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
    );
};
