# Activity Service Documentation

## Class: `activityApi`

The `activityApi` class provides methods to interact with user activity logs, stats, and challenges.

### Methods

#### `getActivities(page: number, limit: number)`
Retrieves a paginated list of user activities.

- **Endpoint**: `/user/activity`
- **Method**: GET
- **Parameters**:
    - `page` (query, number): Page number (default: 1).
    - `limit` (query, number): Number of items per page (default: 10).

#### `getActivityStats()`
Retrieves statistics about the user's activity.

- **Endpoint**: `/user/activity/stats`
- **Method**: GET

#### `logActivity(data: { type: string; title: string; description?: string; status?: string; metadata?: any })`
Logs a new user activity.

- **Endpoint**: `/user/activity/log`
- **Method**: POST
- **Body**:
    - `type` (string): Type of activity.
    - `title` (string): Title of the activity.
    - `description` (string, optional): Description of the activity.
    - `status` (string, optional): Status of the activity.
    - `metadata` (any, optional): Additional metadata.

#### `getRewards()`
Retrieves user rewards.

- **Endpoint**: `/user/rewards`
- **Method**: GET

#### `getDailyChallenge()`
Retrieves the daily challenge for the user.

- **Endpoint**: `/user/activity/challenge/daily`
- **Method**: GET

#### `getDailyCompletedChallenge()`
Retrieves completed daily challenges.

- **Endpoint**: `/user/activity/challenge/daily/completed`
- **Method**: GET

#### `getPastChallenges()`
Retrieves history of past challenges.

- **Endpoint**: `/user/activity/challenge/history`
- **Method**: GET
