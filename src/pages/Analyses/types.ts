export type exam_type = {
  id: string;
  category: string;
  name: string | null;
  date: Date;
  display_id: string | null;
  examname: string;
  examtype: string;
  Visibility: string;
  creationstatus: string;
  starttime: string | null;
  jointime: string | null;
  duration: string;
  ContestRegister: {
    count: number;
  };
  exam_pattern: {
    id: string;
    difficulty: string;
    total_questions: number[];
    syllabus: string;
    format: string;
  };
};

export type UserAnsFormat_type = {
  shuffleMap: number[];
  selectedOption: string[];
  part:string,
  number:number,
  Question: {
    id: string;
    title: string;
    options: string[];
    extra: object;
    ans: string[];
    format: string;
    is_multiple_ans: boolean;
    explanation: string | null;
    Subject: {
      name: string;
      shortName: string | null;
    };
    Topic: {
      name: string;
      shortName: string | null;
    };
  };
};