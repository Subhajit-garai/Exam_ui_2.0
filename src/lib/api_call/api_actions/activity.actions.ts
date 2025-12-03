import { ApiClient } from "../ApiClient";

export class activityApi {
    private api: ApiClient;
    constructor() {
        this.api = ApiClient.getInstance();
    }

    getActivities = (page: number = 1, limit: number = 10) => {
        let url = `/user/activity?page=${page}&limit=${limit}`;
        return this.api.request(url);
    };

    getActivityStats = () => {
        let url = `/user/activity/stats`;
        return this.api.request(url);
    };

    logActivity = (data: { type: string; title: string; description?: string; status?: string; metadata?: any }) => {

        let url = `/user/activity/log`;
        return this.api.request(url, { method: "POST", data });
    };

    getRewards = () => {
        let url = `/user/rewards`;
        return this.api.request(url);
    };

    getDailyChallenge = () => {
        let url = `/user/activity/challenge/daily`;
        return this.api.request(url);
    };
    getDailyCompletedChallenge = () => {
        let url = `/user/activity/challenge/daily/completed`;
        return this.api.request(url);
    };
    getPastChallenges = () => {
        let url = `/user/activity/challenge/history`;
        return this.api.request(url);
    };
}
