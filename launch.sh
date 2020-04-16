#!/usr/bin/env bash

set -e
printf "Do you want to rebuild project and dependecies before launch? [y/n]: "
read rebuildFlag

if [[ $rebuildFlag = 'y' || $rebuildFlag = 'Y' ]]; then
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
fi

cd src/backend
npm start