#!/bin/bash

docker-compose up &
sleep 5
npm run deploy
npm run build
node -r source-map-support/register .
