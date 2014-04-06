#!/usr/bin/env bash

echo "git pull"
git pull origin

PROCESS_NUM=$(ps -ef | grep "sublime_text ." | grep -v "grep" | wc -l)

if [ $PROCESS_NUM -eq 1 ];
then
    echo "Sublime already open. Nothing to do"
else
    echo "Opening Sublime Text..."
    subl src/
fi

echo "Initializing server..."
grunt --base src  --gruntfile src/Gruntfile.js serve