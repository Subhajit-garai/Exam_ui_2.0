import { createSlice } from "@reduxjs/toolkit";

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
  social: {
    telegram?: string;
    whatsapp?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    website?: string;
    isContactVerified: boolean;
    isEmailVerified: boolean;
    isTelegramVerified: boolean;
    isWhatsappVerified: boolean;
  };
  target_exam?: string;
  academicProfile?: {
    category: string;
    exam: string;
    year: string;
  } | null;
  standard?: string | null;
  stream?: string | null;
  school?: string | null;
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
  social: {
    telegram: "0000000000",
    whatsapp: "",
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    facebook: "",
    website: "",
    isContactVerified: false,
    isEmailVerified: false,
    isTelegramVerified: false,
    isWhatsappVerified: false,
  },
  academicProfile: null,
  standard: null,
  stream: null,
  school: null,
};

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
    },
  },
});

export let { setUser, updateLogin, logout } = userSlice.actions;
export default userSlice.reducer;
