# Front-end

In this document we will go through all the components and files residing in the backend folder.  
Backend folder has following files & folders on the root directory

1. package.json
2. package-lock.json
3. db.js
4. server.js
5. utils.js
6. node_modules
7. public
8. routes
9. uploads

## Let's go through them one by one 

1. **package.json**: The package.json file is the heart of Node.js system. It is the manifest file of any Node.js project and contains the metadata of the project.  

2. **package-lock.json**: It has the record of each installed package which allows you to re-install them. Only delete this file in case of emergency.

3. **db.js**: Create a connection with MySql using the credentials provided in `.env` file and export it.

4. **server.js**: This is the base file responsible for starting the server on the assigned port.In this file we attach all the routes to our express app and can also configure it if required.

5. **utils.js**: We are using this file to store and export the methods which are frequently used throught the codebase.Currently this script have a total of two methods.
    - **generateToken**: This method takes the `user json` as the input and return a `json token` with 1 day validity using `json key` set in `.env` file. Sample `user json` is shown below
    
        ```json
        {
            "name":["Valid user name"],
            "user_id": ["valid user id"]
        }
        ```

    - **verifyToken**: This method takes a `json token` as input and verify it using the `json secret` stored in `.env` file.
    Method return with the user information on a successfull verification else it return `false`.

6. **node_modules**: node_modules is where npm modules are saved. If you open node_modules , you should see a folder named react , which contains the code that makes React run.

7. **public**: This folder is where `webpack` moves the front-end build along with the assets required.

8. **routes**: This folder contains various files with multiple endpoints created within them.We build all route/endpoint in their respective file to be exported and this folder is responsible for storing all such files.Let's go through each file one by one.
    - **auth.js**: The base `url` for all the routes in this file is `/api/v1/user`, further we have three endpoints at this base url.
        - **sign_in**: It takes `email` and `password` as input and then check if we have the `email` in our database and if a user is found we then match the `password` sent with the stored `password` using `bcrypt` as the stored password is a hash.Once the password match we return a `json token`.In all other case we return a valid error message.

        - **register**: Takes `name`, `password` and `email` as input and runs a validation to check if all input are valid.Once successfully checked we store the `name` and `email` as plain text but hash the `password` using `bcrypt` before saving it.A `json token` is return on successfull registeration.In all other case we return a valid error message.

        - **validateToken**: Takes `json token` as input and return it back if it's valid `json token` else it send a `401` response. 

    - **projects.js**:

    - **sounds.js**:

9. **uploads**: All the uploded content are placed in this folder.Currently we are only uploading sound files which are getting placed in the subdirectory `sounds` in this.
