import { ApiClient } from "./ApiClient";
import { eventApi } from "./api_actions/event.action";
import { examApi } from "./api_actions/exam.actions";
import { issueApi } from "./api_actions/issue.action";
import { metrixApi } from "./api_actions/metrix.action";
import { noteApi } from "./api_actions/notes.action";
import { paymentApi } from "./api_actions/payment.action";
import { questionApi } from "./api_actions/question.action";
import { userApi } from "./api_actions/user.actions";

export class AppApi {
  public client: ApiClient;
  public exam: examApi;
  public notes: noteApi;
  public metrix: metrixApi;
  public question: questionApi;
  public user: userApi;
  public event: eventApi;
  public issue: issueApi;
  public payment: paymentApi;
  //   public notes: NotesApi;

  constructor(baseUrl: string) {
    this.client = ApiClient.getInstance(baseUrl);
    this.exam = new examApi();
    this.notes = new noteApi();
    this.metrix = new metrixApi();
    this.question = new questionApi();
    this.user = new userApi();
    this.event = new eventApi();
    this.issue = new issueApi();
    this.payment = new paymentApi();
  }
}
