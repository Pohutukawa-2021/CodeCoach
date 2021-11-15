#!/bin/sh
echo "waiting for backend"
./wait-for db:5432

echo "running db migrations"
npm run build

echo "starting application at port 80"
nginx -g daemon off;