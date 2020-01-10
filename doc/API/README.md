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

* [User Projects](projects/get.md) : `GET /api/v1/projects/get`
* [Create Project](projects/new.md) : `POST /api/v1/projects/new`
* [Update Project](projects/update.md) : `PATCH /api/v1/projects/update`
* [Clone Project](projects/clone.md) : `POST /api/v1/projects/clone`
* [Remove Project](projects/remove.md) : `PATCH /api/v1/projects/remove`
* [Share with a User](projects/sharing/add.md) : `PATCH /api/v1/projects/addShare`
* [Remove a user from sharing pool](projects/sharing/remove.md) : `PATCH /api/v1/projects/removeShare`
* [Project Public : On/Off](projects/sharing/public.md) : `PATCH /api/v1/projects/setPublic`

#### Media API

* [User Media](media/get.md) : `GET /api/v1/sounds/get`
* [Upload Media](media/upload.md) : `POST /api/v1/sounds/upload`
* [Remove Media](media/remove.md) : `PATCH /api/v1/sounds/remove`
* [Stream Media](media/stream.md) : `GET /api/v1/sounds/serveAudio/:audioId/:token`

#### Presets API

* [Available Presets](presets/get.md) : `GET /api/v1/preset/get`
* [Upload Preset](presets/upload.md) : `POST /api/v1/preset/upload`
* [Load Preset](presets/load.md) : `GET /api/v1/preset/load`

