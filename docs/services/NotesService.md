# Notes Service Documentation

## Class: `noteApi`

The `noteApi` class manages fetching notes, subjects, and topics.

### Methods

#### `fetchAvalibleSubjectforUser(dispatch)`
Fetches available subjects for the user and updates the store.
- **Endpoint**: `/user/notes/allsubject`
- **Method**: GET (Dispatched)

#### `fetchSubject_topics(dispatch, Subject)`
Fetches topics for a given subject and updates the store.
- **Endpoint**: `/notes/alltopic/{Subject}`
- **Method**: GET (Dispatched)
- **Parameters**:
    - `Subject` (path, string): Subject name.

#### `fetchNotes(dispatch, Subject, topic)`
Fetches content/notes for a specific subject and topic, updating the store.
- **Endpoint**: `/notes/getnote/{Subject}/{topic}`
- **Method**: GET (Dispatched)
- **Parameters**:
    - `Subject` (path, string): Subject name.
    - `topic` (path, string): Topic name.

#### `getSubjects(exam, dispatch, setinredux)`
Retrieves all subjects, optionally filtering by exam and updating redundancy.
- **Endpoint**: `/notes/allsubject`
- **Method**: GET
- **Parameters**:
    - `exam` (query, string, optional): Exam filter.
    - `setinredux` (boolean, default=false): Whether to dispatch to store.

#### `getTopics(subject, dispatch, setinredux)`
Retrieves all topics for a subject.
- **Endpoint**: `/notes/alltopic/{subject}`
- **Method**: GET
- **Parameters**:
    - `subject` (path, string): Subject name.
    - `setinredux` (boolean, default=false): Whether to dispatch to store.
