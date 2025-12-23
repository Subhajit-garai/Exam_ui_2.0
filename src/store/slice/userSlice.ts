import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SocialPlatform } from "@/lib/constants/question.constants.type";
import { progressApi } from "@/lib/api_call/api_actions/progress.action";

export type user_social_type = {
  platform: SocialPlatform;
  link: string;
  isVerified: boolean;
}

export type UserStats = {
  testsAttempted: { value: number; trend: any };
  avgScore: { value: string; trend: any };
  studyHours: { value: string; trend: any };
  accuracy: { value: string; trend: any };
};

type user_type = {
  name: string | null;
  email: string | null;
  balance: number | null;
  ticket: number | null;
  isprime: string | null;
  status: "none";
  islogin: boolean;
  isverify: boolean;
  contact: string;
  social: user_social_type[],
  target_exam?: string;
  academicProfile?: {
    category: string;
    exam: string;
    year: string;
  } | null;
  standard?: string | null;
  stream?: string | null;
  school?: string | null;
  stats: UserStats;
};

const initialStats: UserStats = {
  testsAttempted: { value: 0, trend: null },
  avgScore: { value: "0%", trend: null },
  studyHours: { value: "0h", trend: null },
  accuracy: { value: "0%", trend: null },
};

const initialState: user_type = {
  name: "",
  email: "",
  balance: 0,
  ticket: 0,
  isprime: "",
  status: "none",
  islogin: false,
  isverify: false,
  contact: "xxxxxxxx",
  social: [],
  academicProfile: null,
  standard: null,
  stream: null,
  school: null,
  stats: initialStats,
};

export const fetchUserStats = createAsyncThunk(
  "user/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const api = new progressApi();
      const res = await api.getUserStats();
      if (res && res.data && res.data.stats) {
        return res.data.stats;
      }
      return rejectWithValue("Invalid response format");
    } catch (error) {
      return rejectWithValue("Failed to fetch user stats");
    }
  }
);

let userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      console.log("user set...");
      let { name, balance, email, prime, social, target_exam, academicProfile, standard, stream, school } =
        actions.payload;
      state.name = name;
      state.email = email;
      state.balance = balance.amount;
      state.ticket = balance.ticket;
      state.isprime = prime.status;
      state.social = social;
      state.status = prime.status;
      state.target_exam = target_exam;
      state.academicProfile = academicProfile;
      state.standard = standard;
      state.stream = stream;
      state.school = school;
      if (name && email) {
        state.islogin = true;
      } else {
        state.islogin = false;
      }
    },
    updateLogin: (state, actions) => {
      state.islogin = actions.payload;
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.balance = null;
      state.ticket = null;
      state.isprime = null;
      state.islogin = false;
      state.stats = initialStats;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserStats.fulfilled, (state, action) => {
      const stats = action.payload;
      state.stats = {
        testsAttempted: { value: stats.testsAttempted.testsAttempted, trend: stats.testsAttempted.trend },
        avgScore: { value: stats.avgScore.avgScore, trend: stats.avgScore.trend },
        studyHours: { value: stats.studyHours.hours, trend: stats.studyHours.trend },
        accuracy: { value: stats.accuracy.accuracy, trend: stats.accuracy.trend }
      };
    });
  },
});

export let { setUser, updateLogin, logout } = userSlice.actions;
export default userSlice.reducer;
