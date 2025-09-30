import { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"; // Import the duration plugin
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

dayjs.extend(duration);

const useExamTimetablehook = (Exams:any[], type = "Exam") => {
    const [todaysExam, settodaysExam] = useState<any[]>([]);
    const [tomorrowExam, settomorrowsExam] = useState<any[]>([]);
    const [upcomingExam, setupcomingExam] = useState<any[]>([]);
    const [completedExam, setcompletedExam] = useState<any[]>([]);

    useEffect(() => {
        if (!Exams || Exams.length === 0) return;

        const now = dayjs().startOf('day'); // remove time part
        const tomorrow = now.add(1, "day");

        const todayExams:any[] = [];
        const tomorrowExams:any[] = [];
        const upcomingExams:any[] = [];
        const completedExams:any[] = [];

        Exams.forEach((exam) => {
            const examDate = dayjs(exam.date).startOf('day'); // important!
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

        settodaysExam(todayExams);
        settomorrowsExam(tomorrowExams);
        setupcomingExam(upcomingExams);
        setcompletedExam(completedExams);
    }, [Exams]);


    // console.log("----->",todaysExam, tomorrowExam, upcomingExam, completedExam );


    return { todaysExam, tomorrowExam, upcomingExam, completedExam };
};

export const calculateExamJoinRemainingTime = (date:string, time:string, jointime:string | any) => {
    let now = dayjs();
    let startTime = dayjs(`${date} ${time}`, "DD-MM-YYYY hh:mm a");
    // jointime = startTime.add(dayjs.duration(jointime))
    // console.log("type of jointime",dayjs.duration(jointime));

    if (jointime == "no limit") {
        jointime = "00:15 m"
    }
    const minutesMatch = jointime.match(/(\d+):(\d+)/); // Matches "00:15"

    if (minutesMatch) {
        const [_, hours, minutes] = minutesMatch.map(Number);
        jointime = startTime.add(hours, "hour").add(minutes, "minute");
    } else {
        console.error("Invalid jointime format:", jointime);
    }

    let started = now.isAfter(startTime);
    let remainingSecondsForStart = 0
    let remainingSecondsForjoin = 0

    if (started) {
        let isjoiningTimeExecd = now.isAfter(jointime)
        // console.log("joining time is execd", isjoiningTimeExecd);

        if (!isjoiningTimeExecd) {
            remainingSecondsForjoin = Math.max(jointime.diff(now, "seconds"), 0);
        }

    } else {
        remainingSecondsForStart = Math.max(startTime.diff(now, "seconds"), 0);
    }

    // console.log(`${remainingSecondsForStart + " " + remainingSecondsForjoin} seconds`);

    return { remainingSecondsForStart, remainingSecondsForjoin }
};


export const calculateExamRemining_Time = (duration:string|any) => {
    // duration -> "02:00 h"
    let now = dayjs();
    let startTime = now
    const minutesMatch = duration.match(/(\d+):(\d+)/); // Matches "00:15"
    let remainingSecondsForExam
    if (minutesMatch) {
        const [_, hours, minutes] = minutesMatch.map(Number);
        duration = startTime.add(hours, "hour").add(minutes, "minute");
        remainingSecondsForExam = Math.max(duration.diff(now, "seconds"), 0);
    } else {
        console.error("Invalid duration format:", duration);
    }

    return remainingSecondsForExam
}


export const useRemainingTime = (initialTime:any, action?:any) => {
    const [time, setTime] = useState(initialTime); // Initial time in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime:any) => {
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
                action()
            }, 1000);
        }
    }, [time]);



    // Convert seconds to "HH:MM:SS" format
    const formatTime = (timeInSeconds:number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return formatTime(time);
};




export default useExamTimetablehook;

