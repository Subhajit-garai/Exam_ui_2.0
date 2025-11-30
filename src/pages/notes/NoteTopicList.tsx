import { useEffect } from "react";
import { TopicListCard } from "./ListCard";
import { useApi } from "@/ApiProvider";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";

export default function NoteTopicList() {
  const dispatch = useAppDispatch();
  let { Topics, currentSubject } = useAppSelector((state) => state.note);
  const _ = useApi()

  useEffect(() => {
    _.api.notes.fetchSubject_topics(dispatch, currentSubject);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {Topics.map((note, idx) => {
          return <TopicListCard key={idx} data={note} />;
        })}
      </div>
    </>
  );
}
