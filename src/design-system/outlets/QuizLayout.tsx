import { Outlet } from "react-router-dom";
import { QuizSocketProvider, useQuizSocketContext } from "@/QuizSocketProvider";
import { useEffect } from "react";



const QuizSocketManager = () => {
  const { connect, disconnect } = useQuizSocketContext();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return <Outlet />;
};

export const QuizLayout = () => {
  return (
    <QuizSocketProvider>
      <QuizSocketManager  />
    </QuizSocketProvider>
  );
};