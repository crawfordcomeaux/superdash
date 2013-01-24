#!/bin/sh

./node_modules/.bin/supervisor -w . -e js,jade,css,less,styl app.js
