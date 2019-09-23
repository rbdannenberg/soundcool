# Login

Used to collect a Token for a registered User.

**URL** : `/api/v1/user/sign_in`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "user": {
        "email": "[valid email address]",
        "password": "[password in plain text]"
    }
}
```

**Data example**

```json
{
    "user": {
        "email": "user1@welcome.com",
        "password": "welcome"
    }
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY5MjQzNTE1fQ.bLWjzEL-2XQ10G_cT1FcLz67QaFnKey8LeakKKBV1b8"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "non_field_errors": [
        "Unable to login with provided credentials."
    ]
}
```