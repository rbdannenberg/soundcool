# Upload Media To Server

Used to upload media to server

**URL** : `/api/v1/sounds/toggleAudioSharing`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : none

**Data example**
To turn sharing `on`

```json
{
    "sharing": true
}
```

To turn sharing `off`

```json
{
    "sharing": false
}
```

## Success Response

**Code** : `200 OK`

**Content example**
When sharing is turned `on`

```json
{
    "data": "Audio Sharing Updated Successfully",
    "sharing": true
}
```

When sharing is turned `off`

```json
{
    "data": "Audio Sharing Updated Successfully",
    "sharing": false
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
