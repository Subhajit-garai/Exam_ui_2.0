// useraction
import { setUser } from "@repo/store/slice/userSlice";
import { ApiClient } from "../ApiClient";

// exam metadata

export class userApi {
  private api: ApiClient;
  constructor() {
    this.api = ApiClient.getInstance();
  }

  userLogout = () =>{
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
  forgotpassword = (data: any) => {
    let url = `/user/forgotpassword/verify`;
    return this.api.request(url, { method: "POST", data: data });
  };
}
