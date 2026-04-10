import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// outlates
import {
  FullpageOutlet,
  SplitOutlet,
  ProtectedRoute,
  QuizLayout,
} from "@repo/design-system/outlets/index";

// pages
import Home from "./pages/Home/Home.js";
// defultpages
// import LandingPage from "./pages/DefaultPages/LandingPage.js";
import ErrorPage from "./pages/DefaultPages/ErrorPage.js";
//authpages
import Login from "./pages/authpages/Login.js";
import ForgotPassword from "./pages/authpages/ForgotPassword.js";
import Signup from "./pages/authpages/Signup.js";
import ValidateEmailwhileLogin from "./pages/authpages/ValidateEmailwhileLogin.js";

//exam
import Examportal from "./pages/exam/Examportal/Examportal.js";
// import Exam from "./pages/exam/Exam.js";
import ExamSubmitSuccess from "./pages/exam/ExamSubmitSuccess.js";
import JoinTests from "./pages/exam/JoinTests.js";
import JoinDpp from "./pages/exam/JoinDpp.js";

// performence

// analyses
// import { Dashboard as AnalysesDashboard } from "./pages/Analyses/Dashboard.js";
// import { AnalysesOverview } from "./pages/Analyses/AnalysesOverview.js";
import { Overview } from "./pages/Analyses/Overview.js";

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
  FileQuestion,
  Swords,
  BrainCircuit,
} from "lucide-react";
import { store } from "@repo/store/store.js";
import { Provider } from "react-redux";
import Payment from "./pages/payment/payment.js";
import Checkout from "./pages/payment/Checkout.js";
import PaymentSuccess from "./pages/payment/PaymentSuccess.js";
import Profile from "./pages/user/profile/Profile.js";
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
import { JoinMock } from "./pages/exam/joinMock.js";
import { JoinPYQ } from "./pages/exam/JoinPYQ.js";
import { IssueDashboard } from "./pages/issue/IssueDashboard.js";
import ActivityPage from "./pages/Activity/ActivityPage.js";
import ChallengePage from "./pages/Activity/ChallengePage.js";
import ContestPage from "./pages/Activity/ContestPage.js";
import QuizPage from "./pages/Activity/QuizPage.js";
import LeaderboardPage from "./pages/Activity/LeaderboardPage.js";
import QuizStartPage from "./pages/quiz/QuizStartPage.js";
import { ActivityHistory } from "./pages/user/profile/ActivityHistory.js";

let ANALYSIS_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    href: "/analysis/pyqmock",
    Icon: Trophy,
    color: "var(--color-purple)",
    name: "PYQ Mock",
  },
  {
    id: 2,
    href: "/analysis/test",
    color: "var(--color-yellow)",
    Icon: ChartLine,
    name: "Test",
  },
  {
    id: 3,
    name: "Overview",
    Icon: BarChart2,
    color: "var(--color-indigo)",
    href: "/analysis/overview",
  },
];

const EXAM_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    name: "Tests",
    Icon: ListChecks,
    color: "var(--color-indigo)", // Indigo
    href: "/test/join",
  },
  {
    id: 2,
    name: "DPP",
    Icon: Pencil,
    color: "var(--color-pink)", // Pink
    href: "/test/dpp",
  },
  {
    id: 3,
    name: "Mock",
    Icon: AlarmClockCheck,
    color: "var(--color-green)", // Emerald
    href: "/test/mock",
  },
  {
    id: 4,
    name: "PYQ",
    Icon: FileQuestion,
    color: "var(--color-yellow)", // Amber
    href: "/test/PYQ",
  },
];

const USER_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    name: "Profile",
    Icon: BarChart2,
    color: "var(--color-indigo)",
    href: "/user/profile",
  },
  {
    id: 2,
    name: "Balance",
    Icon: HandCoins,
    color: "var(--color-green)",
    href: "/user/balance",
  },

  {
    id: 3,
    name: "Activity History",
    Icon: ChartLine,
    color: "var(--color-yellow)",
    href: "/user/activityhistory",
  },
  {
    id: 4,
    name: "Validate",
    Icon: ShieldCheck,
    color: "var(--color-pink)",
    href: "/user/validation",
  },
];

