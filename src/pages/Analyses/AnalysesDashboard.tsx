import { Card } from "@/design-system/card";
import {
  BarChart2,
  Trophy,
  ChartLine,
  ChevronRight,
  Target,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BetaTag } from "@repo/design-system/DevComponents/BetaTag";
import { SyllabusProgressBar } from "./SyllabusProgressBar";
import { useAppSelector } from "@repo/store/hook";

export const AnalysesDashboard = () => {
  const navigate = useNavigate();
  const { academic_profile } = useAppSelector((state) => state.user);
  const examYearId = academic_profile?.year || "";

  const analysisSections = [
    {
      title: "Performance Overview",
      description: "A comprehensive look at your overall academic performance.",
      icon: BarChart2,
      color: "text-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      path: "/analysis/overview",
    },
    {
      title: "Mock Test Analysis",
      description: "Detailed breakdown of your performance in mock exams.",
      icon: Trophy,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      path: "/analysis/pyqmock",
    },
    {
      title: "Practice Test Analysis",
      description: "Analyze your strong and weak points in subject-wise tests.",
      icon: ChartLine,
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      path: "/analysis/test",
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full mb-20">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Performance Dashboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Track your progress and identify areas for improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Syllabus Progress */}
          {examYearId && (
            <Card className="p-6 border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                <Target size={20} className="text-rose-500" />
                Syllabus Completion
              </h3>
              <SyllabusProgressBar examYearId={examYearId} />
            </Card>
          )}

          {!examYearId && (
            <Card className="p-6 border-zinc-200 dark:border-zinc-800 bg-amber-50 dark:bg-amber-900/10">
              <p className="text-amber-800 dark:text-amber-400 text-sm">
                Please configure your academic profile to see syllabus progress.
              </p>
            </Card>
          )}

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisSections.map((section) => (
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
                  View Details <ChevronRight size={14} className="ml-1" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <BetaTag>
          <div className="space-y-6">
            <Card className="p-6 bg-zinc-900 text-white border-none shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-400 rounded-lg">
                  <Zap size={20} className="text-zinc-900" />
                </div>
                <h3 className="font-bold text-lg">Quick Insights</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">
                    Strongest Subject
                  </p>
                  <p className="text-xl font-bold text-white">Mathematics</p>
                  <p className="text-xs text-green-400 mt-1">Accuracy: 84%</p>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">
                    Needs Focus
                  </p>
                  <p className="text-xl font-bold text-white">Physics</p>
                  <p className="text-xs text-rose-400 mt-1">Accuracy: 62%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                Recent Scores
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: "Mock Test #4",
                    score: "156/200",
                    date: "2 days ago",
                    color: "text-green-500",
                  },
                  {
                    name: "Physics Quiz",
                    score: "42/50",
                    date: "4 days ago",
                    color: "text-indigo-500",
                  },
                  {
                    name: "Math Practice",
                    score: "18/30",
                    date: "1 week ago",
                    color: "text-amber-500",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </p>
                      <p className="text-xs text-zinc-500">{item.date}</p>
                    </div>
                    <span className={`text-sm font-bold ${item.color}`}>
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/analysis/overview")}
                className="w-full mt-4 py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                VIEW ALL PERFORMANCE DATA
              </button>
            </Card>
          </div>
        </BetaTag>
      </div>
    </div>
  );
};

export default AnalysesDashboard;
