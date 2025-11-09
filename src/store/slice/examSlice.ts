import { createSlice } from "@reduxjs/toolkit";

export type answer_format_type = {
  isview: number;
  isans: number;
  ans: string[];
};
export type parts_type = "part1" | "part2"
export type answerset_parts_type = {
  [key: string]: answer_format_type[];
};
export type exam_type = {
  lastexam: string;
  Availableexams: [];
  Exams: [];
  Dpps: [];
  Mocks: [];
  FilterExams: [];
  examPatters: [];
  syllabus: [];
  examCategorys: [];
  Availableexampatterns: [];
  Availableexampatternsinfo: any[];
  total_questions: [];
  ansset: {
    examid: string;
    parts: answerset_parts_type;
  };
  CurrentPart: parts_type;
};

const initialState: exam_type = {
  lastexam: "",
  Availableexams: [],
  Exams: [],
  Dpps: [],
  Mocks: [],
  FilterExams: [],
  examPatters: [],
  syllabus: [],
  examCategorys: [],
  Availableexampatterns: [],
  Availableexampatternsinfo: [],
  total_questions: [],
  ansset: {
    examid: "",
    parts: {},
  },
  CurrentPart: "part1",
};

let examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setlastExam: (state, actions) => {
      state.lastexam = actions.payload;
    },
    setansset: (state, actions) => {
      state.ansset.parts = actions.payload;
    },
    setanssetInit: (state) => {
      state.ansset = {
        examid: "",
        parts: {},
      };
    },

    setanssetExamId: (state, actions) => {
      state.ansset.examid = actions.payload;
    },

    updateisView: (state, actions) => {
      let { part, number, isviewflag } = actions.payload;
      if (
        typeof part !== "string" ||
        typeof number !== "number" ||
        typeof isviewflag !== "number"
      )
        return;
      if (
        state.ansset &&
        Object.hasOwn(state.ansset, "parts") &&
        Object.hasOwn(state.ansset.parts, part)
      ) {
        const part_data = state.ansset.parts[part];
        if (part_data) {
          if (part_data[number]) {
            part_data[number].isview = isviewflag;
          }
        }
      }
    }, // update view of box colors
    updateisAns: (state, actions) => {
      let { part, number, data } = actions.payload;
      if (
        typeof part !== "string" ||
        typeof number !== "number" ||
        typeof data !== "number"
      )
        return;
      if (
        state.ansset &&
        Object.hasOwn(state.ansset, "parts") &&
        Object.hasOwn(state.ansset.parts, part)
      ) {
        const part_data = state.ansset.parts[part];
        if (part_data) {
          if (part_data[number]) {
            part_data[number].isans = data;
          }
        }
      }
    }, // update view of box colors
    updateAns: (state, actions) => {
      let { part, number, data } = actions.payload;
      if (
        typeof part !== "string" ||
        typeof number !== "number" ||
        typeof data !== typeof Array
      )
        return;
      if (
        state.ansset &&
        Object.hasOwn(state.ansset, "parts") &&
        Object.hasOwn(state.ansset.parts, part)
      ) {
        const part_data = state.ansset.parts[part];
        if (part_data) {
          if (part_data[number]) {
            part_data[number].ans = data;
          }
        }
      }
    }, // update view of box colors

    setCurrentPart: (state, actions) => {
      console.log("CurrentPart", actions.payload);

      state.CurrentPart = actions.payload;
    },
    setAvailableexams: (state, actions) => {
      state.Availableexams = actions.payload.for;
    },
    setExams: (state, actions) => {
      state.Exams = actions.payload.data.exams;
      state.total_questions =
        actions.payload.data.exams[0].exam_pattern.total_questions;
    },
    setTotal_Questions: (state, actions) => {
      state.total_questions = actions.payload;
    },
    setDpps: (state, actions) => {
      state.Dpps = actions.payload.data.exams;
    },
    setMocks: (state, actions) => {
      state.Mocks = actions.payload.data.exams;
    },
    setFilterExams: (state, actions) => {
      state.FilterExams = actions.payload.data;
    },

    setExamPatterns: (state, actions) => {
      state.Availableexampatterns = actions.payload.patterns.map(
        (t: any) => t.title
      );
      state.Availableexampatternsinfo = [...actions.payload.patterns];
    },
    setSyllabus: (state, actions) => {
      state.syllabus = actions.payload.syllabus;
    },
    setCategorys: (state, actions) => {
      state.examCategorys = actions.payload.Category;
    },
  },
});

export let {
  setFilterExams,
  setExams,
  setTotal_Questions,
  setExamPatterns,
  setSyllabus,
  setCategorys,
  setAvailableexams,
  setansset,
  setanssetExamId,
  updateAns,
  updateisAns,
  updateisView,
  setCurrentPart,
  setanssetInit,
  setlastExam,
  setDpps,
  setMocks,
} = examSlice.actions;
export default examSlice.reducer;