let NotesOtions: SIDEBAR_ITEMS_types[] = [
  {
    id: 2,
    href: "/notes/notes",
    Icon: AlarmClockCheck,
    name: "notes",
    color: "var(--color-indigo)",
  },
];
let ActivityOptions: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    href: "/activity/dashboard",
    Icon: BarChart2,
    name: "Dashboard",
    color: "var(--color-indigo)",
  },
  {
    id: 2,
    href: "/activity/challenge",
    Icon: Swords,
    name: "Challenge",
    color: "var(--color-red)",
  },
  {
    id: 3,
    href: "/activity/contest",
    Icon: Trophy,
    name: "Contest",
    color: "var(--color-yellow)",
  },
  {
    id: 4,
    href: "/activity/quiz",
    Icon: BrainCircuit,
    name: "Quiz",
    color: "var(--color-purple)",
  },
];

const ISSUE_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
  {
    id: 1,
    name: "Dashboard",
    Icon: BarChart2,
    color: "var(--color-red)", // Red color for issues
    href: "/issue/dashboard",
  },
];
// const QUIZ_SIDEBAR_ITEMS: SIDEBAR_ITEMS_types[] = [
//   {
//     id: 1,
//     name: "Quiz",
//     Icon: BarChart2,
//     color: "var(--color-red)", // Red color for issues
//     href: "/quiz/start",
//   },
// ];

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
                  <Route path="/" element={<Home />} />{" "}
                  {/*  {<LandingPage />} */}
                  <Route path="/" element={<FullpageOutlet />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/forgotpassword/verify" element={<ValidationForgotpassword />} />
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
                    <Route path="payment" element={<Payment />} />
                    <Route path="payment/checkout" element={<Checkout />} />
                    <Route path="paymentsuccess" element={<PaymentSuccess />} />
                  </Route>
                  <Route
                    path="/notes"
                    element={<SplitOutlet SIDEBAR_ITEMS={NotesOtions} />}
                  >
                    <Route index element={<Navigate to="notes" replace />} />
                    <Route path="notes" element={<NoteSubjectList />} />
                    <Route path=":category" element={<NoteTopicList />} />
                    <Route path=":category/:topic" element={<NotePage />} />
                  </Route>
                  <Route
                    path="/user"
                    element={<SplitOutlet SIDEBAR_ITEMS={USER_SIDEBAR_ITEMS} />}
                  >
                    <Route index element={<Navigate to="balance" replace />} />
                    <Route path="balance" element={<Balance />} />
                    <Route path="profile" element={<Profile />} />
                    <Route
                      path="activityhistory"
                      element={<ActivityHistory />}
                    />
                    <Route path="validation" element={<ValidationUserPage />} />
                    <Route path="security" element={<SecurityUserPage />} />

                  </Route>
                  <Route
                    path="/activity"
                    element={<SplitOutlet SIDEBAR_ITEMS={ActivityOptions} />}
                  >
                    <Route
                      index
                      element={<Navigate to="dashboard" replace />}
                    />
                    <Route path="dashboard" element={<ActivityPage />} />
                    <Route path="challenge" element={<ChallengePage />} />
                    <Route path="contest" element={<ContestPage />} />

                    <Route path="quiz" element={<QuizLayout />}>
                      <Route index element={<QuizPage />} />
                      <Route path="start" element={<QuizStartPage />} />
                    </Route>
                    <Route path="leaderboard" element={<LeaderboardPage />} />
                  </Route>
                  <Route
                    path="/analysis"
                    element={
                      <SplitOutlet SIDEBAR_ITEMS={ANALYSIS_SIDEBAR_ITEMS} />
                    }
                  >
                    <Route index element={<Navigate to="test" replace />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="test" element={<AnalysesTest />} />
                    <Route path="pyqmock" element={<AnalysesPYQMock />} />
                    <Route path="contest" element={<AnalysesContest />} />
                    <Route path="quiz" element={<AnalysesQuiz />} />
                  </Route>
                  <Route
                    path="/test"
                    element={<SplitOutlet SIDEBAR_ITEMS={EXAM_SIDEBAR_ITEMS} />}
                  >
                    <Route index element={<Navigate to="dpp" replace />} />
                    <Route path="join" element={<JoinTests />} />
                    <Route path="dpp" element={<JoinDpp />} />
                    {/* <Route path="contest" element={<JoinContest />} /> */}
                    <Route path="mock" element={<JoinMock />} />
                    <Route path="PYQ" element={<JoinPYQ />} />
                    <Route
                      path="submitsuccess"
                      element={<ExamSubmitSuccess />}
                    />
                  </Route>
                  <Route
                    path="/issue"
                    element={
                      <SplitOutlet SIDEBAR_ITEMS={ISSUE_SIDEBAR_ITEMS} />
                    }
                  >
                    <Route
                      index
                      element={<Navigate to="dashboard" replace />}
                    />
                    <Route path="dashboard" element={<IssueDashboard />} />
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
