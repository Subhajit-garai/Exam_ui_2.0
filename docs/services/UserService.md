# User Service Documentation

## Class: `userApi`

The `userApi` class handles user authentication, profile, and settings.

### Methods

#### `forgotpassword(data)`
Initiates forgot password process.
- **Endpoint**: `/user/forgotpassword`
- **Method**: POST
- **Body**: `data` object.

#### `forgotpasswordverify(data)`
Verifies forgot password request.
- **Endpoint**: `/user/forgotpassword/verify`
- **Method**: POST
- **Body**: `data` object.

#### `login(data)`
 signs in a user.
- **Endpoint**: `/user/signin`
- **Method**: POST
- **Body**: `data` object.

#### `signup(data)`
Registers a new user.
- **Endpoint**: `/user/signup`
- **Method**: POST
- **Body**: `data` object.

#### `userLogout()`
Logs out the user.
- **Endpoint**: `/user/logout`
- **Method**: GET

#### `fetchuser(dispatch)`
Fetches current user details and updates store.
- **Endpoint**: `/user/auth`
- **Method**: GET (Dispatched)

#### `genTockenFroEmail(data)`
Generates validation token for email. (Note: Method name as in code)
- **Endpoint**: `/user/validate/email`
- **Method**: POST
- **Body**: `data` object.

#### `genTockenFroTelegram(data)`
Generates validation token for Telegram.
- **Endpoint**: `/user/validate/telegramid`
- **Method**: POST
- **Body**: `data` object.

#### `veryfyTockenFroEmail(data)`
Verifies email token.
- **Endpoint**: `/user/verify/email`
- **Method**: POST
- **Body**: `data` object.

#### `veryfyTockenFroTelegram(data)`
Verifies Telegram token.
- **Endpoint**: `/user/verify/telegramid`
- **Method**: POST
- **Body**: `data` object.

#### `getRecentActivity()`
Retrieves recent user activity.
- **Endpoint**: `/user/activity/recent`
- **Method**: GET

#### `getExamTimeline()`
Retrieves exam timeline.
- **Endpoint**: `/user/timeline`
- **Method**: GET

#### `updateAcademicProfile(data)`
Updates academic profile.
- **Endpoint**: `/user/profile/academic/update`
- **Method**: PUT
- **Body**:
    - `academicProfile` (object): { category, exam, year }
    - `standard` (string, optional)
    - `stream` (string, optional)
    - `school` (string, optional)

#### `getSubscriptionTiers()`
Retrieves subscription tiers.
- **Endpoint**: `/user/subscription/tiers`
- **Method**: GET

#### `getWsToken()`
Retrieves WebSocket token.
- **Endpoint**: `/user/ws-token`
- **Method**: GET
