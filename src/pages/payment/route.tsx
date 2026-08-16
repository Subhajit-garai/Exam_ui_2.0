import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";

import Payment from "./payment";
import Checkout from "./Checkout";
import PaymentSuccess from "./PaymentSuccess";

export const paymentRoutes: RouteObject = {
  path: "*",
  children: [
    { index: true, element: <Payment /> },
    { path: "checkout", element: <Checkout /> },
    { path: "success", element: <PaymentSuccess /> },
  ],
};

export const PaymentRoutes = () => {
  return useRoutes([paymentRoutes]);
};

export default PaymentRoutes;
