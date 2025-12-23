import { ApiClient } from "../ApiClient";
// import { setContentData, setSubjects, setTopics } from "@repo/store/slice/noteSlice";

export const ProgressStatus = {
    NOT_STARTED: "NOT_STARTED",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED"
} as const;

export class progressApi {
    private api: ApiClient;
    private BASE_URL = '/progress';

    constructor() {
        this.api = ApiClient.getInstance();
    }

    // Heartbeat: Call this every 30-60 seconds
    trackTime = async (topicName: string, timeSpentDelta: number) => {
        return await this.api.request(`${this.BASE_URL}/track`, {
            method: 'POST',
            data: { topicName, timeSpentDelta }
        });
    };

    // Milestone: Call this when user finishes reading
    markComplete = async (topicName: string) => {
        return await this.api.request(`${this.BASE_URL}/status`, {
            method: 'PUT',
            data: { topicName, status: ProgressStatus.COMPLETED }
        });
    };

    // Dashboard: Fetch aggregated stats
    getSyllabusStats = async (examYearId: string) => {
        return await this.api.request(`${this.BASE_URL}/syllabus/${examYearId}`);
    };

    // Home: Fetch user dashboard stats
    getUserStats = async () => {
        return await this.api.request(`${this.BASE_URL}/dashboard-stats`);
    };

    // Topic: Fetch specific topic progress
    getTopicProgress = async (topicId: string) => {
        return await this.api.request(`${this.BASE_URL}/topic/${topicId}`);
    };

    // Topics: Fetch all user topics progress
    getUserTopicsProgress = async () => {
        return await this.api.request(`${this.BASE_URL}/user/topics`);
    };
}
