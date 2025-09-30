import { useEffect } from "react";
import {  TopicListCard } from "./ListCard";
import { useApi } from "@/ApiProvider";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";

export default function NoteTopicList() {
  const dispatch = useAppDispatch();
  let {  Topics ,correntSubject} = useAppSelector((state) => state.note);
  const _ =useApi()

  useEffect(() => {
    _.api.notes.fetchSubject_topics(dispatch,correntSubject);
  }, []);

  return (
    <>
      <div className=" flex gap-4 ">
        {Topics.map((note, idx) => {
          return <TopicListCard key={idx} data={note} />;
        })}
      </div>
    </>
  );
}
