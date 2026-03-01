import { useState, useEffect, useRef, useCallback } from "react";
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
  time?: string;
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
  leaderboard: { user: string; score: string }[];
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

  const { api } = useApi();

  // ---------------- LOGGING ----------------

  const addLog = useCallback(
    (message: string, type: "join" | "leave" | "info") => {
      setLogs((prev) => {
        const log: LogMessage = {
          id: crypto.randomUUID(),
          message,
          type,
          timestamp: new Date(),
        };

        const updated = [...prev, log];

        return updated.slice(-100);
      });
    },
    [],
  );

  // ---------------- CONNECTION ----------------

  const connect = useCallback(async () => {
    if (
      socketRef.current?.readyState === WebSocket.OPEN ||
      socketRef.current?.readyState === WebSocket.CONNECTING
    )
      return;

    try {
      const response = await api.user.getWsToken();

      let token = null;

      if (response.success) {
        token = response.wsToken;
      } else {
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
        setIsConnected(true);
        addLog("Connected to quiz server", "info");
      };

      socket.onmessage = (event) => {
        if (!event.data) return;

        try {
          const data = JSON.parse(event.data);
          handleMessage(data);
        } catch {
          console.error("Invalid WS message", event.data);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        addLog("Disconnected from server", "info");
        socketRef.current = null;
      };

      socket.onerror = () => {
        addLog("Connection error - check console", "info");
      };
    } catch (error) {
      console.error(error);
      addLog("Connection setup failed", "info");
    }
  }, [url, api.user, addLog]);

  const disconnect = useCallback(() => {
    socketRef.current?.close();
    socketRef.current = null;
  }, []);

  // ---------------- MESSAGE HANDLER ----------------

  const handleMessage = (data: any) => {
    switch (data.type) {
      case "JOIN_QUIZ":
        addLog(`${data.payload.name} joined the quiz`, "join");
        break;

      case "LEAVE_QUIZ":
        addLog(`${data.payload.name} left the quiz`, "leave");
        break;

      case "QUIZ_STARTED":
        setStatus("countdown");
        addLog(data.payload.message || "Quiz started!", "info");
        break;

      case "QUESTION":
        handleQuestion(data);
        break;

      case "QUIZ_LEADERBOARD":
        setLeaderboard(data.payload.leaderboard);
        break;

      case "QUIZ_ENDED":
        setStatus("finished");
        addLog("Quiz ended", "info");
        break;

      case "QUIZ_RESULT":
        setStatus("finished");
        setQuizResult(data.payload);
        break;

      default:
        break;
    }
  };

  // ---------------- QUESTION ----------------

  const handleQuestion = (data: any) => {
    const questionPayload = data.payload as ServerQuestionPayload;

    setStatus("active");

    const rawQuestion =
      questionPayload.question.question || (questionPayload.question as any);

    const mappedQuestion: Question = {
      id: rawQuestion.questionid,
      text: rawQuestion.title,
      options: (rawQuestion.options || []).map(
        (opt: string, index: number) => ({
          id: (index + 1).toString(),
          text: opt,
        }),
      ),
      quizId: questionPayload.quizId,
      number: questionPayload.question.number,
      isMultiple: rawQuestion.is_multiple_ans || false,
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

  // ---------------- QUIZ ACTIONS ----------------

  const joinQuiz = (quizId: string) => {

    console.log(" joining quiz", quizId);
    
    const socket = socketRef.current;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      addLog("Connection not ready yet", "info");
      return;
    }

    socket.send(
      JSON.stringify({
        type: "JOIN_QUIZ",
        payload: { quizId },
      }),
    );
  };

  const leaveQuiz = (quizId: string) => {
    const socket = socketRef.current;

    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(
      JSON.stringify({
        type: "LEAVE_QUIZ",
        payload: { quizId },
      }),
    );
  };

  const startQuiz = () => {
    const socket = socketRef.current;

    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(
      JSON.stringify({
        type: "START_QUIZ",
      }),
    );

    setStatus("countdown");
  };

  const submitAnswer = (answer: string[]) => {
    const socket = socketRef.current;

    if (!socket || socket.readyState !== WebSocket.OPEN || !currentQuestion)
      return;

    const payload: SubmitAnswerPayload = {
      quizId: currentQuestion.quizId,
      questionId: currentQuestion.id,
      answer,
      number: currentQuestion.number,
      isMultiple: currentQuestion.isMultiple,
      time: new Date().toISOString(),
    };

    socket.send(
      JSON.stringify({
        type: "SUBMIT_ANSWER",
        payload,
      }),
    );
  };

  // ---------------- TIMER ----------------

  useEffect(() => {
    if (status !== "active") return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  // cleanup

  useEffect(() => {
    return () => disconnect();
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
    disconnect,
    joinQuiz,
    leaveQuiz,
    startQuiz,
    submitAnswer,
    setStatus,
  };
};
