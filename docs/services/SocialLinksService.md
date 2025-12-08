# Social Links Service Documentation

## Class: `SocialLinksApi`

The `SocialLinksApi` class manages user social links.

### Methods

#### `getSocialLinks()`
Retrieves user's social links.
- **Endpoint**: `/user/sociallinks`
- **Method**: GET

#### `addSocialLink(data)`
Adds a new social link.
- **Endpoint**: `/user/sociallinks`
- **Method**: POST
- **Body**: `data` object.

#### `updateSocialLink(id, data)`
Updates a social link.
- **Endpoint**: `/user/sociallinks/{id}`
- **Method**: PUT
- **Parameters**:
    - `id` (path, string): Link ID.
- **Body**: `data` object.

#### `deleteSocialLink(id)`
Deletes a social link.
- **Endpoint**: `/user/sociallinks/{id}`
- **Method**: DELETE
- **Parameters**:
    - `id` (path, string): Link ID.
