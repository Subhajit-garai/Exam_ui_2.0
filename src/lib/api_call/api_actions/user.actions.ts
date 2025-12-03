// useraction
import { setUser } from "@repo/store/slice/userSlice";
import { ApiClient } from "../ApiClient";

// exam metadata

export class userApi {
  private api: ApiClient;
  constructor() {
    this.api = ApiClient.getInstance();
  }


  forgotpassword = (data: any) => {
    let url = `/user/forgotpassword`;
    return this.api.request(url, { method: "POST", data: data });
  };

  forgotpasswordverify = (data: any) => {
    let url = `/user/forgotpassword/verify`;
    return this.api.request(url, { method: "POST", data: data });
  };
  login = (data: any) => {
    let url = `/user/signin`;
    return this.api.request(url, { method: "POST", data: data });
  };

  signup = (data: any) => {
    let url = `/user/signup`;
    return this.api.request(url, { method: "POST", data: data });
  };

  userLogout = () => {
    let url = `/user/logout`;
    return this.api.request(url);
  }
  fetchuser = (dispatch: any) => {
    let url = `/user/auth`;
    this.api.apiDispatcher(url, dispatch, setUser);
  };
  // user verification
  genTockenFroEmail = (data: any) => {
    let url = `/user/validate/email`;
    return this.api.request(url, { method: "POST", data: data });
  };
  genTockenFroTelegram = (data: any) => {
    let url = `/user/validate/telegramid`;
    return this.api.request(url, { method: "POST", data: data });
  };
  veryfyTockenFroEmail = (data: any) => {
    let url = `/user/verify/email`;
    return this.api.request(url, { method: "POST", data: data });
  };
  veryfyTockenFroTelegram = (data: any) => {
    let url = `/user/verify/telegramid`;
    return this.api.request(url, { method: "POST", data: data });
  };


  getRecentActivity = () => {
    let url = `/user/activity/recent`;
    return this.api.request(url);
  };

  getExamTimeline = () => {
    let url = `/user/timeline`;
    return this.api.request(url);
  };

  updateAcademicProfile = (data: { academicProfile: { category: string, exam: string, year: string }, standard?: string, stream?: string, school?: string }) => {
    let url = `/user/profile/academic/update`;
    return this.api.request(url, { method: "PUT", data });
  };

  getSubscriptionTiers = () => {
    let url = `/user/subscription/tiers`;
    return this.api.request(url);
  };

  getWsToken = () => {
    let url = `/user/ws-token`;
    return this.api.request(url);
  };
}
