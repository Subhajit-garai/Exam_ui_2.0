import { useApi } from "@/ApiProvider";
import { useAppDispatch } from "@repo/store/hook";
import  { useEffect } from "react";

const LandingPage = () => {
  const _ = useApi();
  const dispatch = useAppDispatch();
  useEffect(() => {
    _.api.user.fetchuser(dispatch);
  }, []);
  return <div>LandingPage</div>;
};

export default LandingPage;
