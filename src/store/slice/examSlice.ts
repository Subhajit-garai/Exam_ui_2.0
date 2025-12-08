import { createSlice } from "@reduxjs/toolkit";

export type answer_format_type = {
  isview: number;
  isans: number;
  ans: string[];
};
export type parts_type = "part1" | "part2";
export type answerset_parts_type = {
  [key: string]: answer_format_type[];
};

export type Availableexams_type = {
  name: string;
  shortCode: string;
  id: string;
}[];

export type target_exam_type = {
  category: string;
  id: string;
  name: string;
  shortCode: string | null;
  description: string | null;
  examScope: "NATIONAL" | "STATE" | "COLLEGE" | "OTHER";
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  shortName: string | null;
  description: string | null;
  iconUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type ExamStatus =
  | "REGISTRATION_OPEN"
  | "REGISTRATION_CLOSED"
  | "SCHEDULED"
  | "ONGOING"
  | "COMPLETED"
  | "EVALUATION_IN_PROGRESS"
  | "RESULT_PUBLISHED"
  | "ARCHIVED";

export type exam_year_type = {
  id: string;
  targetExamId: string;
  year: number;
  slug: string;
  status: ExamStatus;
  isPublic: boolean;
  registrationOpenDate: Date | null;
  registrationCloseDate: Date | null;
  examDate: Date | null;
  resultDate: Date | null;
  notes: any;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};
export type exam_type = {
  lastexam: string;
  Availableexams: Availableexams_type;
  AvailableexamsShortCode: string[];
  Exams: [];
  Dpps: [];
  Mocks: [];
  FilterExams: [];
  examPatters: [];
  syllabus: [];
  ExamYear: exam_year_type[];
  ExamYear_year: string[];
  examCategorys: Category[];
  Availableexampatterns: string[];
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
  AvailableexamsShortCode: [],
  Exams: [],
  Dpps: [],
  Mocks: [],
  ExamYear: [],
  ExamYear_year: [],
  FilterExams: [],
  examPatters: [],
  syllabus: [], // move to syllabusSlic
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
      state.Availableexams = actions.payload;

      state.AvailableexamsShortCode = [];
      state.Availableexams.map((exam) =>
        state.AvailableexamsShortCode.push(exam.shortCode)
      );
    },
    setExams: (state, actions) => {
      state.Exams = actions.payload.exams;
      state.total_questions =
        actions.payload.exams[0].exam_pattern.total_questions;
    },
    setTotal_Questions: (state, actions) => {
      state.total_questions = actions.payload;
    },
    setDpps: (state, actions) => {
      state.Dpps = actions.payload.exams;
    },
    setMocks: (state, actions) => {
      state.Mocks = actions.payload.exams;
    },
    setFilterExams: (state, actions) => {
      state.FilterExams = actions.payload;
    },

    setExamPatterns: (state, actions) => {
      if (!actions.payload) return;
      state.Availableexampatterns = actions.payload.map((t: any) => t.title);
      state.Availableexampatternsinfo = [...actions.payload];
    },
    setSyllabus: (state, actions) => {
      state.syllabus = actions.payload;
    },
    setExamYear: (state, actions) => {
      state.ExamYear = [];
      let examYear_data: exam_year_type[] = actions.payload;
      state.ExamYear = examYear_data;

      if (examYear_data.length > 0) {
        state.ExamYear_year = examYear_data.map((year) => String(year.year));
      } else {
        state.ExamYear_year = ["no year"];
      }
    },

    //checked 2.0

    setCategorys: (state, actions) => {
      const categorys: Category[] = actions.payload;
      state.examCategorys = categorys;
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
  setExamYear,
  setMocks,
} = examSlice.actions;
export default examSlice.reducer;
