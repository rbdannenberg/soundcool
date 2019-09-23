# Stream Media Content

Stream media content

**URL** : `/serveAudio/:audioId/:token`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : Owned or Shared with current user

## Success Response

**Code** : `200 OK`

**Content examples**

Start Streaming the media in form of chunks whose audio id is sent in request parameters

## Error Response

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "err": "[Valid Error]"
}
```