import { ApiClient } from "../ApiClient";

// exam metadata

export class eventApi {
  private api: ApiClient;
  constructor() {
    this.api = ApiClient.getInstance();
  }

   demo = async (id: string) => {
    const endpoint = `/demo?id=${id}`;
    return this.api.request(endpoint);
  };
}