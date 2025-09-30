import { HashRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// outlates
import {
  FullpageOutlet,
  SplitOutlet,
  ProtectedRoute,
} from "@repo/design-system/outlets/index";

// pages
import Home from "./pages/Home/Home.js";
// defultpages
// import LandingPage from "./pages/DefaultPages/LandingPage.js";
import ErrorPage from "./pages/DefaultPages/ErrorPage.js";
//authpages
import Login from "./pages/authpages/Login.js";
import Signup from "./pages/authpages/Signup.js";
import ValidateEmailwhileLogin from "./pages/authpages/ValidateEmailwhileLogin.js";

//exam
import Examportal from "./pages/exam/Examportal/Examportal.js";
// import Exam from "./pages/exam/Exam.js";
import ExamSubmitSuccess from "./pages/exam/ExamSubmitSuccess.js";
import JoinTests from "./pages/exam/JoinTests.js";
import JoinDpp from "./pages/exam/JoinDpp.js";
import JoinContest from "./pages/exam/JoinContest.js";
import { JoinPYQAndMock } from "./pages/exam/JoinPYQAndMock.js";

// performence
import { Overview as PerformanceOverview } from "./pages/Performance/Overview.js";
import { Contest as PerformanceContest } from "./pages/Performance/Contest.js";
import { PerformanceTest } from "./pages/Performance/Test.js";

// analyses
// import { Dashboard as AnalysesDashboard } from "./pages/Analyses/Dashboard.js";
// import { AnalysesOverview } from "./pages/Analyses/AnalysesOverview.js";
import { AnalysesTest } from "./pages/Analyses/AnalysesTest.js";
import { AnalysesPYQMock } from "./pages/Analyses/AnalysesPYQMock.js";
import { AnalysesContest } from "./pages/Analyses/AnalysesContest.js";
import { AnalysesQuiz } from "./pages/Analyses/AnalysesQuiz.js";
//components
import { Appbar } from "@repo/design-system/navbars/Appbar";
import { type SIDEBAR_ITEMS_types } from "@repo/design-system/navbars/Sidebar";
import { Component as Breadcrumb } from "@repo/design-system/navbars/Breadcrumb";
import { Header } from "@repo/design-system/navbars/Header";
//icons
import {
  BarChart2,
  HandCoins,
  Trophy,
  Pencil,
  ChartLine,
  ShieldCheck,
  ListChecks,
  AlarmClockCheck,
} from "lucide-react";

// import {store} from "./redux/store.jsx";
// import { PersistGate } from "redux-persist/integration/react";
// import { Bounce, ToastContainer } from "react-toastify";
import { store } from "@repo/store/store.js";
import { Provider } from "react-redux";
import PerformanceDashboard from "./pages/Performance/Dashboard.js";
import Payment from "./pages/payment/payment.js";
import PaymentSuccess from "./pages/payment/PaymentSuccess.js";
import Profile from "./pages/user/Profile.js";
import { Balance } from "./pages/user/Balance.js";
import { SecurityUserPage } from "./pages/user/SecurityUserPage.js";
import ValidationUserPage, {
  ValidationForgotpassword,
} from "./pages/user/ValidationUserPage.js";
import LegalPages from "./pages/legal/LegalPages.js";
import { NotePage } from "./pages/notes/NotePage.js";
import NoteSubjectList from "./pages/notes/NoteSubjectList.js";
import NoteTopicList from "./pages/notes/NoteTopicList.js";
import { ApiProvider } from "./ApiProvider.js";
import { ToastContainer } from "react-toastify";

let ANALYSIS_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    href: "/analysis/pyqmock",
    icon: Trophy,
    color: "#8B5CF6",
    name: "PYQ Mock",
  },
  {
    id: 2,
    href: "/analysis/test",
    color: "#F59E0B",
    icon: ChartLine,
    name: "Test",
  },
];

const EXAM_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    name: "Tests",
    icon: ListChecks,
    color: "#6366f1",
    href: "/test/join",
  },
  {
    id: 2,
    name: "DPP",
    icon: Pencil,
    color: "#6366f1",
    href: "/test/dpp",
  },
  {
    id: 3,
    name: "Mock",
    icon: Trophy,
    color: "#F59E0B",
    href: "/test/mock",
  },
];
const PERFORMANCE_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    name: "Overview",
    icon: BarChart2,
    color: "#6366f1",
    href: "/performance/overview",
  },

  // {
  //   id: 2,
  //   name: "Contest",
  //   icon: ChartSpline,
  //   color: "#EC4899",
  //   href: "/performance/contest",
  // },
  {
    id: 3,
    name: "Test",
    icon: ChartLine,
    color: "#F59E0B",
    href: "/performance/test",
  },
];

