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

- Each user can have multiple projects. A project is typically small, consisting of just a collection of modules and their connections and parameter settings. Projects do not include copies of audio files or other media. We expect projects will be copied often to create different versions, e.g. a project might be copied and modified slightly for a one-time performance to avoid disturbing the "master" version.

- Each user can have a collection of media. Media files are typically medium-to-large files of audio or video. Projects access media *by reference*, so when a project is copied, we do not copy the associated media files.

- Users can mark projects as *private* or *public*. Users can also share projects with a set of other users specified by user IDs. If there is at least one sharer and the project is not *public*, the project is considered *shared*.

- Similarly, media as a whole can be *private*, *shared*, or *public*. Shared or public media are read-only to others. Users cannot add media files to another user's media, even if that media collection is shared or public.

- In addition, if a media file is included in a shared project, the media file is readable by anyone that shares the project. It follows that there should be a table containing sharers of projects and another table containing media files referenced by projects.

- Transitivity is tricky. Suppose A shares a project with B and B shares it with C. Does C get access to A's files? If so, can A revoke access to C? This gets very complicated, so the rule is that projects with references to media owned by other users *cannot* be copied. (They might be marked as "shared" or "public", but attempts to copy will fail. A user can take a "snapshot" of the project to make private copies of the media files and then sharing will work.)

- Revocation is tricky. Suppose A shared a project with B and then removes B from the list of sharers. (This should be possible.) Then, in the future, B cannot make a copy of A's project. But if B has already copied A's project (and possibly edited it and possibly is using it), then A cannot deny B access to B's current copy of the project. In addition, B's copy may be sharing media files that belong to A. Since A cannot deny B access to B's project, we also stipulate that A cannot deny B access to A's media files that were referenced when B copied A's project. Since media files are shared, A can still delete the media or replace them with silence. These changes will affect B. However, B can preemptively avoid any revocation by taking a "snapshot" to replace all of A's files with copies that belong to B, or B can do both: make a copy with references and another copy as a "snapshot" version.

- When projects are copied by other users, media references are copied too, so media references must include the user ID as well as the media file name, and media are shared. If the files are altered by the original owner, the changes will be "seen" by the sharer as a side effect since the sharer only has references to the file. (This is considered a feature in spite of obvious cases where this is not desirable behavior. The UI should allow a user to make all media in a project local to the user, called taking a "snapshot," in which case media owned by others is copied to the user's media collection and project references are updated to the local copies.)

- Media sharing is authorized through project sharing -- you cannot share a specific media file with a specific user. If you share a project with a media file reference, that media file becomes shared with the other user until the media file is deleted.

- To access media, permissions must be checked. E.g. to access the media file "rbd/sound.wav" the server must check that either rbd is the logged-in user or rbd's media collection is *public*, or rbd's media collection is shared with the logged-in user. This check must be made for each access, because sharing can be revoked (of course, sharers can use "snapshot" or use downloads to make copies, so revoked sharing does not delete copies, it only prevents future access to the original file.)

- Uploads are simpler: they are always permitted, but the upload is stored in the media collection of the logged-in user.

## More Sharing Details

Since sharing is complicated, I will describe how I think this will work operationally:

To save a project:

- Clear all file references associated with the project in the project-media table. Upload the project. Identify all media files referenced in the new version of the project. Store these current references into the table. (In other words, we just bring the table up-to-date since all the files in the project might be added, deleted, or replaced.)

To copy a project from User A to User B

- Make sure the project is either public or shared with B, the user who is making the copy. (Normally, B would not even be able to *find* or *name* the project if it is not shared, but let's assume a mild attack where B invents a name and fabricates a copy request -- the server must check access permissions to guard against this attack.)

- Check that the project references only files that belong to A, the owner of the project, or to B, the copier of the project. This is facilitated by doing a query to the project-media table that's updated whenever the project is stored. (Implementation note: If you wanted to avoid the table, you could read and search the project to extract the file references.) If there are other references, the copy fails.

- Make a copy of the project and store it in the projects of B.

- Mark each media file in the project that belongs to A with B, giving B read access to the file. (Probably there is a file read access table that lists permissions as pairs of (filename, reader). Probably, we can store a users file in their own directory, and a user implicitly has read/write/delete access to all files in his/her own directory.)

To access a media file:

- If the file is in the user's own directory, serve the file.

- If the file belongs to another user, check the permissions table for (filename, reader) where reader is the current user. If you find the file there, serve the file.

To delete a media file:

- delete the file from the file system.

- Remove all pairs (filename, reader) from the permissions table. Thus, deleting a file and recreating it will revoke access to anyone holding read permissions.

To rename a media file:

- Renaming is equivalent to copying and deleting. Copying creates a new copy with a new name and no one else has access rights (unless the user's media are marked "public"). Thus, when you rename a file, you must remove all pairs (old-filename, reader) from the permissions table.

It follows that you can revoke shared access to any file by renaming it to a new name and then renaming it back to the original name. This will flush all the permissions in the permissions table.

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
A list of sharers for each project.
````
projectID
sharerID (a userID)
````

#### Project File Table Fields
A list of media for each project.
````
projectID (the project referencing media file)
mediaID 
````

Note: Instead of a Project Sharing Table and a Project File Table, I think we could just put a "sharers" field and a "media" field in the Project Table -- each field would have to be a *list* of IDs.

#### Media Sharing Table Fields
````
ownerID (a userID)
sharerID (a userID who is allowed to access all of owner's media files)
````


#### Media File Permissions Table Fields
````
mediaID (represents the media file)
sharerID (represents user with read access to the file)
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



