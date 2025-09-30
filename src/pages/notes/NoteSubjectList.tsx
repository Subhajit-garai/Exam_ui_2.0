import  { useEffect } from "react";
import { SubjectListCard } from "./ListCard";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";

export default function NoteSubjectList() {
  const dispatch = useAppDispatch();
  let { Subjects } = useAppSelector((state) => state.note);
const _=useApi()
  useEffect(() => {
    // get notes topic/ subject list
    //redirct to /notes/[subject/topic]

    _.api.notes.fetchAvalibleSubject(dispatch);
  }, []);  

  return (
    <>
      <div className=" flex  gap-4">
        {Subjects.map((subject, idx) => {
          return <SubjectListCard key={idx} data={subject}  />;
        })}
      </div>
    </>
  );
}