const USER_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    name: "Profile",
    icon: BarChart2,
    color: "#6366f1",
    href: "/user/profile",
  },
  {
    id: 2,
    name: "Balance",
    icon: HandCoins,
    color: "#10B981",
    href: "/user/balance",
  },

  {
    id: 3,
    name: "Validate",
    icon: ShieldCheck,
    color: "#EC4899",
    href: "/user/validation",
  },
];

let NotesOtions: SIDEBAR_ITEMS_types[] = [
  {
    id: 2,
    href: "/notes/notes",
    icon: AlarmClockCheck,
    name: "notes",
    color: "#6366f1",
  },
];

let baseUrl = import.meta.env.VITE_API_BASE_URL;


const App = () => {
  return (
    <>
      <ApiProvider baseUrl={baseUrl}>
        <div className=" min-h-screen  text-gray-100  overflow-hidden   ">
          <HashRouter>
            <Provider store={store}>
              {/* <ToastContainer  aria-label={"toast"}/> */}
              <Appbar />
              <Header
                LogoUrl={"/assets/logo/logo-png.png"}
                BrandName={"Jeca"}
              />
              
              <div className="main flex  flex-col  lg:pl-[4rem]  w-screen  ">
                <Breadcrumb />
                <Routes>
                  <Route path="/" element={<Home />} />{" "}
                  {/*  {<LandingPage />} */}
                  <Route path="/" element={<FullpageOutlet />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/term" element={<LegalPages />} />
                    <Route path="/privacy" element={<LegalPages />} />
                    <Route path="/refund" element={<LegalPages />} />
                    <Route path="/contact" element={<LegalPages />} />

                    <Route
                      path="/notes"
                      element={<SplitOutlet SIDEBAR_ITEMS={NotesOtions} />}
                    >
                      <Route path="notes" element={<NoteSubjectList />} />
                      <Route path=":category" element={<NoteTopicList />} />
                      <Route path=":category/:topic" element={<NotePage />} />
                    </Route>

                    <Route
                      path="/login/validate/email"
                      element={<ValidateEmailwhileLogin />}
                    />
                    <Route path="/signup" element={<Signup />} />
                  </Route>
                  <Route path="/" element={<ProtectedRoute />}>
                    <Route path="examportal" element={<Examportal />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="paymentsuccess" element={<PaymentSuccess />} />
                  </Route>
                  <Route
                    path="/user"
                    element={<SplitOutlet SIDEBAR_ITEMS={USER_SIDEBAR_ITEMS} />}
                  >
                    <Route path="balance" element={<Balance />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="validation" element={<ValidationUserPage />} />
                    <Route path="security" element={<SecurityUserPage />} />
                    <Route
                      path="forgotpassword"
                      element={<ValidationForgotpassword />}
                    />
                  </Route>
                  <Route
                    path="/analysis"
                    element={
                      <SplitOutlet SIDEBAR_ITEMS={ANALYSIS_SIDEBAR_ITEMS} />
                    }
                  >
                    <Route path="test" element={<AnalysesTest />} />
                    <Route path="pyqmock" element={<AnalysesPYQMock />} />
                    <Route path="contest" element={<AnalysesContest />} />
                    <Route path="quiz" element={<AnalysesQuiz />} />
                  </Route>
                  <Route
                    path="/performance"
                    element={
                      <SplitOutlet SIDEBAR_ITEMS={PERFORMANCE_SIDEBAR_ITEMS} />
                    }
                  >
                    <Route
                      path="dashboard"
                      element={<PerformanceDashboard />}
                    />
                    <Route path="test" element={<PerformanceTest />} />
                    <Route path="contest" element={<PerformanceContest />} />
                    <Route path="overview" element={<PerformanceOverview />} />
                  </Route>
                  <Route
                    path="/test"
                    element={<SplitOutlet SIDEBAR_ITEMS={EXAM_SIDEBAR_ITEMS} />}
                  >
                    <Route path="join" element={<JoinTests />} />
                    <Route path="dpp" element={<JoinDpp />} />
                    <Route path="contest" element={<JoinContest />} />
                    <Route path="mock" element={<JoinPYQAndMock />} />
                    <Route
                      path="submitsuccess"
                      element={<ExamSubmitSuccess />}
                    />
                  </Route>
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
