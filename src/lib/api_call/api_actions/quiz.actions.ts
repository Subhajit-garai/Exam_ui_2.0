import { ApiClient } from "../ApiClient";

export class quizApi {
    private api: ApiClient;
    constructor() {
        this.api = ApiClient.getInstance();
    }

    getAvailableQuizzes = () => {
        let url = `/quiz/available`;
        return this.api.request(url);
    };

    createQuiz = (data: { mode: string; subject: string; topic: string }) => {
        let url = `/quiz/user/create`;
        return this.api.request(url, { method: "POST", data });
    };
}
