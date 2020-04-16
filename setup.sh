#!/usr/bin/env bash

set -e
echo Setting up backend folder
cd src/backend
npm i
npm audit fix

echo Setting up frontend folder
cd ../frontend
npm i
npm audit fix

echo Building Project
npm run-script build

cd ../..
echo Setting up MySql

if [ -f /root/.my.cnf ]; then
    echo "Please enter the NAME of the new MySQL database! (example: database1)"
    read dbname
    echo "Please enter the MySQL database CHARACTER SET! (example: latin1, utf8, ...)"
    echo "Enter utf8 if you don't know what you are doing"
    read charset
    echo "Creating new MySQL database..."
    mysql -e "CREATE DATABASE ${dbname} /*\!40100 DEFAULT CHARACTER SET ${charset} */;"
    echo "Database successfully created!"
    echo "Showing existing databases..."
    mysql -e "show databases;"
    echo ""
    echo "Please enter the NAME of the new MySQL database user! (example: user1)"
    read username
    echo "Please enter the PASSWORD for the new MySQL database user!"
    echo "Note: password will be hidden when typing"
    read -s userpass
    echo "Creating new user..."
    mysql -e "CREATE USER ${username}@localhost IDENTIFIED WITH mysql_native_password BY '${userpass}';"
    echo "User successfully created!"
    echo ""
    echo "Granting ALL privileges on ${dbname} to ${username}!"
    mysql -e "GRANT ALL PRIVILEGES ON ${dbname}.* TO '${username}'@'localhost';"
    mysql -e "FLUSH PRIVILEGES;"
    
    # If /root/.my.cnf doesn't exist then it'll ask for root password
else
    echo "Please enter root level mysql username"
    echo "Note: Use root if you don't have any other"
    read rootusername
    echo "Please enter root user MySQL password!"
    echo "Note: password will be hidden when typing"
    read -s rootpasswd
    echo "Please enter the NAME of the new MySQL database! (example: database1)"
    read dbname
    echo "Please enter the MySQL database CHARACTER SET! (example: latin1, utf8, ...)"
    echo "Enter utf8 if you don't know what you are doing"
    read charset
    echo "Creating new MySQL database..."
    mysql -u${rootusername} -p${rootpasswd} -e "CREATE DATABASE ${dbname} /*\!40100 DEFAULT CHARACTER SET ${charset} */;"
    echo "Database successfully created!"
    echo "Showing existing databases..."
    mysql -u${rootusername} -p${rootpasswd} -e "show databases;"
    echo ""
    echo "Please enter the NAME of the new MySQL database user! (example: user1)"
    read username
    echo "Please enter the PASSWORD for the new MySQL database user!"
    echo "Note: password will be hidden when typing"
    read -s userpass
    echo "Creating new user..."
    mysql -u${rootusername} -p${rootpasswd} -e "CREATE USER ${username}@localhost IDENTIFIED WITH mysql_native_password BY '${userpass}';"
    echo "User successfully created!"
    echo ""
    echo "Granting ALL privileges on ${dbname} to ${username}!"
    mysql -u${rootusername} -p${rootpasswd} -e "GRANT ALL PRIVILEGES ON ${dbname}.* TO '${username}'@'localhost';"
    mysql -u${rootusername} -p${rootpasswd} -e "FLUSH PRIVILEGES;"
fi

echo "Mysql User has been setup successfully"
echo "Importing database..."
cd src/database
mysql -u${username} -p${userpass} ${dbname} < create-soundcool-db.sql

echo "Database Imported successfully"

cd ../..

echo "Enter a secret jwt token"
echo "Note: Enter any random word if you don't know what it is"
read jwtToken

echo "Setting up enviornment variables"

cd src/backend

if [ -e .env ]; then
    rm .env
fi

echo "MYSQL_HOST= localhost
MYSQL_USER= ${username}
MYSQL_PASS= ${userpass}
MYSQL_DB= ${dbname}
JWT_SECRET= ${jwtToken}" >> .env

echo "Project has been setup successfully"
echo "Sample user (username:password) user1@welcome.com:welcome or user2@welcome.com:welcome has been created"
echo "You can now launch the server"