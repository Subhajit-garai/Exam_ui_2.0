# Quiz Service Documentation

## Class: `quizApi`

The `quizApi` class manages quizzes.

### Methods

#### `getAvailableQuizzes()`
Retrieves available quizzes.
- **Endpoint**: `/quiz/available`
- **Method**: GET

#### `createQuiz(data: { mode: string; subject: string; topic: string })`
Creates a new quiz for the user.
- **Endpoint**: `/quiz/user/create`
- **Method**: POST
- **Body**:
    - `mode` (string): Quiz mode.
    - `subject` (string): Subject.
    - `topic` (string): Topic.
