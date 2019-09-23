# Remove a Project

Used to remove a project

**URL** : `/api/v1/projects/remove`

**Method** : `PATCH`

**Auth required** : YES

**Permissions required** : Owned by current user

**Data example**

Remove project with Project ID `82`

```json
{
    "projectId": 82
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "Project Removed successfully"
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