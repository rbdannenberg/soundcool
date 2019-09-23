# Show All Accessible Porjects

Get the details of the all projects owned or shared with current user.

**URL** : `/api/v1/projects/get`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a user with User ID `1` who owns a project with Project ID `81` and have a shared project with Porject ID `79`

```json
{
    "data": [
        {
            "project_id": 79,
            "user": 2,
            "name": "Project 1",
            "created_date": "2019-09-11T00:38:40.000Z",
            "description": "Player",
            "content": "{\"nextBlockId\":33,\"nextTypeId\":{\"Delay\":3,\"Transposer\":3,\"Pan\":3,\"Player\":4,\"SignalGen\":3,\"Speaker\":3,\"DirectInput\":2,\"Pitch\":3,\"VSTHost\":1,\"Routing\":3,\"Mixer\":3,\"Record\":3,\"Spectroscope\":2,\"Oscilloscope\":3,\"Envelope\":3,\"Filter\":3,\"Keyboard\":2,\"SamplePlayer\":2,\"Sequencer\":2},\"nowIn\":[],\"nowOut\":[],\"bs\":[]}",
            "sharedUsers": "{\"users\":[{\"user_id\":1,\"name\":\"Sample user 1\",\"email\":\"user1@welcome.com\"}]}",
            "isPublic": 0,
            "isOwner": 2
        },
        {
            "project_id": 81,
            "user": 1,
            "name": "Project 2",
            "created_date": "2019-09-20T12:50:52.000Z",
            "description": "123",
            "content": "{\"nextBlockId\":33,\"nextTypeId\":{\"Delay\":3,\"Transposer\":3,\"Pan\":3,\"Player\":4,\"SignalGen\":3,\"Speaker\":3,\"DirectInput\":2,\"Pitch\":3,\"VSTHost\":1,\"Routing\":3,\"Mixer\":3,\"Record\":3,\"Spectroscope\":2,\"Oscilloscope\":3,\"Envelope\":3,\"Filter\":3,\"Keyboard\":2,\"SamplePlayer\":2,\"Sequencer\":2},\"nowIn\":[],\"nowOut\":[],\"bs\":[]}",
            "sharedUsers": null,
            "isPublic": 0,
            "isOwner": 0
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