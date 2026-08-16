import { useEffect, useState } from "react";
import { SubjectListCard } from "./components/ListCard";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";
import { StatusAlert } from "@/design-system";
import { Link } from "react-router-dom";

export default function NoteSubjectList() {
  const dispatch = useAppDispatch();
  let { Subjects } = useAppSelector((state) => state.note);
  let { academic_profile } = useAppSelector((state) => state.user);

  let [errorMessage, setErrorMessage] = useState<{
    message: string;
    type: "error" | "success" | "warning" | "info" | "";
  }>({
    message: "",
    type: "",
  });
  const _ = useApi();

  useEffect(() => {
    (async () => {
      let res = await _.api.notes.fetchAvalibleSubjectforUser(dispatch);

      if (!res.success) {
        setErrorMessage({
          message: res.message,
          type: "error",
        });
      }
    })();
  }, []);

  return (
    <>
      <div className=" flex flex-col  gap-2">
        {!academic_profile && (
          <div className="p-4 pb-0">
            <StatusAlert
              type="warning"
              title="Update Academic Profile"
              message={
                <span>
                  Please{" "}
                  <Link to="/user/profile" className="underline font-semibold">
                    update your academic profile
                  </Link>{" "}
                  to get personalized notes.
                </span>
              }
            />
          </div>
        )}
        {errorMessage.type && (
          <StatusAlert
            type={errorMessage.type}
            title={errorMessage.type}
            message={errorMessage.message}
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {Subjects?.map((subject, idx) => {
            return <SubjectListCard key={idx} data={subject} />;
          })}
        </div>
      </div>
    </>
  );
}
