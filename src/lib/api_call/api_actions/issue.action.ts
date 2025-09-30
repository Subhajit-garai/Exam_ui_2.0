// issue actions

import { ApiClient } from "../ApiClient";

// exam metadata

export class issueApi {
  private api: ApiClient;
  constructor() {
    this.api = ApiClient.getInstance();
  }

  CreateIssue = async (data: any) => {
    // {
    //     type: string,
    //         note: string,
    //         sub_type: string,
    //             IssueDetails: {
    //         id: string,

    // },

    // }
    //     {

    //     "type":"QUESTION",
    //     "note":"title is incorrect",
    //     "sub_type":"title is incorrect",
    //     "IssueDetails":{
    //         "id": "asbajkjasa"
    //     }
    //  }

    const endpoint = `/issue/create`;
    return this.api.request(endpoint, { method: "POST", data: data });
  };

  getQuestionIssueResuestCount = async (id: string) => {
    const endpoint = `/issue/getquestionIssuecount?id=${id}`;
    return this.api.request(endpoint);
  };

  updateIssue = async (id: string, data: any) => {
    // {
    //     type: string,
    //         note: string,
    //         sub_type: string,
    //             IssueDetails: {
    //         id: string,

    // },

    // }

    const endpoint = `/issue/update?id=${id}`;
    return this.api.request(endpoint, { method: "PUT", data: data });
  };
  getbyidIssue = async (id: string) => {
    const endpoint = `/issue/getbyid?id=${id}`;
    return this.api.request(endpoint);
  };
  FetchAllIssue = async (baseUrl: string) => {
    const endpoint = `/issue/all`;
    return this.api.request(endpoint);
  };
  IsProcessedIssue = async (id: string) => {
    const endpoint = `/issue/isprocessed?id=${id}`;
    return this.api.request(endpoint);
  };
  DeleteIssue = async (id: string) => {
    const endpoint = `/issue/delete?id=${id}`;
    return this.api.request(endpoint);
  };
  priorityVoteIssue = async (id: string) => {
    const endpoint = `/issue/priorityVote?id=${id}`;
    return this.api.request(endpoint);
  };
  CloseIssue = async (id: string) => {
    const endpoint = `/issue/close?id=${id}`;
    return this.api.request(endpoint);
  };
  upVoteIssue = async (id: string) => {
    const endpoint = `/issue/upvote?id=${id}`;
    return this.api.request(endpoint, { method: "GET" });
  };
  downVoteIssue = async (id: string) => {
    const endpoint = `/issue/downvote?id=${id}`;
    return this.api.request(endpoint);
  };
  UpdateIssue = async (data: any) => {
    // { id = "", status = "" }
    // {
    //     id:String,
    //     status: String
    // }
    if (!data.id || !data.status)
      throw new Error("id or status is not defined");

    const endpoint = `/issue/updatestatus`;

    return this.api.request(endpoint, { method: "POST", data: data });
  };
}
