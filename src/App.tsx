import { HashRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// outlets
import {
  FullpageOutlet,
  ProtectedRoute,
} from "@repo/design-system/outlets/index";

// pages
import Home from "./pages/home/Home.js";
import ErrorPage from "./pages/default/ErrorPage.js";
import Login from "./pages/auth/Login.js";
import ForgotPassword from "./pages/auth/ForgotPassword.js";
import Signup from "./pages/auth/Signup.js";
import ValidateEmailwhileLogin from "./pages/auth/ValidateEmailwhileLogin.js";

// exam
import Examportal from "./pages/exam/Examportal/Examportal.js";

// components
import { Appbar } from "@repo/design-system/navbars/Appbar";
import { Component as Breadcrumb } from "@repo/design-system/navbars/Breadcrumb";
import { Header } from "@repo/design-system/navbars/Header";

import { store } from "@repo/store/store.js";
import { Provider } from "react-redux";
import { ValidationForgotpassword } from "./pages/user/ValidationUserPage.js";
import LegalPages from "./pages/legal/LegalPages.js";
import { ApiProvider } from "./ApiProvider.js";

// Modular Route Imports
import ActivityRoutes from "./pages/activity/route.js";
import AnalysesRoutes from "./pages/analyses/route.js";
import ExamRoutes from "./pages/exam/route.js";
import UserRoutes from "./pages/user/route.js";
import ResourceRoutes from "./pages/resource/route.js";
import IssueRoutes from "./pages/issue/route.js";
import PaymentRoutes from "./pages/payment/route.js";

let baseUrl = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  return (
    <>
      <ApiProvider baseUrl={baseUrl}>
        <div className=" min-h-screen  overflow-hidden   no-visible-scrollbar">
          <HashRouter>
            <Provider store={store}>
              <ToastContainer />
              <Appbar />
              <Header
                LogoUrl={"/assets/logo/logo-png.png"}
                BrandName={"exambuddys"}
              />

              <div className="main flex  flex-col text-[var(--text-primary)]   lg:pl-[5rem]  w-screen pb-24 md:pb-0 ">
                <Breadcrumb />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/" element={<FullpageOutlet />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/forgotpassword"
                      element={<ForgotPassword />}
                    />
                    <Route
                      path="/forgotpassword/verify"
                      element={<ValidationForgotpassword />}
                    />
                    <Route path="/term" element={<LegalPages />} />
                    <Route path="/privacy" element={<LegalPages />} />
                    <Route path="/refund" element={<LegalPages />} />
                    <Route path="/contact" element={<LegalPages />} />

                    <Route
                      path="/login/validate/email"
                      element={<ValidateEmailwhileLogin />}
                    />
                    <Route path="/signup" element={<Signup />} />
                  </Route>
                  <Route path="/" element={<ProtectedRoute />}>
                    <Route path="examportal" element={<Examportal />} />
                    <Route path="payment/*" element={<PaymentRoutes />} />
                  </Route>

                  {/* Feature Module Routes */}
                  <Route path="/resource/*" element={<ResourceRoutes />} />
                  <Route path="/user/*" element={<UserRoutes />} />
                  <Route path="/activity/*" element={<ActivityRoutes />} />
                  <Route path="/analysis/*" element={<AnalysesRoutes />} />
                  <Route path="/exam/*" element={<ExamRoutes />} />
                  <Route path="/issue/*" element={<IssueRoutes />} />

                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </div>
            </Provider>
          </HashRouter>
        </div>
      </ApiProvider>
    </>
  );
};

export default App;
