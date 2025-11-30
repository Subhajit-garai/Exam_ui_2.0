# Activity Backend & Feature Documentation

## Overview
The Activity feature tracks user actions within the Exam App to provide insights into their learning progress, engagement, and achievements. This data is displayed on the "Activity Page" and "Recent Activity" widgets.

## Backend Schema (Proposed)

To support a robust activity feed, the backend should store the following information for each activity:

```json
{
  "id": "unique_activity_id",
  "userId": "user_id",
  "type": "EXAM_COMPLETED" | "QUIZ_ATTEMPTED" | "NOTE_CREATED" | "STREAK_MILESTONE" | "LOGIN",
  "title": "Short description (e.g., 'Completed Mock Test 1')",
  "description": "Detailed description (e.g., 'Scored 85/100 with 90% accuracy')",
  "metadata": {
    "score": 85,
    "totalMarks": 100,
    "subject": "Mathematics",
    "examId": "exam_123"
  },
  "status": "COMPLETED" | "IN_PROGRESS" | "FAILED",
  "timestamp": "2023-10-27T10:00:00Z"
}
```

## Useful Activities for Students

Tracking these activities will provide the most value to students:

1.  **Exam Performance**:
    *   **Exam Completed**: When a student finishes a test. Show score and rank.
    *   **New High Score**: Celebrate personal bests.
    *   **Subject Mastery**: When a student answers >90% correctly in a specific subject.

2.  **Learning Consistency**:
    *   **Daily Streak**: Log daily logins or study sessions.
    *   **Weekly Goal Met**: If students set goals (e.g., "Take 3 tests this week").

3.  **Content Interaction**:
    *   **Note Created**: When a student adds a new study note.
    *   **Topic Revisited**: When a student reviews a topic they were weak in.

4.  **Engagement**:
    *   **Quiz Participation**: Joining live quizzes or contests.
    *   **Doubt Solved**: If there's a Q&A section, tracking doubts asked/resolved.

## Frontend Implementation
- **Activity Page**: A dedicated page (`/activity`) listing all activities in reverse chronological order.
- **Filters**: Filter by type (Exams, Notes, System) or Date.
- **Visuals**: Use icons and color coding (Green for success, Blue for info, Orange for alerts) to make the feed scannable.
