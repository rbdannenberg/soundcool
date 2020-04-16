#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

if ! [ -x "$(command -v npm)" ]; then
    echo 'Error: npm is missing.' >&2
    exit 1
else
    echo Installed Version: NPM $(npm -v)
    echo Required Version: NPM 6.10.0
fi

if ! [ -x "$(command -v node)" ]; then
    echo 'Error: node is missing.' >&2
    exit 1
else
    echo Installed Version: Node $(node -v)
    echo Required Version: Node v10.16.0
fi

if ! [ -x "$(command -v mysql)" ]; then
    echo 'Error: mysql is missing.' >&2
    exit 1
else
    echo Installed Version: $(mysql --version)
    echo Required Version: mysql Ver 8.0
fi

if ! [ -x "$(command -v ffmpeg)" ]; then
    echo 'Error: ffmpeg is missing.' >&2
    exit 1
fi

echo '
Installed version should not have a major version difference
'