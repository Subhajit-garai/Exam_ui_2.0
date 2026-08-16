import { ApiClient } from "../ApiClient";
import { setSubjects, setTopics } from "@repo/store/slice/noteSlice";

// exam metadata

export class noteApi {
  private api: ApiClient;
  constructor() {
    this.api = ApiClient.getInstance();
  }

  // notes

  fetchAvalibleSubjectforUser = (dispatch: any) => {
    let endpoint = `/user/notes/subject/all`;
    return this.api.apiDispatcher(endpoint, dispatch, setSubjects);
  };
  fetchSubject_topics = (dispatch: any, Subject: string) => {
    let endpoint = `/notes/${Subject}/topic/all`;
    return this.api.apiDispatcher(endpoint, dispatch, setTopics);
  };

  fetchNotes = async (Subject: string, topic: string) => {
    let endpoint = `/notes/note/${Subject}/${topic}`;
    return await this.api.request(endpoint);
  };

  getSubjects = async (
    exam?: string,
    dispatch?: any,
    setinredux: boolean = false,
  ) => {
    let endpoint = `/notes/subject/all`;
    if (exam) {
      endpoint += `?exam=${exam}`;
    }
    if (setinredux) {
      this.api.apiDispatcher(endpoint, dispatch, setSubjects);
    }
    return await this.api.request(endpoint);
  };

  getTopics = async (
    subject: string,
    dispatch?: any,
    setinredux: boolean = false,
  ) => {
    let endpoint = `/notes/${subject}/topic/all`;
    if (setinredux) {
      this.api.apiDispatcher(endpoint, dispatch, setTopics);
    }
    return await this.api.request(endpoint);
  };
}
