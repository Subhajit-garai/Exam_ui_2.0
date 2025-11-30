import { ApiClient } from "../ApiClient";

// exam metadata

export class paymentApi {
  private api: ApiClient;
  constructor() {
    this.api = ApiClient.getInstance();
  }
  // payment

  getKey = async () => {
    let endpoint = `/payment/getkey`;
    return await this.api.request(endpoint);
  };
  TokenCheckout = async (data: any) => {
    let endpoint = `/payment/checkout/tocken`;
    return await this.api.request(endpoint, {
      method: "POST",
      data: data,
    });
  };
  SubscriptionCheckout = async (data: any) => {
    let endpoint = `/payment/checkout/subscription`;
    return await this.api.request(endpoint, {
      method: "POST",
      data: data,
    });
  };
  getOfferAndSubscription = async () => {
    let endpoint = `/payment/offer`;
    return await this.api.request(endpoint);
  };
}
