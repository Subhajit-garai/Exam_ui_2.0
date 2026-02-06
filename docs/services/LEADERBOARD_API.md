# Leaderboard API Documentation

This document describes the API endpoints for accessing user leaderboards (Quiz, XP, and Streak) in the application.

**Base URL**: `/api/v1/user/activity/leaderboard`

**Authentication**: Required. Pass the JWT token in the header.
`Authorization: Bearer <token>`

---

## 1. Get Quiz Leaderboard

Retrieves the leaderboard based on quiz performance scores.

- **Endpoint**: `/quiz`
- **Method**: `GET`
- **Full URL**: `/api/v1/user/activity/leaderboard/quiz`

### Query Parameters

| Parameter | Type     | Default    | Description                                      |
|Data Type  | string   | `weekly`   | Scope of the leaderboard: `weekly` or `global`.  |
| limit     | number   | `10`       | Number of top users to retrieve.                 |

### Response Example

```json
{
  "success": true,
  "data": [
    {
      "user": {
        "id": "user-uuid-1",
        "name": "Alice"
      },
      "score": 1500,
      "rank": 1
    },
    {
      "user": {
        "id": "user-uuid-2",
        "name": "Bob"
      },
      "score": 1450,
      "rank": 2
    }
  ]
}
```

---

## 2. Get XP Leaderboard

Retrieves the leaderboard based on total XP earned by users.

- **Endpoint**: `/xp`
- **Method**: `GET`
- **Full URL**: `/api/v1/user/activity/leaderboard/xp`

### Query Parameters

| Parameter | Type     | Default    | Description                                      |
|Data Type  | string   | `weekly`   | Scope of the leaderboard: `weekly` or `global`.  |
| limit     | number   | `10`       | Number of top users to retrieve.                 |

### Response Example

```json
{
  "success": true,
  "data": [
    {
      "user": {
        "id": "user-uuid-3",
        "name": "Charlie"
      },
      "score": 5000,
      "rank": 1
    }
  ]
}
```

---

## 3. Get Streak Leaderboard

Retrieves the leaderboard based on current user activity streaks.

- **Endpoint**: `/streak`
- **Method**: `GET`
- **Full URL**: `/api/v1/user/activity/leaderboard/streak`

### Query Parameters

| Parameter | Type     | Default | Description                                |
|Data Type  | number   | `10`    | Number of top users to retrieve.           |

### Response Example

```json
{
  "success": true,
  "data": [
    {
      "user": {
        "id": "user-uuid-4",
        "name": "Diana"
      },
      "score": 15,
      "rank": 1
    }
  ]
}
```

---

## Notes
- All endpoints return a standard response structure with `success` boolean and `data` payload.
- The `user` object in the response contains minimal public details (id, name).
- Ranks are 1-based.
