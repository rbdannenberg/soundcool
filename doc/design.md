# Design and Architecture Notes for Soundcool on Web Audio

## Introduction
This document contains working notes on the design/implementation of a port of Soundcool to Web Audio

The system has 4 main parts (at least):

- **Audio components** corresponding to Soundcool modules like Player and Direct Input. Audio components implement *only* audio connections, control, save, restore, and processing, but *not* graphical interfaces.

- **GUI components** also correspond to Soundcool modules. They have a one-to-one correspondence with Audio components. Each GUI component contains an instance of an audio component. The GUI component implements the graphical and interaction elements of the component.

- The **front end** allows users to create and edit Soundcool projects consisting of multiple interconnected components.

- The **back end** allows users to save, retrieve and manage projects and media.

This document also contains other topics, including

- OSC connections

- Local server support

## Audio Components

## GUI Components

## Front End
The basic front end design consists of a left-hand column serving as a menu of components that can be instantiated, and two more columns that contain active component instances. All components must have a fixed width so they can be organized or stacked into columns. Components may have a way to "open" them into larger separate windows, e.g. to display data.

## Back End
An important design decision is how projects, media, sharing, and permissions work in a shared cloud-supported Soundcool system.

Here is a summary:

- The system supports multiple users. Each user has an ID and password to login.

- Each user can have multiple projects. A project is typically small, consisting of just a collection of modules and their connections and parameter settings. Projects do not include audio files or other media. We expect projects will be copied often to create different versions, e.g. a project might be copied and modified slightly for a one-time performance to avoid disturbing the "master" version.

- Each user can have a collection of media. Media files are typically medium-to-large files of audio or video. Projects access media *by reference*, so when a project is copied, we do not need to copy the associated media files.

- Users can mark projects as *private* or *public*. Users can also share projects with a set of other users specified by user IDs. If there is at least one sharer and the project is not *public*, the project is considered *shared*.

- Similarly, media as a whole can be *private*, *shared*, or *public*. Users do not have control over individual media. Shared or public media are read-only to others. Users cannot add media files to another user's media, even if that media collection is shared or public.

- When projects are copied by other users, media references are copied too, so media references must include the user ID as well as the media file name, and media are shared. If the files are altered by the original owner, the changes will be "seen" by the sharer as a side effect since the sharer only has references to the file. (This is considered a feature in spite of obvious cases where this is not desirable behavior. Perhaps the UI should allow a user to make all media in a project local to the user, in which case media owned by others would be copied to the user's media collection and project references would be updated to the local copies.)

- To access media, permissions must be checked. E.g. to access the media file "rbd/sound.wav" the server must check that either rbd is the logged-in user or rbd's media collection is *public*, or rbd's media collection is shared with the logged-in user.

- Uploads are simpler: they are always permitted, but the upload is stored in the media collection of the logged-in user.

### Project Page
Displays logged in user's projects and all projects shared with user.

Operations on user's projects:
* open (for edit/run),
* copy - asks for new name, copies project into new project (media are referenced in the project but not copied)
* delete - asks for confirmation, removes project, does not remove any media)
* share - asks for user name to share with, enters projectID and sharerID into Project Sharing Table, adds sharerID to Media Sharing Table if not there already,
* unshare - Prints "Note: Unsharing this project will not remove any copies that have already been made. Do you want to continue sharing media with <USER>? (Yes or No)." If user selects "No", another message appears: "Warning: Unsharing media with <USER> will block access to your media from *all* other projects that are shared with <USER> (if any)." (Of course user now gets a choice: "Continue sharing media with <USER>" or "Confirm: unshare all media with <USER>")
* private/public - changes public field in Project Table

### Media Page
Displays media files owned by user.

Operations on user's media:
* replace (per file) - allows file upload
* upload new - prompts for name, allows file upload
* delete (per file)
* share (all media) - prompts for user name to share with
* unshare (all media) - prompts for user name to unshare with. Prints "Note this will also unshare all projects shared with <USER>." User clicks Confirm or Cancel. Confirm removes sharer from Media Sharing Table and removes all rows of Project Sharing Table where sharerID == <USER>.

# Suggested Database Tables
#### User Table Fields 
````
userID 
name 
password 
email 
````
#### Project Table Fields
````
projectID
ownerID (a userID)
name
public (true/false)
json (the entire project as JSON)
````

#### Media Table Fields
````
mediaID
ownerID (a userID)
path (from media root to file, begins with userID)
````

#### Project Sharing Table Fields
````
projectID
sharerID (a userID)
````

#### Media Sharing Table Fields
````
ownerID (a userID)
sharerID (a userID who is allowed to access all of owner's media files)
````


# OSC Connections

We want to be compatible with existing Soundcool apps on IOs and Android. These use OSC to connect to a Soundcool process running on a laptop. OSC uses UDP, which is not possible in a browser, so we cannot emulate this behavior directly using Javascript in a browser. (Nor do we want to write or maintain a browser plug-in, which creates security risks and a lot of push-back from browser makers.)

The obvious solution is WebSockets, which requires a local server to receive UDP messages and relay them over WebSockets to the local browser. Note that Soundcool apps use OSC in both directions to get a confirmation from the main laptop application, so we need to support that.

There are two possible approaches:

## node.js approach

We could add an OSC handler to a local node.js server. This is pretty straightforward, but if the "main" server is cloud-based, we need both the cloud service *and* a local installation of node.js. This could be confusing. What if the user intends to connect to the cloud but gets confused and connects to the local server instead? Or vice versa? Do we want to run *two* node.js servers? One to support the Soundcool back-end and one to relay OSC messages?

## Serpent approach

Serpent already has a simple web server that will allow a browser to send/receive OSC over web sockets. This is based on O2, so that eventually, the Soundcool mobile apps could use discovery to find Soundcool and select processing modules by name rather than having users type in IP addresses and port numbers. But unfortunately, a missing link is O2 running on an app -- it has not been ported to IOs or Android, and the Soundcool apps would have to be modified to use O2. Some wireless networks (including CMU) do not allow broadcast messages except to certain registered ports, so there are limits to O2 discovery in some wireless environments.

In the long term, I would like to see if this is possible: Use Bonjour to find the local laptop Serpent server. In the mobile device browser, visit http://name.local:8080. This would download a Soundcool app written in HTML5. (The Serpent server currently has a minimal support for serving files as web pages, so this is ready.) The HTML5 would present the same interface as the current Soundcool app (or we could extend it, make it look more like Web Audio Soundcool, etc.), but it would talk to the Serpent server over a WebSocket. We could go through O2 or just bypass and go websocket-to-websocket through the server and into the local browser on the laptop.

# Local Server Support

We need to allow both cloud-based Soundcool and local Soundcool. Local will be better for classrooms -- they need a local machine for audio computation, so the resource is there, and they may not have high-speed Internet for downloading big audio files, so local servers should out-perform cloud servers.

The challenge will be to make a local server installer that avoids having to learn about system administration. It should also be cross-platform, supporting Windows, Mac OS, and Linux.

Functionally, the cloud and local systems should be identical, meaning local users will still have accounts, IDs, passwords, permissions, etc. Of course, a classroom can set up user ID "musicclass" and share the password so that class projects can be accessed by whoever is sitting at the laptop. (This does *not* mean we want multiple students logged on to the same account at the same time. We should take steps to prevent that since we would then have to do a huge amount of work to support concurrent editing of projects.)



