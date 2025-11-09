import { createSlice } from "@reduxjs/toolkit";

type user_type = {
  name: string | null;
  email: string | null;
  telegramid: string;
  blance: number | null;
  ticket: number | null;
  isprime: string | null;
  status: "none";
  islogin: boolean;
  isverify: boolean;
  contact: string;
  verification: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
};

const initialState: user_type = {
  name: "",
  email: "",
  telegramid: "",
  blance: 0,
  ticket: 0,
  isprime: "",
  status: "none",
  islogin: false,
  isverify: false,
  contact: "xxxxxxxx",
  verification: {
    email: false,
    telegram: false,
    whatsapp: false,
  },
};

let userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      console.log("user set...");
      let { name, blance, email, prime, verification, telegram } =
        actions.payload;

      state.name = name;
      state.email = email;
      state.blance = blance.amount;
      state.ticket = blance.ticket;
      state.isprime = prime.status;
      state.verification = verification;
      state.telegramid = telegram.telegramid;
      state.status = prime.status;
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
      ((state.name = null), (state.email = null));
      state.blance = null;
      state.ticket = null;
      state.isprime = null;
      state.islogin = false;
    },
  },
});

export let { setUser, updateLogin, logout } = userSlice.actions;
export default userSlice.reducer;
