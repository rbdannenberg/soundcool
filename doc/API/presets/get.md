# Show All Available Presets

Get the details of the all presets available to current user.

**URL** : `/api/v1/presets/get`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : Owned or Shared with current user

## Success Response

**Code** : `200 OK`

**Content examples**

For a user with User ID `1`

```json
{
    "presets": [
        {
            "preset_id": 1,
            "user": null,
            "name": "CCRMAStairwell.wav"
        },
        {
            "preset_id": 3,
            "user": 101,
            "name": "RoomPool.wav"
        }
    ]
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