#!/bin/sh
echo "waiting for backend"
./wait-for backend:3001

echo "starting application at port 3000"
nginx -g daemon off;