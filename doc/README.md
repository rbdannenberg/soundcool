# Documentation for the UI

For the UI, we use React style of Single Page Application in which different components are rendered.

The UI of the soundcool application is expected to have an initial login page and an option to Sign-up. 
Once a user logs in, he can navigate across various components such as
- AboutUs Page 
- ContactUs Page  
- SoundMenu Page  
- Project Page  

There driver of this code is the MainComponent which calls the other components and makes use of Routing to render different components based on the path. Here we have  `<Switch> ... </Switch>` which decides which of the component is rendered similar to switch in other programming languages (like C++). Once the path matches, the component requested is rendered. Functions can also passed as props here as shown in Fig 1.

| ![Fig 1](/doc/imagesDoc/fig1.PNG) |
|:--:| 
|Fig 1|

Many of the components such as the Header, Footer, AboutUs, Home and Contact Component are pretty self-explanatory as they just include bootstrap styling.

#### LoginComponent
It renders a login form and makes uses of the `<RegisterForm>` Component declared in the file ‘LoginComponent.js’ if a user has not signedUp Yet. Once the user registers, an action must be dispatched that adds the user credentials to the store which will later be used for verification purposes. The credentials must include username, email and password. The backend of the registration and verification are yet to be implemented and the more credentials maybe asked for in future based on usecase. For now, just the three should do. The email can be used to reset the password.

#### SoundComponent
The user has the option to add sounds to his media files that can be later accessed by the sound components in the project later. The purpose of this page is to allow the users to add media to their account.  The sound files are added by dispatching an action which stores the information of the new media in the store itself.

#### ProjectComponent:

This is a vital Component in the soundcool application. It is where a user will play around move around X to build a project. 

###### What exactly is a project? 

A project consists of modules that a user can dragged from the 2 sidebars and moved to the 2 columns on the center as shown in Fig 2. 

| ![Fig 2](/doc/imagesDoc/fig2.PNG) |
|:--:| 
|Fig 2|

Let us call the each module in the center a “block”. So essentially, a project is just two of these lists, each with a number of blocks. Within the code, these blocks are represented as an object and the lists are an array of these objects. So moving the objects and reordering them just requires splicing of arrays and manipulating them. We make use of the move and reorder functions to assist us with moving around modules and reordering blocks within the same list or to move it to the other list. 

###### What happens when a module is dropped from the sidebar to the center?

When dragging of an object is completed, the onDragEnd function is triggered. It handles cases on how the application must behave on completion of a drag. For example, if a block is dragged to the sidebar, nothing should happen. This is taken care by this function.
Once a module is dropped to the center, we need to just add an object to one of the two lists. These is done in 2 steps. 
The addBlock function is an Action in redux which adds the information of the block to a blockList that is present in the redux store. The blockList is a single list of all the blocks that are present in the current project. Each Block is assigned an ID when being stored in the store. 
The ProjectComponent is a stateful component i.e it stores information as shown in Fig 3. Everytime we add, move, or reorder a block, we alter these 4 arrays. Note that the array does not store any information about the object but that required for its identification only. The details regarding its properties such as the frequency for a SignalGen block is stored in the redux Store. The state here just stores a reference to that block in the store.

| ![Fig 3](/doc/imagesDoc/fig3.PNG) |
|:--:| 
|Fig 3|

###### What is an Action and store in redux?

An action is just a function. In redux terminology, we use functions to alter the redux store. A redux store holds the whole state of the application. In layman terms, a redux store contains data at a global that can be accessed throughout the React Application. The technical details on how to handle it are well documented in their official documentation here.       

###### How do we delete a block from the project?
This is handled by the handleDelete function. This function identifies the list from which the object is removed and updates the state of the list accordingly. An action is also dispatched that removes the block from the redux store. 

The following keywords will be useful to understand the code better. However, this might not be required.
- `<DragDropContext />` - Wraps the part of your application you want to have drag and drop enabled for.
- `<Droppable />` - An area that can be dropped into. Contains multiple `<Draggable />`.
- `<Draggable />` - What can be dragged around
- `Innerref`- Our `<Draggable />` and `<Droppable />` components both require a HTMLElement to be provided to them. This is done using the innerRef property on the DraggableProvided and DroppableProvided objects.

The projectComponent has been kept separate from the rest of the UI as the design for the remaining UI has not been finalized and is open to alterations. 
