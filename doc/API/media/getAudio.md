# Stream Media Content

Stream media content

**URL** : `/api/v1/sounds/getAudio/:audioId/:token`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : Owned or Shared with current user

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "location": "[Valid external url]"
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
