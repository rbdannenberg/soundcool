# Load Preset in Array Buffer

Load the selected Preset

**URL** : `/api/v1/presets/load/:presetId`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : Owned or Shared with current user

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "type": "buffer",
    "data": "[Valid Audio ArrayBuffer]"
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
