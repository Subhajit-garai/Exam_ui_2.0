import type { SocialPlatform } from "@/lib/constants/question.constants.type";
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


    createOrupdateSocialLink = (data: { platform: SocialPlatform, link: string }) => {
        console.log(`Updating social link ${data.platform}:`, data);
        let url = `/user/profile/sociallinks`;
        return this.api.request(url, { method: "PUT", data: data });
    };

    deleteSocialLink = ({ platform }: { platform: SocialPlatform }) => {
        console.log("platform ---> ", platform);
        let url = `/user/profile/sociallinks/${platform}`;
        return this.api.request(url, { method: "DELETE" });
    };
}
