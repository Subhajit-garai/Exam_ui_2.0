import { useEffect, useState } from "react";
import { useApi } from "@/ApiProvider";

export const SyllabusProgressBar = ({ examYearId }: { examYearId: string }) => {
    const _ = useApi();
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        if (!examYearId) return;
        _.api.progress.getSyllabusStats(examYearId).then((res) => {
            // Assuming API returns { data: { totalProgress: number, subjects: [] } }
            // Adjust based on actual response structure verification
            if (res && res.data) {
                setStats(res.data);
            }
        }).catch(err => {
            console.error("Failed to load progress stats", err);
        });
    }, [examYearId]);

    if (!stats) return <div className="p-4 bg-white rounded-lg shadow animate-pulse h-24">Loading progress...</div>;

    const totalProgress = Math.round(stats.totalProgress || 0);

    return (
        <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-end mb-3">
                <span className="font-bold text-lg text-gray-800">Syllabus Coverage</span>
                <span className="text-2xl font-bold text-blue-600">{totalProgress}%</span>
            </div>

            {/* Main Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-3 mb-6 overflow-hidden">
                <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${totalProgress}%` }}
                ></div>
            </div>

            {/* Subject Breakdown */}
            {stats.subjects && stats.subjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stats.subjects.map((sub: any) => (
                        <div key={sub.subjectId} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                                <span className="text-xs font-semibold text-gray-500">{Math.round(sub.progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                    className="bg-green-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${sub.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
