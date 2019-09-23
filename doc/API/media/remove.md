# Remove a media from server

Used to remove a project

**URL** : `/api/v1/sounds/remove`

**Method** : `PATCH`

**Auth required** : YES

**Permissions required** : Owned by current user

**Data example**

Remove Media with ID `75`

```json
{
    "soundId": 75
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "Media Removed successfully"
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