# Soundcool Source code

This is the place where you run (locally) the express backend
along with react frontend and mysql database.

## Prerequisites

- Prerequisites
  - Node 10.16.0+
  - NPM 6.10.0+
  - MySQL 8.0+ (for OS X, see [Installing MySQL on macOS Using Native Packages](https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation-pkg.html))

## How to run

If you are running the whole project, there are four steps.

- **Step 1**: Install all dependencies

  - Go to `backend` folder.
  - Run `npm i` to install all the dependendies.
  - Go to `frontend` folder.
  - Run `npm i` to install all the dependendies.

- **Step 2**: Start webpack so it can rebuild project if any changes detected.

  - (If you are not developing / modifying anything in Frontend folder, you don't need to run this step)
  - Go to `frontend` folder.
  - Run `npm run webpack`
  - It will constantly watch for any changes made in Frontend folder and recompile React jsx into proper js each time you save your code. It won't terminate and it will print errors when compilation not succesfull.

- **Step 3**: Import `database/create-soundcool-db.sql` into local mysql server
  - If using mysql comand line, you can import database using
    ```sql
    mysql -u <user_name> -p<Password> soundcool > <file_location>
    ```
  - If using MySQL workbench, open the `database/create-soundcool-db.sql` file.
    Execute the scripts by clicking the lighening button on the interface. This should create
    the same database on your machine so that you can run with user information.
  - To connect express to your mysql server
    - Create a .env file in current directory
    - Enter the following lines
    ```ruby
      MYSQL_HOST= <hostname> #it's localhost if you running it locally
      MYSQL_USER= <your_sql_server_username>
      MYSQL_PASS= <your_sql_server_password>
      MYSQL_DB= soundcool
    ```
- **Step 4**: Set a JWT Key value you want to use to sign JWT
  - Go to `.env` file
  - Add the following lines
  ```
  JWT_SECRET= <Any Valid JWT Key>
  ```
- **Step 5**: Start server
  - Go to `backend` folder.
  - Run `npm start`
  - Go to http://localhost:5000 to see the project!

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
