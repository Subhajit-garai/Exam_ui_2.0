import { useAppSelector } from "@repo/store/hook";
import {
  IconBook,
  IconChartBar,
  IconClock,
  IconTrophy,
  IconPlayerPlay,
} from "@tabler/icons-react";

import { ExamTimeline, type TimelineEvent } from "./ExamTimeline";
import { WelcomeHeader } from "./components/WelcomeHeader";
import { StatsGrid, type StatItem } from "./components/StatsGrid";
import { QuickActions, type ActionItem } from "./components/QuickActions";
import { DailyChallenge } from "./components/DailyChallenge";
import { RecentActivity, type ActivityItem } from "./components/RecentActivity";
import { useApi } from "@/ApiProvider";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastConfig } from "@/lib";

const Home = () => {
  const { name } = useAppSelector((state) => state.user);
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const stats: StatItem[] = [
    { label: "Tests Attempted", value: "12", icon: <IconBook size={24} />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Avg Score", value: "78%", icon: <IconTrophy size={24} />, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Study Hours", value: "45h", icon: <IconClock size={24} />, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Accuracy", value: "85%", icon: <IconChartBar size={24} />, color: "text-green-500", bg: "bg-green-500/10" },
  ];



  //ref
  //  const examEvents: TimelineEvent[] = [
  //     { id: "1", title: "Registration Starts", date: "Nov 01, 2025", description: "Online application form opens.", status: "completed" },
  //     { id: "2", title: "Form Correction", date: "Nov 15, 2025", description: "Last date for form corrections.", status: "completed" },
  //     { id: "3", title: "Admit Card Release", date: "Dec 10, 2025", description: "Download admit card from portal.", status: "current", notification: "Admit Card is Live!" },
  //     { id: "4", title: "Mock Test Series", date: "Dec 20, 2025", description: "Official mock tests begin.", status: "upcoming" },
  //     { id: "5", title: "Final Exam", date: "Jan 05, 2026", description: "All India Entrance Examination.", status: "upcoming" },
  //     { id: "6", title: "Result Declaration", date: "Feb 10, 2026", description: "Check results online.", status: "upcoming" },
  //   ];
  const [examEvents, setExamEvents] = useState<TimelineEvent[]>([]);

  const quickActions: ActionItem[] = [
    { title: "Join Test", desc: "Enter a code to join", icon: <IconPlayerPlay size={20} />, href: "/test/join", color: "bg-indigo-500" },
    { title: "Analysis", desc: "Check your progress", icon: <IconChartBar size={20} />, href: "/analysis/test", color: "bg-pink-500" },
    { title: "Practice", desc: "Topic-wise questions", icon: <IconBook size={20} />, href: "/question/create", color: "bg-orange-500" },
  ];

  // const recentActivity: ActivityItem[] = [
  //   { title: "Physics Mock Test 1", score: "82/100", date: "2 hours ago", status: "Completed" },
  //   { title: "Chemistry Chapter 4", score: "Pending", date: "Yesterday", status: "In Progress" },
  //   { title: "Maths Weekly Quiz", score: "95/100", date: "2 days ago", status: "Completed" },
  // ];
  const [recentActivity, setrecentActivity] = useState<ActivityItem[]>([])

  const _ = useApi()

  // loads  recentActivity
  useEffect(() => {
    (async () => {
      const res = await _.api.user.getRecentActivity()
      if (res.success) {
        setrecentActivity(res.data)
        toast.success(res.message, ToastConfig(800))
      } else {
        toast.error(res.message, ToastConfig(1000))
      }
    })()
  }, [])

  // loads examEvents
  useEffect(() => {
    (async () => {
      const res = await _.api.user.getExamTimeline()
      if (res.success) {
        setExamEvents(res.data)
        toast.success(res.message, ToastConfig(800))
      } else {
        toast.error(res.message, ToastConfig(1000))
      }
    })()
  }, [])

  return (
    <div className="flex flex-col gap-6 p-4 max-w-7xl mx-auto w-full">
      <WelcomeHeader name={name} date={date} />

      <StatsGrid stats={stats} />

      <ExamTimeline events={examEvents} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <QuickActions actions={quickActions} />
          <DailyChallenge />
        </div>

        <RecentActivity activities={recentActivity} />
      </div>
    </div>
  );
};

export default Home;
