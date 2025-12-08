# Metrix Service Documentation

## Class: `metrixApi`

The `metrixApi` class provides methods for retrieving performance metrics and analytics.

### Methods

#### `getsubjectwiseMetrixData(offset, startDate, endDate)`
Retrieves subject-wise score metrics.
- **Endpoint**: `/metrix/getsubjectwisescore`
- **Method**: GET
- **Parameters**:
    - `offset` (query, string): Time offset (default: "day").
    - `startDate` (query, string): Start date (default: "7").
    - `endDate` (query, string): End date (default: "7").

#### `getScoreMetrixData(offset, startDate, endDate)`
Retrieves overall score metrics.
- **Endpoint**: `/metrix/getscore`
- **Method**: GET
- **Parameters**:
    - `offset` (query, string): Time offset (default: "day").
    - `startDate` (query, string): Start date (default: "7").
    - `endDate` (query, string): End date (default: "7").

#### `getperformanceMetrix()`
Retrieves general performance metrics.
- **Endpoint**: `/metrix/performance`
- **Method**: GET

#### `getleaderboardMetrix(examid, offset)`
Retrieves leaderboard metrics for an exam.
- **Endpoint**: `/metrix/leaderbord`
- **Method**: GET
- **Parameters**:
    - `examid` (query, string): Exam ID.
    - `offset` (query, string): Time offset/range.

#### `getFullleaderboardMetrix(examid)`
Retrieves the full leaderboard for an exam.
- **Endpoint**: `/metrix/fullleaderbord`
- **Method**: GET
- **Parameters**:
    - `examid` (query, string): Exam ID.

#### `getExamWeeknessMetrix(examid)`
Retrieves weakness metrics for an exam.
- **Endpoint**: `/metrix/examweeknessmetrix`
- **Method**: GET
- **Parameters**:
    - `examid` (query, string): Exam ID.
