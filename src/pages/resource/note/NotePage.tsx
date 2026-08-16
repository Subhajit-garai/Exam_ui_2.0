import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NoteViewer } from "./Noteviewer";
import { useApi } from "@/ApiProvider";
import { useReadingTracker } from "@/hooks/useReadingTracker";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { ToastConfig } from "@/lib";

import { IconClock } from "@tabler/icons-react";

export function NotePage() {
  const { subject, topic } = useParams();
  const [content, setContent] = useState("");

  if (!subject || !topic) {
    throw console.log("subject or topic is not valid");
  }

  const _ = useApi();

  const { timeSpent, formatTime } = useReadingTracker(topic);

  const handleMarkComplete = async () => {
    if (!topic) return;
    try {
      await _.api.progress.markComplete(topic);
      toast.success("Progress updated successfully!", ToastConfig(2000));
    } catch (error) {
      console.error("Failed to mark topic as completed", error);
      toast.error("Failed to update progress", ToastConfig(2000));
    }
  };

  useEffect(() => {
    (async () => {
      let note_cont = await _.api.notes.fetchNotes(subject, topic);
      if (note_cont?.success && note_cont.data) {
        setContent(note_cont.data.content);
      }
    })();
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
