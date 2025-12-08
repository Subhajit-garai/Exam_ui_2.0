# Exam Service Documentation

## Class: `examApi`

The `examApi` class provides extensive methods for managing exams, attempts, and metadata.

### Methods

#### `UserMetaDataForAnExam({ examid })`
Retrieves user metadata for a specific exam.
- **Endpoint**: `/exam/usermetadataforanexam`
- **Method**: GET
- **Parameters**:
    - `examid` (query, string): Exam ID.

#### `ExamAttemptQuestionMetaData({ examid })`
Retrieves question metadata for an exam attempt.
- **Endpoint**: `/exam/examattemptquestiondata`
- **Method**: GET
- **Parameters**:
    - `examid` (query, string): Exam ID.

#### `fetchCategorys(dispatch)`
Fetches exam categories and updates the store.
- **Endpoint**: `/exam/categorys`
- **Method**: GET (Dispatched)

#### `fetchAvalibleExam(dispatch, category)`
Fetches available targeted exams for a category.
- **Endpoint**: `/exam/avalible/targeted/exam`
- **Method**: GET (Dispatched)
- **Parameters**:
    - `category` (query, string): Exam category.

#### `fetchSyllabus(dispatch, examname)`
Fetches syllabus for an exam.
- **Endpoint**: `/exam/syllabus`
- **Method**: GET (Dispatched)
- **Parameters**:
    - `syllabus` (query, string): Exam name/syllabus identifier.

#### `fetchExamYear(dispatch, examname)`
Fetches available years for an exam.
- **Endpoint**: `/exam/year/get`
- **Method**: GET (Dispatched)
- **Parameters**:
    - `examname` (query, string): Exam name.

#### `fetchExamYearById(id)`
Fetches exam year details by ID.
- **Endpoint**: `/exam/year/get`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Year ID.

#### `fetchTargetExamById(id)`
Fetches target exam details by ID.
- **Endpoint**: `/get/target/exam/id`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Exam ID.

#### `getTokensystem(type)`
Retrieves token system configuration.
- **Endpoint**: `/exam/tokensystem`
- **Method**: GET
- **Parameters**:
    - `type` (query, string, default="Test"): Token type.

#### `fetchExams(dispatch, type, page, limit, order)`
Fetches exams based on type and updates the store (Exams, Dpps, Mocks).
- **Endpoint**: `/exam/getExams`
- **Method**: GET (Dispatched)
- **Parameters**:
    - `type` (query, string): Exam type (Exam, Dpp, Mock).
    - `page` (query, number): Page number.
    - `limit` (query, number): Items per page.
    - `order` (query, string): Sort order ('asc'/'desc').

#### `fetchExams_by_type(type, page, limit, order)`
Fetches exams directly without dispatching.
- **Endpoint**: `/exam/getExams`
- **Method**: GET
- **Parameters**:
    - Same as `fetchExams`.

#### `fetchExamsByid(id)`
Fetches a specific exam by ID.
- **Endpoint**: `/exam/getexambyid`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Exam ID.

#### `getExamFilterByTime(starttime, endtime, type)`
Fetches exams filtered by time range.
- **Endpoint**: `/exam/getExams`
- **Method**: GET
- **Parameters**:
    - `starttime` (query, string): Start timestamp.
    - `endtime` (query, string): End timestamp.
    - `type` (query, string, default="Exam"): Exam type.

#### `joinExams(id)`
Joins an exam.
- **Endpoint**: `/exam/join`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Exam ID.

#### `requestTojoinExam(id)`
Requests to join an exam.
- **Endpoint**: `/exam/joinrequest`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Exam ID.

#### `examQestionfetch({ examid, type, number, part })`
Fetches exam question data.
- **Endpoint**: `/exam/data`
- **Method**: GET
- **Parameters**:
    - `examid` (query, string): Exam ID.
    - `type` (query, string): Question type.
    - `number` (query, number): Question number.
    - `part` (query, string): Exam part.

#### `saveExamAns({ examid, number, part, ans, ismultiple })`
Submits an answer for an exam question.
- **Endpoint**: `/exam/submitans`
- **Method**: GET
- **Parameters**:
    - `examid` (query, string): Exam ID.
    - `number` (query, number): Question number.
    - `part` (query, string): Exam part.
    - `ans` (query, string[]): Answer(s).
    - `ismultiple` (query, string|boolean): Is multiple choice.

#### `finalSubmitExam({ examid })`
Finalizes and submits the exam.
- **Endpoint**: `/exam/finalsubmit`
- **Method**: GET
- **Parameters**:
    - `examid` (query, string): Exam ID.

#### `getUserAnsSet({ examid })`
Retrieves the user's answer set for an exam.
- **Endpoint**: `/exam/getuseransset`
- **Method**: GET
- **Parameters**:
    - `examid` (query, string): Exam ID.
