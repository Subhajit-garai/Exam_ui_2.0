import { createSlice } from "@reduxjs/toolkit";



export type SubjectType = {
  id: string;
  name: string;
  slug: string;
  order: string;
  category: string;
  isPublic: boolean;
};

export type topicType = {
  id: string;
  name: string;
  subjectId: string;
  isparentTopic: boolean;
  parentTopicId: string | null;
  shortName: string | null;
  order: number;
  description: string | null;
  slug: string;
  iconUrl: string | null;
  color: string | null;
  tags: string[];
  like: number;
  dislike: number;
  readCount: number;
  comments: number;
  isPublic: boolean;
  commentEnabled: boolean;
  verified: boolean;
  estimatedReadTime: number | null;
  version: number;
  attachments: string[];
  publishedAt: Date | null;
  language: string | null;
  // status: $Enums.TopicStatus;
  status: any;
  created_at: Date;
  updated_at: Date;
  createdBy: string | null;
  updatedBy: string | null;
};

type note_type = {
  activetab: string;
  Subjects: SubjectType[];
  Topics: topicType[];
  currentSubject: string;
  subjectNames: string[];
  topicNames: string[];
  currentSubjectid: string;
  currentTopicid: string;
};

const initialState: note_type = {
  activetab: "",
  Subjects: [],
  Topics: [],
  currentSubject: "",
  subjectNames: ["no subjects"],
  topicNames: ["no topics"],
  currentSubjectid: "",
  currentTopicid: "",
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
      let sub: SubjectType[] = actions.payload;
      state.Subjects = sub;

      let subjectnames =
        Array.isArray(sub) &&
        sub.map((s: any) => {
          if (s.name.toLowerCase() !== "unknown") {
            return s.name;
          }
        });
      state.subjectNames = subjectnames && subjectnames.length > 0 ? subjectnames : ["no subject"];
    },
    setTopics: (state, actions) => {
      let sub: topicType[] = actions.payload;
      state.Topics = sub;

      let topicnames =
        Array.isArray(sub) &&
        sub.map((s: any) => {
          if (s.name.toLowerCase() !== "unknown") {
            return s.name;
          }

        });

      state.topicNames = topicnames && topicnames.length > 0 ? topicnames : ["no topics"];

    },
    setCurrentTopicid: (state, actions) => {
      state.currentTopicid = actions.payload;
    },
    setCurrentSubject: (state, actions) => {
      state.currentSubject = actions.payload;
    },

  },
});

export let {
  setActiveNoteTab,
  setSubjects,
  setTopics,
  setCurrentSubject,
  setCurrentTopicid,
} = noteSlice.actions;
export default noteSlice.reducer;







