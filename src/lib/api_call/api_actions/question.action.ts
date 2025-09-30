import { ApiClient } from "../ApiClient";

// exam metadata

export class questionApi {
  private api: ApiClient;
  constructor() {
    this.api = ApiClient.getInstance();
  }

  // questions
  GetQuestionExplanationData = async ({
    questionid,
  }: {
    questionid: string;
  }) => {
    let endpoint = `/question/getquestionexplanation?questionid=${questionid}`;
    return await this.api.request(endpoint);
  };
}
