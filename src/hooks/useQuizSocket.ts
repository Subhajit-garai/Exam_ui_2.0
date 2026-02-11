import { useState, useEffect, useRef, useCallback } from 'react';
import { useApi } from "@/ApiProvider";

type QuizStatus = "waiting" | "countdown" | "active" | "finished";

interface LogMessage {
    id: string;
    message: string;
    type: "join" | "leave" | "info";
    timestamp: Date;
}

export interface SubmitAnswerPayload {
    quizId: string;
    questionId: string;
    answer: string[];
    number: number;
    isMultiple: boolean;
    time?: string; // Client might send it, but we ignore it for logic
}

interface Question {
    id: string;
    text: string;
    options: { id: string; text: string }[];
    quizId: string;
    number: number;
    isMultiple: boolean;
}

interface ServerQuestionPayload {
    quizId: string;
    question: {
        number: number;
        part: number;
        question: {
            questionid: string;
            title: string;
            options: string[];
            extra: any;
            format: string;
            is_multiple_ans: boolean;
        };
    };
    startTime: string;
    endTime: string;
}

export interface QuizLeaderboardPayload {
    quizId: string;
    leaderboard: { user: string, score: string }[]
}

export const useQuizSocket = (url: string) => {

    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [status, setStatus] = useState<QuizStatus>("waiting");
    const [logs, setLogs] = useState<LogMessage[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [timer, setTimer] = useState(0);
    const [quizResult, setQuizResult] = useState<any>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const _ = useApi();

    const connect = useCallback(async () => {
        if (socketRef.current?.readyState === WebSocket.OPEN || socketRef.current?.readyState === WebSocket.CONNECTING) return;


        try {
            // Fetch WS token
            const response = await _.api.user.getWsToken();
            let token = null;
            if (response.success) {
                token = response.wsToken;
            } else {
                console.error("Failed to fetch WS token:", response.message);
                addLog("Authentication failed", "info");
                return;
            }

            let wsUrl = new URL(url);
            if (token) {
                wsUrl.searchParams.append("token", token);
            }
            const socket = new WebSocket(wsUrl.toString());
            socketRef.current = socket;

            socket.onopen = () => {
                console.log("WebSocket Connected");
                setIsConnected(true);
                addLog("Connected to quiz server", "info");
            };

            socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    handleMessage(data);
                } catch (error) {
                    console.error("Failed to parse WS message", error);
                }
            };

            socket.onclose = (event) => {
                console.log("WebSocket Disconnected", event.code, event.reason);
                setIsConnected(false);
                addLog("Disconnected from server", "info");
                socketRef.current = null;
            };

            socket.onerror = (error) => {
                console.error("WebSocket Error:", error);
                addLog("Connection error - check console", "info");
            };
        } catch (error) {
            console.error("Error during connection setup:", error);
            addLog("Connection setup failed", "info");
        }
    }, [url]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
    }, []);

    const handleMessage = (data: any) => {
        switch (data.type) {
            case 'JOIN_QUIZ':
                console.log("JOIN_QUIZ", data);
                addLog(`${data.payload.name} joined the quiz`, "join");

                break;
            case 'LEAVE_QUIZ':
                console.log("LEAVE_QUIZ", data);
                addLog(`${data.payload.name} left the quiz`, "leave");

                break;
            case 'QUIZ_STARTED':
                console.log("QUIZ_START", data);
                setStatus("countdown");
                addLog(data.payload.message || "Quiz started!", "info");
                break;
            case 'QUESTION':
                handleQuestion(data);
                break;
            case 'QUIZ_LEADERBOARD':
                console.log("QUIZ_LEADERBOARD", data);
                setLeaderboard(data.payload.leaderboard);
                break;
            case 'QUIZ_ENDED':
                console.log("QUIZ_ENDED", data);
                setStatus("finished");
                addLog("Quiz ended", "info");
                break;
            case 'QUIZ_RESULT':
                console.log("QUIZ_RESULT", data);
                setStatus("finished");
                setQuizResult(data.payload);
                break;
            default:
                break;
        }
    };

    const addLog = (message: string, type: "join" | "leave" | "info") => {
        setLogs(prev => [...prev, {
            id: Math.random().toString(36).substr(2, 9),
            message,
            type,
            timestamp: new Date()
        }]);
    };

    const handleQuestion = (data: any) => {
        const questionPayload = data.payload as ServerQuestionPayload;
        console.log("QUESTION", questionPayload);
        setStatus("active");

        // Map server payload to internal Question format
        // Check if payload has the expected nested structure or direct structure
        // The provided payload has nested question.question structure
        const rawQuestion = questionPayload.question.question || (questionPayload.question as any);

        const mappedQuestion: Question = {
            id: (rawQuestion as any).questionid || (rawQuestion as any).id,
            text: (rawQuestion as any).title || (rawQuestion as any).text,
            options: ((rawQuestion as any).options || []).map((opt: string, index: number) => ({
                id: (index + 1).toString(), // "1", "2", "3"...
                text: opt
            })),
            quizId: questionPayload.quizId,
            number: questionPayload.question.number,
            isMultiple: rawQuestion.is_multiple_ans || false
        };

        setCurrentQuestion(mappedQuestion);

        if (questionPayload.endTime) {
            const endTime = new Date(questionPayload.endTime).getTime();
            const now = Date.now();
            const remainingSeconds = Math.max(0, Math.floor((endTime - now) / 1000));
            setTimer(remainingSeconds);
        } else {
            setTimer(30);
        }

    };

    const joinQuiz = (quizId: string) => {
        if (socketRef.current && isConnected) {
            socketRef.current.send(JSON.stringify({
                type: 'JOIN_QUIZ',
                payload: { quizId }
            }));
        }
    };

    const leaveQuiz = (quizId: string) => {
        if (socketRef.current && isConnected) {
            socketRef.current.send(JSON.stringify({
                type: 'LEAVE_QUIZ',
                payload: { quizId }
            }));
        }
    };

    const startQuiz = () => {
        if (socketRef.current && isConnected) {
            socketRef.current.send(JSON.stringify({
                type: 'START_QUIZ'
            }));
            // Fallback for demo if no backend
            setStatus("countdown");
        }
    };

    const submitAnswer = (answer: string[]) => {
        if (socketRef.current && isConnected && currentQuestion) {

            const payload: SubmitAnswerPayload = {
                quizId: currentQuestion.quizId,
                questionId: currentQuestion.id,
                answer: answer,
                number: currentQuestion.number,
                isMultiple: currentQuestion.isMultiple,
                time: new Date().toISOString()
            };

            socketRef.current.send(JSON.stringify({
                type: 'SUBMIT_ANSWER',
                payload: payload
            }));
        }
    };

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === "active" && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status, timer]);

    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);

    return {
        status,
        logs,
        isConnected,
        currentQuestion,
        timer,
        quizResult,
        leaderboard,
        connect,
        joinQuiz,
        leaveQuiz,
        startQuiz,
        submitAnswer,
        setStatus // Exposed for manual control if needed (e.g. countdown finish)
    };
};

