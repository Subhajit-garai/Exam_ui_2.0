import {
  setAvailableexams,
  setCategorys,
  setDpps,
  setExams,
  setExamYear,
  setMocks,
  setSyllabus,
} from "@repo/store/slice/examSlice";

import { ApiClient } from "../ApiClient";

// exam metadata

export class examApi {
  private api: ApiClient;
  constructor() {
    this.api = ApiClient.getInstance();
  }

  UserMetaDataForAnExam = async ({ examid }: { examid: string }) => {
    let endpoint = `/exam/usermetadataforanexam?examid=${examid}`;
    return await this.api.request(endpoint);
  };
  ExamAttemptQuestionMetaData = async ({ examid }: { examid: string }) => {
    let endpoint = `/exam/examattemptquestiondata?examid=${examid}`;
    return await this.api.request(endpoint);
  };

  // exam actions

  fetchCategorys = (dispatch: any) => {
    let endpoint = `/category/all`;
    this.api.apiDispatcher(endpoint, dispatch, setCategorys);
  };
  fetchAvalibleExam = (dispatch: any, category: string) => {
    let endpoint = `/exam/avalible/targeted/exam?category=${category}`;
    this.api.apiDispatcher(endpoint, dispatch, setAvailableexams);
  };
  fetchSyllabus = (dispatch: any, examname: string) => {
    let endpoint = `/exam/syllabus?syllabus=${examname}`;
    this.api.apiDispatcher(endpoint, dispatch, setSyllabus);
  };


  fetchExamYear = (dispatch: any, examname: string) => {
    let endpoint = `/exam/year/get?examname=${examname}`;
    this.api.apiDispatcher(endpoint, dispatch, setExamYear);
  };
  fetchExamYearById = (id: string) => {
    let endpoint = `/exam/year/get?id=${id}`;
    return this.api.request(endpoint);
  };
  fetchTargetExamById = (id: string) => {
    let endpoint = `/get/target/exam/id?id=${id}`;
    return this.api.request(endpoint);
  };

  // exam

  getTokensystem = async (type: string = "Test") => {
    let endpoint = `/exam/tokensystem?type=${type}`;
    return await this.api.request(endpoint);
  };

  fetchExams = (
    dispatch: any,
    type: string = "Exam",
    page: number = 1,
    limit: number = 16,
    order: "desc" | "asc" = "desc"
  ) => {
    let endpoint = `/exam/getExams?type=${type}&order=${order}&limit=${limit}&page=${page}`;
    switch (type) {
      case "Exam":
        this.api.apiDispatcher(endpoint, dispatch, setExams);
        break;
      case "Dpp":
        this.api.apiDispatcher(endpoint, dispatch, setDpps);
        break;
      case "Mock":
        this.api.apiDispatcher(endpoint, dispatch, setMocks);
        break;

      default:
        console.log("this exam type not mention");

        break;
    }
  };
  fetchExams_by_type = async (
    type: string = "Exam",
    page: number = 1,
    limit: number = 16,
    order: "desc" | "asc" = "desc"
  ) => {
    let endpoint = `/exam/getExams?type=${type}&order=${order}&limit=${limit}&page=${page}`;
    return await this.api.request(endpoint);
  };
  fetchExamsByid = async (id: string) => {
    if (!id) throw new Error("id undefind");
    let endpoint = `/exam/getexambyid?id=${id}`;
    return await this.api.request(endpoint);
  };
  getExamFilterByTime = async (
    starttime: string,
    endtime: string,
    type: string = "Exam"
  ) => {
    let endpoint = `/exam/getExams?starttime=${starttime}&endtime=${endtime}&type=${type}`;
    return await this.api.request(endpoint);
  };

  joinExams = async (id: string) => {
    // may be not used
    let endpoint = `/exam/join?id=${id}`;
    return await this.api.request(endpoint);
  };

  requestTojoinExam = async (id: string) => {
    let endpoint = `/exam/joinrequest?id=${id}`;
    return await this.api.request(endpoint);
  };
  examQestionfetch = async ({
    examid,
    type,
    number,
    part,
  }: {
    examid: string;
    type: string;
    number: number;
    part: string;
  }) => {
    let endpoint = `/exam/data?examid=${examid}&type=${type}&number=${number}&part=${part}`;
    return await this.api.request(endpoint);
  };

  saveExamAns = async ({
    examid,
    number,
    part,
    ans,
    ismultiple,
  }: {
    examid: string;
    number: number;
    part: string;
    ans: string[];
    ismultiple: string | boolean;
  }) => {
    let endpoint = `/exam/submitans?examid=${examid}&number=${number}&part=${part}&ans=${ans}&ismultiple=${ismultiple}`;
    return await this.api.request(endpoint);
  };
  finalSubmitExam = async ({ examid }: { examid: string }) => {
    let endpoint = `/exam/finalsubmit?examid=${examid}`;
    return await this.api.request(endpoint);
  };

  getUserAnsSet = async ({ examid }: { examid: string }) => {
    let endpoint = `/exam/getuseransset?examid=${examid}`;
    return await this.api.request(endpoint);
  };

  //  getExamAnsforAnalisys = async ({ examid }: { examid: string }) => {
  //   let endpoint = `/exam/getexamans?examid=${examid}`;
  //   return await this.api.request(endpoint);
  // };
}
