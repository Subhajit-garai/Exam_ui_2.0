# Payment Service Documentation

## Class: `paymentApi`

The `paymentApi` class handles payments, subscriptions, and offers.

### Methods

#### `getKey()`
Retrieves payment key.
- **Endpoint**: `/payment/getkey`
- **Method**: GET

#### `TokenCheckout(data)`
Initiates token checkout.
- **Endpoint**: `/payment/checkout/tocken`
- **Method**: POST
- **Body**: `data` object for checkout.

#### `SubscriptionCheckout(data)`
Initiates subscription checkout.
- **Endpoint**: `/payment/checkout/subscription`
- **Method**: POST
- **Body**: `data` object for checkout.

#### `getOfferAndSubscription()`
Retrieves available offers and subscriptions.
- **Endpoint**: `/payment/offer`
- **Method**: GET
