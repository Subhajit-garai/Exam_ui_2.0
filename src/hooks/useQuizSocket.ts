import { useState, useEffect, useRef, useCallback } from 'react';
import { useApi } from "@/ApiProvider";

type QuizStatus = "waiting" | "countdown" | "active" | "finished";

interface LogMessage {
    id: string;
    message: string;
    type: "join" | "leave" | "info";
    timestamp: Date;
}

interface Question {
    id: string;
    text: string;
    options: { id: string; text: string }[];
}

export const useQuizSocket = (url: string) => {
    const [status, setStatus] = useState<QuizStatus>("waiting");
    const [logs, setLogs] = useState<LogMessage[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [timer, setTimer] = useState(0);
    const socketRef = useRef<WebSocket | null>(null);
    const _ = useApi();

    const connect = useCallback(async () => {
        if (socketRef.current) return;

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

            const wsUrl = new URL(url);
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

                // Optional: Implement auto-reconnect logic here if needed
                // For now, we rely on the component to call connect() again if needed
                // or we could retry fetching token and connecting
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
                addLog(`${data.payload.name} joined the quiz`, "join");

                break;
            case 'LEAVE_QUIZ':
                addLog(`${data.payload.name} left the quiz`, "leave");

                break;
            case 'QUIZ_START':
                setStatus("countdown");
                break;
            case 'NEW_QUESTION':
                setStatus("active");
                setCurrentQuestion(data.payload.question);
                setTimer(data.payload.timeLimit || 30);
                break;
            case 'GAME_OVER':
                setStatus("finished");
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

    const submitAnswer = (answerId: string) => {
        if (socketRef.current && isConnected) {
            socketRef.current.send(JSON.stringify({
                type: 'SUBMIT_ANSWER',
                payload: { answerId }
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
        connect,
        joinQuiz,
        leaveQuiz,
        startQuiz,
        submitAnswer,
        setStatus // Exposed for manual control if needed (e.g. countdown finish)
    };
};
