# Soundcool Source code

This is the place where you run (locally) the express backend
along with react frontend and mysql database.

## How to Prerequisites
- Prerequisites
  - Node 10.16.0+ 
  - NPM 6.10.0+
  - MySQL 8.0+

## How to run

If you are running the whole project, there are four steps.

- **Step 1**: Install all dependencies
  - Go to `backend` folder.
  - Run `npm i` to install all the dependendies.
  
- **Step 2**: Start webpack to build and watch the project.
  - Run `npm run webpack`
  
- **Step 3**: Start server
  - Run `npm start`
  - Go to http://localhost:5000 to see the project!
  
- **Step 4**: Import `database/create-soundcool-db.sql` into local mysql server
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
      export MYSQL_HOST= <hostname> #it's localhost if you running it locally
      export MYSQL_USER= <your_sql_server_username> 
      export MYSQL_PASS= <your_sql_server_password>
      export MYSQL_DB= soundcool
    ```

Alternatively, if you are only developing the project editor and just want to
run the project editor without going through dashboard and users, you can just

- Go to `frontend/project-editor` folder.
- run `npm i`
- run `npm start`
- It will start the project editor in http://localhost:3000

## How to develop

As you may noticed, both the create-react-app and server-side-rendering
require you to compile the react codes into a bundle and serve it when running the app.
Without recompiling them, you will find that none of your changes are shown.

- Anytime you make changes in the folder `frontend/project-editor` (the create-react-app)
  - call `npm run build`.
- If you are making changes in the folder `backend/dashboard` (the server-side-rendering dashboard)
  - call `npm run webpack` in the `baekend` folder. You don't need to call this every time, since webpack is watching you and automatically recompile when you make changes.
- Any changes you make in terms of the server (anything outside of both client folders)
  will be automatically updated by `nodemon`. As you can see it's nodemon instead of node
  running when you starts the server.

## What do we currently have

- A simple login scheme.
  - Please check the database for the table of user, projects and sounds.
    If you login as user1@outlook.com or user2@gmail.com, they will have projects and
    sound associated.
  - There is authorization scheme so that you can only access the projects or sounds
    when you logged in as a user.
- Register

For what needs to be implemented, please refer to the Issues page which contains TODOs.
For new contributors, each issue is tagged with classification, and I recommend starting from
the purple tag `good first issue`.
