// NotePage.jsx
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { NoteViewer } from "./Noteviewer";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";
import { useReadingTracker } from "@/hooks/useReadingTracker";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { ToastConfig } from "@/lib";

import { IconClock } from "@tabler/icons-react";

export function NotePage() {
  const { category, topic } = useParams();

  if (!category || !topic) {
    throw console.log("subject or topic is not valid");
  }

  const dispatch = useAppDispatch();
  let { content, currentTopic } = useAppSelector((state) => state.note);
  const _ = useApi()

  const { timeSpent, formatTime } = useReadingTracker(currentTopic);

  const handleMarkComplete = async () => {
    console.log("currentTopic --->", currentTopic);

    if (!currentTopic) return;
    try {
      await _.api.progress.markComplete(currentTopic);
      toast.success("Progress updated successfully!", ToastConfig(2000));
    } catch (error) {
      console.error("Failed to mark topic as completed", error);
      toast.error("Failed to update progress", ToastConfig(2000));
    }
  };

  useEffect(() => {
    _.api.notes.fetchNotes(dispatch, category, topic);
  }, []);

  return (
    <div>
      <div className="bg-[var(--card)] p-4 w-full rounded-md">
        {content ? (
          <>
            <div className="mb-4 flex justify-between gap-2">
              <Button variant="outline" className="gap-2 text-muted-foreground cursor-default hover:bg-transparent">
                <IconClock size={16} />
                Reading: {formatTime(timeSpent)}
              </Button>
              <Button onClick={handleMarkComplete} variant="outline" className="gap-2">
                <CheckCircle size={16} />
                Mark as Read
              </Button>
            </div>
            <NoteViewer content={content} />
          </>
        ) : (
          <p>Loading note .....</p>
        )}
      </div>
    </div>
  );
}
