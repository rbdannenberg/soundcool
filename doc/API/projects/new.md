# Create a new Project

Used to create a new project

**URL** : `/api/v1/projects/new`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : none

**Data example**

```json
{
    "projectName": "Project 1",
    "projectDescription": "Player",
    "content": "{\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Pan\",\"id\":1,\"typeId\":1,\"name\":\"P1\",\"collapse\":false,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"panVal\":0},\"outNode\":{},\"inNode\":{}},\"inNode\":[],\"outNode\":[],\"color\":\"#88b35f\",\"panVal\":0,\"kinect\":false}],\"nextBlockId\":2,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":2,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1}}"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "project_id": 83,
    "user": 1,
    "name": "Project 1",
    "created_date": "2019-09-23T13:39:19.000Z",
    "description": "Player",
    "content": "{\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Pan\",\"id\":1,\"typeId\":1,\"name\":\"P1\",\"collapse\":false,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"panVal\":0},\"outNode\":{},\"inNode\":{}},\"inNode\":[],\"outNode\":[],\"color\":\"#88b35f\",\"panVal\":0,\"kinect\":false}],\"nextBlockId\":2,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":2,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1}}",
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