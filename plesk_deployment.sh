#!/bin/bash
PATH=/opt/plesk/node/10/bin:$PATH; cd src/frontend && npm install > package.log  && npm run webpack-build > webpack.log
PATH=/opt/plesk/node/10/bin:$PATH; cd src/backend && npm install > npm-install.log
yes | cp -rf /plesk/vhosts/soundcool.webs.upv.es/httpdocs/gitSoundcool/src/backend/. /plesk/vhosts/soundcool.webs.upv.es/httpdocs/
touch /plesk/vhosts/soundcool.webs.upv.es/httpdocs/tmp/restart.txt