#!/usr/bin/env bash

grunt --base src  --gruntfile src/Gruntfile.js build
git add . -A
git commit -m "deploying"
git push origin gh-pages
