# React-Express-Dashboard

This is the place where you run (locally, of course) the express backend
along with react frontend and mysql database.

## How to run

There are three steps.

- **Step 1**: build the soundcool project app.
  - Go to client2 folder.
  - run `npm i` to install all the dependendies. (if you don't have npm,
    please install Node.js and npm will come with it)
  - run `npm run build`
- **Step 2**: run the express backend with dashboard.
  - Go back to the root folder (react-express-dashboard)
  - run `npm i`
  - run `npm start`
- **Step 3**: Configure the MySQL database. (If you are familiar
  with MySQL, feel free to use your own tool.)
  - Download MySQL community server from www.mysql.com and install.
  - Also download the MySQL workbench from the same website and install,
    it's a graphical tool to help you manage your database.
  - In MySQL workbench, open the `create-soundcool-db.sql` file. Execute the
    scripts by clicking the lighening button on the interface. This should create
    the same database on your machine so that you can run with user information.
  - In order to access the database from express backend, change the connection
    information in `db.js` as yours. In the future we should set them as environment
    variables.

## How to develop

As you may noticed, both the create-react-app and server-side-rendering frontend
require you to compile the react codes into a bundle and serve it when running the app.
Without recompiling them, you will find that none of your changes are shown.

- Anytime you make changes in the folder `client2` (the create-react-app)
  - call `npm run build` in `client2` folder.
- If you are making changes in the folder `client` (the server-side-rendering dashboard)
  - call `npm run webpack` in the root folder. You don't need to call this every time, since webpack
    is watching you and automatically recompile when you make changes.
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
