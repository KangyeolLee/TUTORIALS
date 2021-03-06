#!/bin/bash

cd ~/cashbook-18
git fetch

local=$(git rev-parse HEAD)
echo $local

target=$(git rev-parse origin/dev)
echo $target

if [ $local != $target ]; then
    git pull origin dev
    echo 'pull successfully'

    echo '---client build---'
    cd ./client
    sudo npm install && npm run build
    cp -r ./dist/* /var/www/html

    echo '---server build---'
    cd ../server
    sudo npm install && npm run start:pm2

    # 기존 커밋 덮어쓰기
    echo '---update lastCommit.info---'
    echo $target > /home/ubuntu/last-commit.info
fi
