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

    getQuizMetadataById = (id: string) => {
        let url = `/quiz/metadata?id=${id}`;
        return this.api.request(url);
    };

    startQuiz = (id: string) => {
        let url = `/quiz/start?id=${id}`;
        return this.api.request(url);
    };

    createQuiz = (data: {
        mode: string;
        subject: string;
        topic: string;
        total_questions: string;
        nextQuestionTime: string;
        ttl: string;
    }) => {
        let url = `/quiz/user/create`;
        return this.api.request(url, { method: "POST", data });
    };


    getQuizLeaderboard = (id: string) => {
        let url = `/user/activity/leaderboard/quiz?id=${id}`;
        return this.api.request(url);
    };
}
