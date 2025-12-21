import { useAppSelector } from "@repo/store/hook";
import { SyllabusProgressBar } from "./SyllabusProgressBar";

export const Dashboard = () => {
  const { academicProfile } = useAppSelector((state) => state.user);
  // Assuming academicProfile.year is the ID or we need to derive it. If it's just '2025', we might need an ID.
  // However, usually these profiles link to specific IDs. Let's assume academicProfile.year or exam is the ID.
  // If not, we might need to fetch the active exam year ID. For now, passing academicProfile?.year or exam.
  // If undefined, the component handles it.
  const examYearId = academicProfile?.year || "";

  return (
    <div className="main bg-background p-6 space-y-6">
      <div className="text-2xl font-bold">Dashboard</div>
      {examYearId ? (
        <SyllabusProgressBar examYearId={examYearId} />
      ) : (
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
          Please configure your academic profile to see progress.
        </div>
      )}
    </div>
  );
};


