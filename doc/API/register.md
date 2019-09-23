# Login

Used to collect a Token for a registered User.

**URL** : `/api/v1/user/register`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "user": {
        "name": "[name in plain text]",
        "email": "[valid email address]",
        "password": "[password in plain text]"
    }
}
```

**Data example**

```json
{
    "user": {
        "name": "Tim Cook",
        "email": "timcook@example.com",
        "password": "welcome"
    }
}
```

## Success Response
### For New User 
**Code** : `200 OK`

**Content example**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzYsImlhdCI6MTU2OTI0Mzg3OX0.fOtp_U3Bcxyx1FqzRvFDWT5oJswUgG3uRMHAH8JjgAc"
}
```

### Old User
```json
{
    "res": "error",
    "error": "User already exist"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "non_field_errors": [
        "Unable to register with provided credentials."
    ]
}
```