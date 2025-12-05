import { ApiClient } from "../ApiClient";
import {
  setContentData,
  setSubjects,
  setTopics,
} from "@repo/store/slice/noteSlice";

// exam metadata

export class noteApi {
  private api: ApiClient;
  constructor() {
    this.api = ApiClient.getInstance();
  }

  // notes

  fetchAvalibleSubjectforUser = (dispatch: any) => {
    let endpoint = `/user/notes/allsubject`;
    return this.api.apiDispatcher(endpoint, dispatch, setSubjects);
  };
  fetchSubject_topics = (dispatch: any, Subject: string) => {
    let endpoint = `/notes/alltopic/${Subject}`;
    return this.api.apiDispatcher(endpoint, dispatch, setTopics);
  };

  fetchNotes = (dispatch: any, Subject: string, topic: string) => {
    let endpoint = `/notes/getnote/${Subject}/${topic}`;
    this.api.apiDispatcher(endpoint, dispatch, setContentData);
  };

  getSubjects = async (exam?: string, dispatch?: any, setinredux: boolean = false) => {
    let endpoint = `/notes/allsubject`;
    if (exam) {
      endpoint += `?exam=${exam}`;
    }
    if (setinredux) {
      this.api.apiDispatcher(endpoint, dispatch, setSubjects);
    }
    return await this.api.request(endpoint);
  };

  getTopics = async (subject: string, dispatch?: any, setinredux: boolean = false) => {
    let endpoint = `/notes/alltopic/${subject}`;
    if (setinredux) {
      this.api.apiDispatcher(endpoint, dispatch, setTopics);
    }
    return await this.api.request(endpoint);
  };
}
