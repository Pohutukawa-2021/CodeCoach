#!/bin/sh
echo "waiting for backend"
./wait-for backend:3001

echo "starting application at port 80"
nginx -g daemon off;