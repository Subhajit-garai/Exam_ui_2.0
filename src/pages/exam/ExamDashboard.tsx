import { Card } from "@/design-system/card";
import { ListChecks, Pencil, AlarmClockCheck, FileQuestion, ChevronRight, GraduationCap } from "lucide-react";
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
            path: "/exam/test"
        },
        {
            title: "DPP",
            description: "Daily practice problems to keep your preparation sharp.",
            icon: Pencil,
            color: "text-pink-500",
            bg: "bg-pink-100 dark:bg-pink-900/30",
            path: "/exam/dpp"
        },
        {
            title: "Mock Exams",
            description: "Full-length mock exams to simulate the real test environment.",
            icon: AlarmClockCheck,
            color: "text-emerald-500",
            bg: "bg-emerald-100 dark:bg-emerald-900/30",
            path: "/exam/mock"
        },
        {
            title: "PYQs",
            description: "Previous year questions to understand exam patterns and trends.",
            icon: FileQuestion,
            color: "text-amber-500",
            bg: "bg-amber-100 dark:bg-amber-900/30",
            path: "/exam/pyq"
        }
    ];

    return (

        <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full mb-20">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">Exam Dashboard</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">Select an exam type to start your preparation.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Quick Access Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {examSections.map((section) => (
                            <Card
                                key={section.title}
                                className="p-5 hover:border-indigo-500 cursor-pointer transition-all hover:shadow-md border-zinc-200 dark:border-zinc-800"
                                onClick={() => navigate(section.path)}
                            >
                                <div className={`w-12 h-12 rounded-xl ${section.bg} flex items-center justify-center mb-4`}>
                                    <section.icon className={section.color} size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">{section.title}</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{section.description}</p>
                                <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                                    Go to {section.title} <ChevronRight size={14} className="ml-1" />
                                </div>
                            </Card>
                        ))}
                    </div>

                    <BetaTag>

                        {/* Exam Tips / Info Card */}
                        <Card className="p-6 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-4">Preparation Tips</h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                    <span>Regular practice with <b>DPPs</b> helps in maintaining consistency.</span>
                                </li>
                                <li className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                    <span><b>Mock Exams</b> are best taken at the same time as your actual exam schedule.</span>
                                </li>
                                <li className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                    <span>Analyze your <b>PYQs</b> to identify topics with the highest weightage.</span>
                                </li>
                            </ul>
                        </Card>

                    </BetaTag>
                </div>

                <BetaTag>

                    <div className="space-y-6">
                        <Card className="p-6 bg-indigo-600 text-white border-none shadow-lg shadow-indigo-500/20">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <GraduationCap size={24} className="text-white" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Exam Readiness</h3>
                            <p className="text-indigo-100 text-sm mb-6">Complete more tests and mocks to increase your readiness score.</p>
                            <div className="relative h-2 bg-indigo-900/30 rounded-full mb-2 overflow-hidden">
                                <div className="absolute top-0 left-0 h-full bg-white rounded-full" style={{ width: '45%' }} />
                            </div>
                            <p className="text-xs text-indigo-200">Current Score: 450/1000</p>
                        </Card>

                        <Card className="p-6 border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">Latest Updates</h3>
                            <div className="space-y-4">
                                <div className="border-l-2 border-amber-500 pl-4 py-1">
                                    <p className="text-sm font-medium">New Mock Added</p>
                                    <p className="text-xs text-zinc-500 mt-1">JECA 2025 Full Mock Exam is now available.</p>
                                </div>
                                <div className="border-l-2 border-emerald-500 pl-4 py-1">
                                    <p className="text-sm font-medium">DPP Updated</p>
                                    <p className="text-xs text-zinc-500 mt-1">Mathematics Vector Algebra DPP added.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </BetaTag>
            </div>
        </div>

    );
};

export default ExamDashboard;
