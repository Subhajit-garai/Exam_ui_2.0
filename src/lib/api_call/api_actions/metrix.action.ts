import { ApiClient } from "../ApiClient";

// exam metadata

export class metrixApi {
  private api: ApiClient;
  constructor() {
    this.api = ApiClient.getInstance();
  }
  // metrix

  getsubjectwiseMetrixData = async (
    offset: string,
    startDate?: string,
    endDate?: string
  ) => {
    startDate = startDate ? startDate : "7";
    endDate = endDate ? endDate : "7";
    offset = offset ? offset : "day";

    let endpoint = `/metrix/getsubjectwisescore?offset=${offset}&startDate=${startDate}&endDate=${endDate}`;
    return this.api.request(endpoint);
  };

  getScoreMetrixData = async (
    offset: string,
    startDate?: string,
    endDate?: string
  ) => {
    startDate = startDate ? startDate : "7";
    endDate = endDate ? endDate : "7";
    offset = offset ? offset : "day";

    let endpoint = `/metrix/getscore?offset=${offset}&startDate=${startDate}&endDate=${endDate}`;
    return this.api.request(endpoint);
  };
  getperformanceMetrix = async () => {
    let endpoint = `/metrix/performance`;
    return this.api.request(endpoint);
  };
  getleaderboardMetrix = async (examid: string, offset: string) => {
    let endpoint = `/metrix/leaderbord?examid=${examid}&offset=${offset}`;
    return this.api.request(endpoint);
  };
  getFullleaderboardMetrix = async (examid: string) => {
    let endpoint = `/metrix/fullleaderbord?examid=${examid}`;
    return this.api.request(endpoint);
  };
  getExamWeeknessMetrix = async (examid: string) => {
    let endpoint = `/metrix/examweeknessmetrix?examid=${examid}`;
    return this.api.request(endpoint);
  };
}
