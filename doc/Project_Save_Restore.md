# Save and Restore Soundcool Project Specification

## ScProject Representation
A Soundcool project (ScProject) is a Directed Acyclic Graph (DAG) of instantiated ScModules. 
Directed because directed connection have definite meaning; acyclic because projects cannot have loops; 
graph because a node can have more than one parent (ScMixer, for example). 
A node is an instantiated ScModule; link specifies which source's outIndex connects to destination's 
inIndex. So ScProject for a project with a player and speaker will look like this:

```json
{
    "nodes": {
        "speaker1": {"class": "ScSpeakers", "uiOptions": {  }, "audioOptions": {"volume": 20}},
        "player1": {"class": "ScPlayer", "uiOptions": {"name": "foo.mp3"}, 
                    "audioOptions": {"path": "sound/foo.mp3"}},
       
    },
    
    "links": [
        {"outName": "player1", "outIndex":  0, "inName": "speaker1", "inIndex": 0}
    ],
    
    "layout": { } 
}
```

## ScProject Save
* Stringify the ScProject representation.
* Save the project string in database

## ScProject Restore
* Convert project string to ScProject representation.
* Loop through all nodes; initialize a node using uiOptions and audioOptions. 
* Following special async events should return a promise object:
  * Direct Input's constructor will return a promise for user permissions.
  * Player and Sample Player will return a promise when load is called.
* Wait for all async events to resolve / reject.
* Loop through all links and connect nodes using connectTo API.
