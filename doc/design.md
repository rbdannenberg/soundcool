# Design and Architecture Notes for Soundcool on Web Audio

## Introduction
This document contains working notes on the design/implementation of a port of Soundcool to Web Audio

The system has 4 main parts (at least):

- **Audio components** corresponding to Soundcool modules like Player and Direct Input. Audio components implement *only* audio connections, control, save, restore, and processing, but *not* graphical interfaces.

- **GUI components** also correspond to Soundcool modules. They have a one-to-one correspondence with Audio components. Each GUI component contains an instance of an audio component. The GUI component implements the graphical and interaction elements of the component.

- The **front end** allows users to create and edit Soundcool projects consisting of multiple interconnected components.

- The **back end** allows users to save, retrieve and manage projects and media.

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




