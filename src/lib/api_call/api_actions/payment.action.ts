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
  TokenCheckout = async (data: any, couponCode?: string) => {
    let endpoint = `/payment/checkout/tocken`;
    return await this.api.request(endpoint, {
      method: "POST",
      data: { ...data, couponCode },
    });
  };
  SubscriptionCheckout = async (data: any, couponCode?: string) => {
    let endpoint = `/payment/checkout/subscription`;
    return await this.api.request(endpoint, {
      method: "POST",
      data: { ...data, couponCode },
    });
  };
  getOfferAndSubscription = async () => {
    let endpoint = `/payment/offer`;
    return await this.api.request(endpoint);
  };

  applyCoupon = async (data: { couponCode: string; orderAmount: number }) => {
    let endpoint = `/payment/apply-coupon`;
    return await this.api.request(endpoint, {
      method: "POST",
      data: data,
    });
  };
}
