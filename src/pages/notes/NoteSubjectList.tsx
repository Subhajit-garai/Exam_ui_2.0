import { useEffect } from "react";
import { SubjectListCard } from "./ListCard";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";
import { BetaTag } from "@repo/design-system/DevComponents/BetaTag";

export default function NoteSubjectList() {
  const dispatch = useAppDispatch();
  let { Subjects } = useAppSelector((state) => state.note);
  const _ = useApi();
  useEffect(() => {
    _.api.notes.fetchAvalibleSubject(dispatch);
  }, []);

  return (
    <>
      <BetaTag>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {Subjects.map((subject, idx) => {
            return <SubjectListCard key={idx} data={subject} />;
          })}
        </div>
      </BetaTag>
    </>
  );
}
