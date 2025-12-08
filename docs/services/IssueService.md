# Issue Service Documentation

## Class: `issueApi`

The `issueApi` class handles issue tracking, creation, updates, and voting.

### Methods

#### `CreateIssue(data)`
Creates a new issue.
- **Endpoint**: `/issue/create`
- **Method**: POST
- **Body**: `data` object containing issue details (type, note, sub_type, IssueDetails).

#### `getQuestionIssueResuestCount(id)`
Gets the count of issue requests for a specific question.
- **Endpoint**: `/issue/getquestionIssuecount`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Question ID.

#### `updateIssue(id, data)`
Updates an existing issue.
- **Endpoint**: `/issue/update`
- **Method**: PUT
- **Parameters**:
    - `id` (query, string): Issue ID.
- **Body**: `data` object with updated fields.

#### `getbyidIssue(id)`
Retrieves an issue by ID.
- **Endpoint**: `/issue/getbyid`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Issue ID.

#### `FetchAllIssue()`
Retrieves all issues.
- **Endpoint**: `/issue/all`
- **Method**: GET

#### `IsProcessedIssue(id)`
Checks if an issue has been processed.
- **Endpoint**: `/issue/isprocessed`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Issue ID.

#### `DeleteIssue(id)`
Deletes an issue.
- **Endpoint**: `/issue/delete`
- **Method**: GET (Note: Service uses GET for delete)
- **Parameters**:
    - `id` (query, string): Issue ID.

#### `priorityVoteIssue(id)`
Votes for issue priority.
- **Endpoint**: `/issue/priorityVote`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Issue ID.

#### `CloseIssue(id)`
Closes an issue.
- **Endpoint**: `/issue/close`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Issue ID.

#### `upVoteIssue(id)`
Upvotes an issue.
- **Endpoint**: `/issue/upvote`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Issue ID.

#### `downVoteIssue(id)`
Downvotes an issue.
- **Endpoint**: `/issue/downvote`
- **Method**: GET
- **Parameters**:
    - `id` (query, string): Issue ID.

#### `UpdateIssue(data)`
Updates the status of an issue.
- **Endpoint**: `/issue/updatestatus`
- **Method**: POST
- **Body**:
    - `id` (string): Issue ID.
    - `status` (string): New status.
