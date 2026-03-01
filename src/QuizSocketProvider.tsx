import { createContext, useContext } from "react";
import { useQuizSocket } from "@/hooks/useQuizSocket";

const QuizSocketContext = createContext<any>(null);

export const QuizSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useQuizSocket(import.meta.env.VITE_WS_URL);

  return (
    <QuizSocketContext.Provider value={socket}>
      {children}
    </QuizSocketContext.Provider>
  );
};

export const useQuizSocketContext = () => {
  const ctx = useContext(QuizSocketContext);
  if (!ctx) throw new Error("useQuizSocketContext must be used inside QuizSocketProvider");
  return ctx;
};