# Update a Project

Used to update a project content

**URL** : `/api/v1/projects/update`

**Method** : `PATCH`

**Auth required** : YES

**Permissions required** : Owned or Shared with current user

**Data example**

Update content for project with Project ID `79`

```json
{
    "projectId": "79",
    "content": "{\"nextBlockId\":3,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":2,\"Player\":2,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Pan\",\"id\":2,\"typeId\":1,\"name\":\"P1\",\"collapse\":false,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"panVal\":0},\"outNode\":{},\"inNode\":{}},\"inNode\":[],\"outNode\":[],\"color\":\"#88b35f\",\"panVal\":0,\"kinect\":false}]}"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "Project Updated successfully"
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