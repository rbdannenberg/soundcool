# Add media using link

Used to Add a new media using external link

**URL** : `/api/v1/sounds/addSoundLink`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : none

**Data example**

```json
{
    "audioLink": "[Valid external media link]"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "sound_id": "[soundId]",
    "user": "[current user id]",
    "name": "Sound Link"
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
