import { ApiClient } from "../ApiClient";

// exam metadata

export class eventApi {
  private api: ApiClient;
  constructor() {
    this.api = ApiClient.getInstance();
  }

}