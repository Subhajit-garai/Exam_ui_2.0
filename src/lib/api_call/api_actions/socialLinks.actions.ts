import { ApiClient } from "../ApiClient";

export class SocialLinksApi {
    private api: ApiClient;
    constructor() {
        this.api = ApiClient.getInstance();
    }

    getSocialLinks = () => {
        console.log("Fetching social links...");
        let url = `/user/sociallinks`;
        return this.api.request(url);
    };

    addSocialLink = (data: any) => {
        console.log("Adding social link:", data);
        let url = `/user/sociallinks`;
        return this.api.request(url, { method: "POST", data: data });
    };

    updateSocialLink = (id: string, data: any) => {
        console.log(`Updating social link ${id}:`, data);
        let url = `/user/sociallinks/${id}`;
        return this.api.request(url, { method: "PUT", data: data });
    };

    deleteSocialLink = (id: string) => {
        console.log(`Deleting social link ${id}`);
        let url = `/user/sociallinks/${id}`;
        return this.api.request(url, { method: "DELETE" });
    };
}
