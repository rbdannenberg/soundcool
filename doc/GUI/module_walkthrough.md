## Module Walkthrough

This is the documentation to walk a new developer through how to build a module, including how to specify a sound file, how it is stored, and how it is retrieved when the module is created from a saved project.

### How to build a Module GUI

#### Step 1: Draw the module GUI

-   1.1 Go to `src/backend/dashboard/components/projectEditor`, directory for the projectEditor.
    Inside `ui/Components/types`, create file `yourModule.jsx`. Create your module as a class and export. In the class, you can embed html code that draws module GUI in the `render()` function. You can refer to the existing module GUI such as `Oscilloscope.jsx` for syntax directions.

-   1.2 Go to `all.jsx`, and add the module class you just created and exported.

#### Step 2: Add module properties

Each module should have their own properties. For example, Delay module should control properties like delayTime and feedback amount.

-   2.1 Go to `ui/Components/blockSpecs.jsx`, add your module as an object that contains fields with their initializing values.

#### Step 3: Add event handlers

We dispatch event to reflect the change that user made.

-   3.1 In `yourModule.jsx`, you will be using `store.dispatch()` or `changeBlock()` functions (the later is just a shortcut for the former) to reflect the change that user made. Please import \\
    `import { store } from "../../../index";`
    `import changeBlock from "../../../handlers";`
-   3.2 These functions will dispatch an event of type `"CHANGE_BLOCK"` that being processed by `reducers/blocks.js`. The pipeline of processing event has already been setup in `reducers/blocks.js`, so you don't need to modify this file. But you can if you want to create new types of more costumized events.

For more redux directions and working principles, please refers to the `GUI objects documentation` in the wiki page of this repo or redux documentation.

#### Step 4: Implement audio objects

We just draw the GUI, however the working sound come from the audio objects that's build upon the webaudio API.
Go to `projectEditor/audio` folder, implement `sc-yourModule.js`. Plese refer to the documentation in `doc/modules` from root folder.

#### Step 5: Finish setting up your module

-   5.1 Set up addBlock
    -- 5.1.1 Goto `projectEditor/ui/reducers/block.js`, import the `sc-yourModule`. Call your new module in the function `newSoundModule()`.
    -- 5.1.2 Goto `projectEditor/ui/Components/AddBlock.jsx`, add a new `<div/>` in the list, so that you can add your new module from the drop down list.

### How module is created

For saving the project, there are corresponding functions in `projectEditor/index.js` that do `createProject`, `saveProject`, `downloadProject` and so on. They saves the redux state (that documents all information about what are the modules in this project, and their parameters and values) into a JSON object. When loading the project, it request the JSON object from database, and copy the redux state, so every module GUI including their parameters gets recreated. For request documentation, please refers to `doc/API`. \\
However, this doesn't reinitialize the `sc-module` audio object that works with sound. We are working on to implement a buffer time to reinitialize the audio object when we reload the project, since there are things like requesting users for the microphone permission so that webaudio can work.

### Sounds

User can upload sound in their sound page. After uploading, sounds are stored in file system and can be fetched through RESTful API. For API specifications, please refer to `doc/API`.

-   Using sounds
    `import AddSound from "../../../../addSound";`\\
    AddSound (from `src/backend/dashboard/components/addSound`) is the GUI class that opens up the panel for the user to choose their sound from the sound list. \\
    `<AddSound onSoundSelect={yourFunction} file={yourFile} />`\\

    `import { serveAudio } from "../../../../sounds/actions";`
    serveAudio is the function that takes the sound_id and returns the url to fetch from API. \\
    `let url = serveAudio(file.sound_id);`\\
    `yourAudioObject.load(url)`\\
    You can send an httpRequest inside your audio object in order to fetch the sound. For example: \\
    `let request = new XMLHttpRequest();`
    `request.open('GET', url, true);`
