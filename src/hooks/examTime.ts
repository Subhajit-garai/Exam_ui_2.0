import { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"; // Import the duration plugin
import customParseFormat from "dayjs/plugin/customParseFormat";
import { sortExamNames } from "@/lib";

dayjs.extend(customParseFormat);

dayjs.extend(duration);

const useExamTimetablehook = (Exams: any[], type = "Test") => {
  let [todaysExam, settodaysExam] = useState<any[]>([]);
  let [tomorrowsExam, settomorrowsExam] = useState<any[]>([]);
  let [upcomingExam, setupcomingExam] = useState<any[]>([]);
  let [completedExam, setcompletedExam] = useState<any[]>([]);

  useEffect(() => {
    if (!Exams || Exams.length === 0) return;

    const now = dayjs().startOf("day"); // remove time part
    const tomorrow = now.add(1, "day");

    const todayExams: any[] = [];
    const tomorrowExams: any[] = [];
    const upcomingExams: any[] = [];
    const completedExams: any[] = [];

    Exams.forEach((exam) => {
      const examDate = dayjs(exam.date).startOf("day"); // important!
      if (exam.examtype === type) {
        if (examDate.isSame(now)) {
          todayExams.push(exam);
        } else if (examDate.isSame(tomorrow)) {
          tomorrowExams.push(exam);
        } else if (examDate.isAfter(now)) {
          upcomingExams.push(exam);
        } else if (examDate.isBefore(now)) {
          completedExams.push(exam);
        }
      }
    });

    settodaysExam(sortExamNames(todayExams, "@", "name", "desc"));
    settomorrowsExam(sortExamNames(tomorrowExams, "@", "name", "desc"));
    setupcomingExam(sortExamNames(upcomingExams, "@", "name", "desc"));
    setcompletedExam(sortExamNames(completedExams, "@", "name", "desc"))
  }, [Exams, type]);
  return { todaysExam, tomorrowsExam, upcomingExam, completedExam };
};

export const calculateExamJoinRemainingTime = (
  date: string,
  time: string,
  jointime: string | any
) => {
  const now = dayjs();
  const startTime = dayjs(`${date} ${time}`, "DD-MM-YYYY hh:mm a");

  let validJoinDuration = jointime;
  if (validJoinDuration === "no limit") {
    validJoinDuration = "00:15 m";
  }

  // Ensure validJoinDuration is a string before matching
  if (typeof validJoinDuration !== 'string') {
    console.error("Invalid jointime format (not a string):", jointime);
    return { remainingSecondsForStart: 0, remainingSecondsForjoin: 0 };
  }

  const minutesMatch = validJoinDuration.match(/(\d+):(\d+)/); // Matches "00:15"

  let joinDeadline = startTime;

  if (minutesMatch) {
    const [_, hours, minutes] = minutesMatch.map(Number);
    joinDeadline = startTime.add(hours, "hour").add(minutes, "minute");
  } else {
    console.error("Invalid jointime format:", validJoinDuration);
  }

  const hasStarted = now.isAfter(startTime);
  let remainingSecondsForStart = 0;
  let remainingSecondsForjoin = 0;

  if (hasStarted) {
    if (now.isBefore(joinDeadline)) {
      remainingSecondsForjoin = Math.max(joinDeadline.diff(now, "seconds"), 0);
    }
  } else {
    remainingSecondsForStart = Math.max(startTime.diff(now, "seconds"), 0);
  }

  return { remainingSecondsForStart, remainingSecondsForjoin };
};

export const calculateExamRemining_Time = (duration: string | any) => {
  // duration -> "02:00 h"
  let now = dayjs();
  let startTime = now;
  const minutesMatch = duration.match(/(\d+):(\d+)/); // Matches "00:15"
  let remainingSecondsForExam;
  if (minutesMatch) {
    const [_, hours, minutes] = minutesMatch.map(Number);
    duration = startTime.add(hours, "hour").add(minutes, "minute");
    remainingSecondsForExam = Math.max(duration.diff(now, "seconds"), 0);
  } else {
    console.error("Invalid duration format:", duration);
  }

  return remainingSecondsForExam;
};

export const useRemainingTime = (initialTime: any, action?: any) => {
  const [time, setTime] = useState(initialTime); // Initial time in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime: any) => {
        if (prevTime <= 0) {
          clearInterval(interval); // Stop the timer when it reaches zero
          return 0;
        }
        return prevTime - 1; // Decrease time by 1 second
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (time === 0) {
      // Slight delay to let UI update before reload
      setTimeout(() => {
        action();
      }, 1000);
    }
  }, [time]);

  // Convert seconds to "HH:MM:SS" format
  // Convert seconds to "D" or "HHh:MMm:SSs" format
  const formatTime = (timeInSeconds: number) => {
    const days = Math.floor(timeInSeconds / 86400);
    const remainingSecondsAfterDays = timeInSeconds % 86400;
    const hours = Math.floor(remainingSecondsAfterDays / 3600);
    const minutes = Math.floor((remainingSecondsAfterDays % 3600) / 60);
    const seconds = remainingSecondsAfterDays % 60;

    if (days > 0) {
      return `${days}d`;
    }

    return `${String(hours).padStart(2, "0")}h:${String(minutes).padStart(
      2,
      "0"
    )}m:${String(seconds).padStart(2, "0")}s`;
  };

  return formatTime(time);
};

export default useExamTimetablehook;
