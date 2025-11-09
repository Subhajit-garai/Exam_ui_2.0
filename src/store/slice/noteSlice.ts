import { createSlice } from "@reduxjs/toolkit";

// type note_type = {
//   activetab: string;
//   Subjects: any[];
//   Topics: any[];
//   correntSubject: string;
//   subjectNames: any[];
//   content: string;
//   correntTopic: string;
//   correntTopicVersion: string;
// };

const initialState = {
  activetab: "",
  Subjects: [],
  Topics: [],
  correntSubject: "",
  subjectNames: [],
  content: "",
  correntTopic: "",
  correntTopicVersion: "",
};

let noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setActiveNoteTab: (state, actions) => {
      console.log(actions.payload);
      state.activetab = actions.payload;
    },
    setSubjects: (state, actions) => {
      let sub = actions.payload.data;
      state.Subjects = sub;

      let subjectnames = sub.map((s: any) => {
        return s.name;
      });
      state.subjectNames = subjectnames;
    },
    setTopics: (state, actions) => {
      state.Topics = actions.payload.data;
    },
    setcorrentTopic: (state, actions) => {
      state.correntTopic = actions.payload;
    },
    setContentData: (state, actions) => {
      state.content = actions.payload.data.content;
    },
  },
});

export let {
  setActiveNoteTab,
  setSubjects,
  setTopics,
  setContentData,
  setcorrentTopic,
} = noteSlice.actions;
export default noteSlice.reducer;
