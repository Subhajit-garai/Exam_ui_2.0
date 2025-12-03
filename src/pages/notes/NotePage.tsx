// NotePage.jsx
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { NoteViewer } from "./Noteviewer";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";

export function NotePage() {
  const { category, topic } = useParams();

  if (!category || !topic) {
    throw console.log("subject or topic is not valid");
  }

  const dispatch = useAppDispatch();
  let { content } = useAppSelector((state) => state.note);
  const _ = useApi()
  useEffect(() => {
    _.api.notes.fetchNotes(dispatch, category, topic);
  }, []);

  return (
    <div>
      <div className="bg-[var(--card)] p-4 w-full rounded-md">
        {content ? <NoteViewer content={content} /> : <p>Loading note .....</p>}
      </div>
    </div>
  );
}
