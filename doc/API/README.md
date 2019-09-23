# RESTAPIDocs Examples

## Open Endpoints

Open endpoints require no Authentication.

* [Login](login.md) : `POST /api/v1/user/sign_in`
* [Register](register.md) : `POST /api/v1/user/register`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

#### Porjects API

#### Media API

