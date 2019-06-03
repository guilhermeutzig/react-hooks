#!/bin/bash

NODE_MODULES_DIR="/app/node_modules"

#
#
if [ ! -d "$NODE_MODULES_DIR" ]; then
  echo "npm install"
  echo "Installing dependencies..."
  npm install
fi

#
#
if [ "$NODE_ENV" == "development" ]; then
  echo "npm run docker-dev"
  npm run docker-dev
fi

#
#
if [ "$NODE_ENV" == "production" ]; then
  echo "npm run docker-build"
  npm run docker-build
fi