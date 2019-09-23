# Upload Media To Server

Used to upload media to server

**URL** : `/api/v1/sounds/upload`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : none

**Data example**

Request with multipart/form-data encoded form-data

```
    ------WebKitFormBoundary2WTdJCmm2L9vvCBa\r\nContent-Disposition: form-data; name="file"; filename="sound.wav"\r\nContent-Type: audio/wav\r\n\r\n\r\n------WebKitFormBoundary2WTdJCmm2L9vvCBa--\r\n
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "sound_id": 80,
    "user": 1,
    "name": "sound.wav"
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