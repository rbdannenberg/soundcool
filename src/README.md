# Soundcool Source code

This is the place where you run (locally) the express backend
along with react frontend and mysql database.

## Prerequisites

- Prerequisites
  - Node 10.16.0+
  - NPM 6.10.0+
  - MySQL 8.0+ (for OS X, see [Installing MySQL on macOS Using Native Packages](https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation-pkg.html))
    - When installing, choose "Use Strong Password Encryption" if possible. 
    - Choose the option to start the server immediately. 
    - Installer will create a root user (not the same as the root 
      account on your computer), and ask for a root user password. You 
      will need this to configure mysql. WARNING: Non-alpha-numeric characters 
      in passwords may not work (!). 
  - FFmpeg
    - Linux :- [Install ffmpeg](https://itsfoss.com/ffmpeg/)
    - Windows :- [Install ffmpeg](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg)
    - OSX :- [Install ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/wiki/Installing-ffmpeg-on-Mac-OS-X)

## How to run

If you are running the whole project, there are four steps.

- **Step 1**: Install all dependencies

  - Go to `backend` folder.
  - Run `npm i` to install all the dependencies.
  - Go to `frontend` folder.
  - Run `npm i` to install all the dependencies.

- **Step 2**: Start webpack so it can rebuild project if any changes detected.

  - (If you are not developing / modifying anything in Frontend folder, you don't need to run this step)
  - Go to `frontend` folder.
  - Run `npm run webpack`
  - It will constantly watch for any changes made in Frontend folder and recompile React jsx into proper js each time you save your code. It won't terminate and it will print errors when compilation not successful.

- **Step 3**: Setup MySQL server

  - OSX :- To use the mysql command line, type to a terminal:
    ```
    /usr/local/mysql/bin/mysql -uroot -p
    ```
    and use the MySQL root password you created when you set up
    MySQL.

    To use MySQL Workbench, connect to the localhost server,
    look for a tab named "Query" followed by a number, and enter the
    command there. Then with the command(s) selected, click the
    lightning bolt icon to run the command(s).

  - Create a new user using the command below (You can use mysql command line or mysql workbench).
    ```sql
    CREATE USER 'soundcool'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
    GRANT ALL PRIVILEGES ON soundcool.* TO 'soundcool'@'localhost';
    ```
    NOTE: This user/password is used by the *backend* to access the
    database. `soundcool` is an account for the backend system, not
    for any *user*. This account and password can be different. They
    are communicated to the backend software through the `.env` file
    (see below). Below, you will install *user* accounts for User 1
    and User 2 that can be used to login when you connect to the
    backend through a browser.

  - Create the `soundcool` database. If using mysql command line,
    execute
    ```
    CREATE DATABASE soundcool;
    ```
    If using MySQL Workbench, click on the "+database" icon (pop-up
    help says "Create a new schema in the connected server", and note
    that databases are called "schemas".) 

  - Initialize the soundcool database. If using mysql command line,
    run this command in terminal:
    ```sql
    mysql -u soundcool -p soundcool < create-soundcool-db.sql
    ```

    (Note: user "soundcool" and password "password" match the CREATE
    USER command above.)
    
    If using MySQL workbench, use File:Open SQL Script... to open the
    `database/create-soundcool-db.sql` file.
    Execute the scripts by clicking the lightning button on the
    interface.

    The database is now initialized according to
    create-soundcool-db.sql, which includes two users: "User 1" as
    user1@welcome.com with password welcome, and "User 2" as
    user2@welcome.com with password welcome.


- **Step 4**: Setting up enviormental variables
  - Create a `.env` file in `backend` directory
  - Copy the below details in the newly created `.env` file.
    ```ruby
      MYSQL_HOST= localhost
      MYSQL_USER= soundcool
      MYSQL_PASS= password
      MYSQL_DB= soundcool
      JWT_SECRET= randomText
    ```

- **Step 5**: Start server

  - Go to `backend` folder.
  - Run `npm start`
  - Go to http://localhost:5000 to see the project!

- **Step 6(Optional)**: Development Tools 
  - To see the store state and actions you can install redux devtools extension in your browser

Alternatively, if you just want to run the project front-end and want it to use a server hosted at X location, you can just

- Go to `frontend/src/components/constants.js` file.
- Change the `BASE_URL` with the X
- run `npm start`
- It will start the project editor in http://localhost:3000

## How to develop

As you may noticed, both the create-react-app and server-side-rendering
require you to compile the react codes into a bundle and serve it when running the app.
Without recompiling them, you will find that none of your changes are shown.

- Anytime you make changes in the folder `frontend` (the create-react-app)
  - Run `npm run webpack`. You don't need to call this every time, since webpack is watching you and automatically recompile when you make changes.
- Any changes you make in terms of the server (anything outside of both client folders)
  will be automatically updated by `nodemon`. As you can see it's nodemon instead of node
  running when you starts the server.

## What do we currently have

- A simple login scheme.
  - Please check the database for the table of user, projects and sounds.
    You can login as `user1@welcome.com` or `user2@welcome.com` using password `welcome`, they will have a few pre-populated projects and
    sound associated.
  - There is authorization scheme so that you can only access the projects or sounds
    when you logged in as a user.
- Register

For what needs to be implemented, please refer to the Issues page which contains TODOs.
For new contributors, each issue is tagged with classification, and I recommend starting from
the purple tag `good first issue`.
