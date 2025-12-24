import { useEffect, useState } from "react";
import { SubjectListCard } from "./ListCard";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";
import { StatusAlert } from "@/design-system";


export default function NoteSubjectList() {
  const dispatch = useAppDispatch();
  let { Subjects } = useAppSelector((state) => state.note);

  let [errorMessage, setErrorMessage] = useState<{
    message: string,
    type: "error" | "success" | "warning" | "info" | ""
  }>({
    message: "",
    type: ""
  })
  const _ = useApi();

  useEffect(() => {

    (async () => {
      let res = await _.api.notes.fetchAvalibleSubjectforUser(dispatch);

      if (!res.success) {
        setErrorMessage({
          message: res.message,
          type: "error"
        })
      }
    })()

  }, []);

  return (
    <>


      {errorMessage.type && <StatusAlert type={errorMessage.type} title={errorMessage.type} message={errorMessage.message} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {Subjects?.map((subject, idx) => {
          return <SubjectListCard key={idx} data={subject} />;
        })}
      </div>

    </>
  );
}
