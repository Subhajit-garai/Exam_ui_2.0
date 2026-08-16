import { Card } from "@/design-system/card";
import { BrainCircuit, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BetaTag } from "@repo/design-system/DevComponents/BetaTag";

export const ActivityDashboard = () => {
  const navigate = useNavigate();

  const activitySections = [
    {
      title: "Quizzes",
      description: "Practice with 1v1, 1vMany, and team quizzes.",
      icon: BrainCircuit,
      color: "text-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      path: "/activity/quiz",
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full mb-20">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Activity Dashboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Track your progress and join activities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activitySections.map((section) => (
              <Card
                key={section.title}
                className="p-4 hover:border-indigo-500 cursor-pointer transition-all hover:shadow-md border-zinc-200 dark:border-zinc-800"
                onClick={() => navigate(section.path)}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${section.bg} flex items-center justify-center mb-3`}
                >
                  <section.icon className={section.color} size={20} />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  {section.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {section.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
        <BetaTag>
          <div className="space-y-6">
            <Card className="p-6 bg-zinc-900 text-white border-none">
              <h3 className="font-bold text-lg mb-2">Leaderboard</h3>
              <p className="text-zinc-400 text-sm mb-4">
                See where you stand among your peers.
              </p>
              <button
                onClick={() => navigate("/activity/leaderboard")}
                className="w-full py-2 bg-white text-zinc-900 rounded-md font-medium text-sm hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
              >
                View Leaderboard <ChevronRight size={16} />
              </button>
            </Card>
          </div>
        </BetaTag>
      </div>
    </div>
  );
};

export default ActivityDashboard;
