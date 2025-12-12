export type Topic =
    | "OS"
    | "DBMS"
    | "CPP"
    | "C"
    | "SE"
    | "ML"
    | "Network"
    | "OOP"
    | "Unix"
    | "DSA";

export type BooleanOp = "True" | "False";

export type Category = "CS" | "BMLT";

export type ExamScope = "NATIONAL" | "STATE" | "COLLEGE" | "OTHER";

export type SocialPlatform = "email" | "telegram" | "whatsApp" | "linkedIn" | "gitHub" | "twitter" | "instagram" | "facebook" | "website"



export type ChatType = "group" | "private" | "channel" | "supergroup";

export type PurchaseType = "SUBSCRIPTION" | "TOKEN";

export type Platform = "NONE" | "WEB" | "TELEGRAM" | "WHATSAPP";

export type Visibility = "Private" | "Public";

export type Format = "Text" | "Code" | "Img";

export type Exam = "JECA" | "GATE" | "CAT";

export type Difficulty = "Medium" | "Easy" | "Hard";

export type IsMultiple = "false" | "true";

export type ExamType = "Test" | "Contest" | "Mock" | "PYQ";

export type PrimeStatus = "None" | "Bronze" | "Silver" | "Gold";

export type ExamStatus =
    | "REGISTRATION_OPEN"
    | "REGISTRATION_CLOSED"
    | "SCHEDULED"
    | "ONGOING"
    | "COMPLETED"
    | "EVALUATION_IN_PROGRESS"
    | "RESULT_PUBLISHED"
    | "ARCHIVED";

export type EventType =
    | "CREATE_EXAM"
    | "SEND_MESSAGE"
    | "RUN_NEW_QUIZ"
    | "CREATE_QUIZ_CONTEST"
    | "CREATE_DPP"
    | "CLEAR_BOT_CACHE";

export type UserRole = "Admin" | "User" | "Tutor" | "Bot";

export type EventRun = "ONE" | "DAILY" | "WEEKLY" | "MONTHLY";

export type Status =
    | "Processing"
    | "Done"
    | "Created"
    | "Duplicate"
    | "Suspended"
    | "Close";
