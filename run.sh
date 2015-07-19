#!/bin/bash

initialize() {
  rm -rf data/db &
  mkdir -p data/db &
  mongod --dbpath=data/db &
  ./init/init.sh &
}

start() {
    nodemon server.js &
    (cd public; grunt watch) &
    mongod --dbpath=data/db
}

stop() {
    pkill -f "nodemon server.js"
    pkill -f "grunt watch"
    pkill -f "mongod --dbpath=data/db"
}

case "$1" in
    "")      start ;;
    start)   start ;;
    stop)    stop ;;
    init)    initialize ;;
    restart) stop; start ;;
    *) echo "usage: $0 start|stop|restart" >&2
       exit 1
       ;;
esac
