# React-Express-Dashboard

This is the place where you run (locally, of course) the express backend
along with react frontend and mysql database.

## How to run

There are three steps. The create-react-app based soundcool project editor,
server-side rendered dashboard from express backend,

- Step 1: build the soundcool project app.
  - Go to client2 folder.
  - run `npm i` to install all the dependendies. (if you don't have npm,
    please install Node.js and npm will come with it)
  - run `npm run build`
- Step 2: run the express backend.
  - Go back to the root folder (react-express-dashboard)
  - run `npm i`
  - run `npm run build`
- Step 3: Configure the MySQL database. (If you are familiar
  with MySQL, feel free to use your own tool.)
  - Download MySQL community server from www.mysql.com and install.
  - Also download the MySQL workbench from the same website and install,
    it's a graphical tool to help you manage your database.
  - In MySQL workbench, open the create-soundcool-db.sql file. Execute the
    scripts by clicking the lighening button on the interface. This should create
    the same database on your machine so that you can run with user information.
  - In order to access the database from express backend, change the connection
    information in db.js as yours. In the future we should set them as environment
    variables.

## How to develop

-

## Notes
