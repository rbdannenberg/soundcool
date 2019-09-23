# Set Project Public On/Off

Used to update a project public availability

**URL** : `/api/v1/projects/setPublic`

**Method** : `PATCH`

**Auth required** : YES

**Permissions required** : Owned or Shared with current user

**Data example**

Set project with Project ID `85` to public : `on`

```json
{
    "projectId": 85,
    "isPublic": true
}
```

Set project with Project ID `85` to public : `off`

```json
{
    "projectId": 85,
    "isPublic": true
}
```

## Success Response

**Code** : `200 OK`

**Content example**

Public : `on`

```json
{
    "message": "Project visibility is set to public"
}
```

Public : `off`

```json
{
    "message": "Project visibility is set to shared only"
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

## Notes

* Media files for current user will be set to shared if not already