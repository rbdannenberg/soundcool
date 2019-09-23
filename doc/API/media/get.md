# Show All Uploaded Media

Get the details of the all Media owned by current user.

**URL** : `/api/v1/sounds/get`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : Owned or Shared with current user

## Success Response

**Code** : `200 OK`

**Content examples**

For a user with User ID `1` who owns a media `file_example_WAV_1MG.wav`, `sound.wav` and have media sharing : `on`

```json
{
    "audios": [
        {
            "sound_id": 75,
            "user": 1,
            "name": "file_example_WAV_1MG.wav"
        },
        {
            "sound_id": 78,
            "user": 1,
            "name": "sound.wav"
        }
    ],
    "sharing": 1
}
```

For a user with User ID `2` who owns a media `welcome.wav` and have media sharing : `off`

```json
{
    "audios": [
        {
            "sound_id": 79,
            "user": 2,
            "name": "welcome.wav"
        }
    ],
    "sharing": 0
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