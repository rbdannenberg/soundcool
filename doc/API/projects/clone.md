# Clone a Project

Used to clone a project 

**URL** : `/api/v1/projects/clone`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : Shared with current user

**Data example**

To clone project with Project ID `91`
```json
{
    "projectId": 91
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "project_id": 98,
    "user": 2,
    "name": "Project 1",
    "created_date": "2019-09-23T15:53:45.000Z",
    "description": "123",
    "content": "{\"nextBlockId\":5,\"nextTypeId\":{\"Delay\":2,\"Transposer\":1,\"Pan\":1,\"Player\":4,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Player\",\"id\":4,\"typeId\":3,\"name\":\"P3\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"path\":\"\",\"loop\":false,\"speed\":1,\"reverse\":false},\"collapse\":true,\"file\":{\"sound_id\":98,\"user\":2,\"name\":\"sound.wav\"}},\"inNode\":[],\"outNode\":[],\"inDisabled\":true,\"color\":\"#e5777d\",\"playing\":false,\"reversed\":false,\"loop\":false,\"speed\":1,\"volume\":60,\"hour\":0,\"minute\":0,\"second\":0,\"file\":{\"sound_id\":98,\"user\":2,\"name\":\"sound.wav\"},\"kinect\":false}]}",
    "sharedUsers": null,
    "isPublic": 0
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