#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi


mongoimport --jsonArray --drop --db $1 --collection users --file ../../db/user.json
mongoimport --jsonArray --drop --db $1 --collection goals --file ../../db/goals.json
