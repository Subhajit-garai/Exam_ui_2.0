import { Card } from "@/design-system/card";
import {
  ListChecks,
  Pencil,
  AlarmClockCheck,
  FileQuestion,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BetaTag } from "@repo/design-system/DevComponents/BetaTag";

export const ExamDashboard = () => {
  const navigate = useNavigate();

  const examSections = [
    {
      title: "Tests",
      description: "Practice with subject-wise and chapter-wise tests.",
      icon: ListChecks,
      color: "text-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      path: "/exam/test",
    },
    {
      title: "DPP",
      description: "Daily practice problems to keep your preparation sharp.",
      icon: Pencil,
      color: "text-pink-500",
      bg: "bg-pink-100 dark:bg-pink-900/30",
      path: "/exam/dpp",
    },
    {
      title: "Mock Exams",
      description:
        "Full-length mock exams to simulate the real test environment.",
      icon: AlarmClockCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      path: "/exam/mock",
    },
    {
      title: "PYQs",
      description:
        "Previous year questions to understand exam patterns and trends.",
      icon: FileQuestion,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      path: "/exam/pyq",
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full mb-20">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Exam Dashboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Select an exam type to start your preparation.
        </p>
      </div>

      <div className="">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examSections.map((section) => (
              <Card
                key={section.title}
                className="p-5 hover:border-indigo-500 cursor-pointer transition-all hover:shadow-md border-zinc-200 dark:border-zinc-800"
                onClick={() => navigate(section.path)}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${section.bg} flex items-center justify-center mb-4`}
                >
                  <section.icon className={section.color} size={24} />
                </div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {section.description}
                </p>
                <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                  Go to {section.title}{" "}
                  <ChevronRight size={14} className="ml-1" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;
