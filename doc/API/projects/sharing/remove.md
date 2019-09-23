# Remove a User from a Shared Project

Used to remove user from a shared project

**URL** : `/api/v1/projects/removeShare`

**Method** : `PATCH`

**Auth required** : YES

**Permissions required** : Owned or Shared with current user

**Data constraints**

```json
{
    "projectId": "[Project ID in number format]",
    "sharedUsers": "[Updated Project Sharing Setting]"
}
```

**Data example**

Set project with Project ID `86` sharing to null `(0 Users)`

```json
{
    "projectId": 86,
    "sharedUsers": "{\"users\":[]}"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "data": "{\"users\":[]}",
    "message": "User removed successfully"
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