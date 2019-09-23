# Share Project With New USer

Used to share a project with new user

**URL** : `/api/v1/projects/addShare`

**Method** : `PATCH`

**Auth required** : YES

**Permissions required** : Owned or Shared with current user

**Data example**

Share project with Project ID `86` with user with User ID 2

```json
{
    "userId": "2",
    "userEmail": "",
    "projectId": 86
}
```

Share project with Project ID `86` with user with Email ID `userx@welcome.com`

```json
{
    "userId": "",
    "userEmail": "userx@welcome.com",
    "projectId": 86
}
```

## Success Response

**Code** : `200 OK`

**Content example**

Case : 1
```json
{
    "data": "{\"users\":[{\"user_id\":2,\"name\":\"Sample user 2\",\"email\":\"user2@welcome.com\"}]}",
    "message": "Project Shared successfully"
}
```

Case : 2
```json
{
    "data": "{\"users\":[{\"user_id\":73,\"name\":\"User X\",\"email\":\"userx@welcome.com\"}]}",
    "message": "Project Shared successfully"
}
```

## Error Response

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "err": "[Valid Error]"
}
```

## Notes

* Media files for current user will be set to shared if not already