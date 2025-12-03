import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Plus, Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApi } from "@/ApiProvider";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastConfig } from "@repo/lib/utils/utils";

interface AvailableQuizzesProps {
    filterMode: string | null;
    onCreateQuiz: () => void;
}

interface Quiz {
    id: string | number;
    subject: string;
    mode: string;
    title: string;
    desc: string;
    questions: number;
}

export const AvailableQuizzes = ({ filterMode, onCreateQuiz }: AvailableQuizzesProps) => {
    const navigate = useNavigate();
    const _ = useApi();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchQuizzes = async () => {
            setLoading(true);
            try {
                const response = await _.api.quiz.getAvailableQuizzes();
                if (response.success) {
                    setQuizzes(response.data);
                } else {
                    toast.error(response.message || "Failed to fetch quizzes", ToastConfig());
                }
            } catch (error) {
                console.error("Failed to fetch quizzes", error);
                toast.error("Something went wrong", ToastConfig());
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    const filteredQuizzes = quizzes.filter(q => {
        const matchesMode = filterMode ? q.mode === filterMode : true;
        const matchesSearch = searchQuery
            ? q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.subject.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesMode && matchesSearch;
    });

    const handleJoin = async (quiz: Quiz) => {
        try {
            await _.api.activity.logActivity({
                type: "QUIZ",
                title: "Quiz Started",
                description: `Joined quiz: ${quiz.title}`,
                metadata: { quizId: quiz.id, title: quiz.title }
            });
        } catch (error) {
            console.error("Failed to log activity", error);
        }
        navigate(`/quiz/start?id=${quiz.id}`);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {filterMode ? `${filterMode} Quizzes` : "Available Quizzes"}
                </h3>
                <Button className="gap-2" onClick={onCreateQuiz}>
                    <Plus size={16} />
                    Create Quiz
                </Button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <Input
                    placeholder="Search quizzes by topic or subject..."
                    className="pl-10 bg-white dark:bg-zinc-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-primary" size={32} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredQuizzes.length > 0 ? (
                        filteredQuizzes.map((quiz) => (
                            <Card
                                key={quiz.id}
                                className="p-4 hover:border-indigo-500 transition-colors cursor-pointer border-zinc-200 dark:border-zinc-800"
                                onClick={() => handleJoin(quiz)}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className="px-2 py-1 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-xs font-medium">
                                        {quiz.subject}
                                    </span>
                                    <span className="text-xs text-zinc-500">{quiz.mode}</span>
                                </div>
                                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{quiz.title}</h4>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{quiz.desc}</p>
                                <div className="flex items-center justify-between text-xs text-zinc-500">
                                    <span>{quiz.questions} Questions</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0 hover:bg-transparent hover:text-indigo-600"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleJoin(quiz);
                                        }}
                                    >
                                        Join Now →
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-zinc-500">
                            No quizzes found for {filterMode}. Create one!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
