#!/usr/bin/env bash

# copy from @technical-indicators so that its content is taken into account
# when creating documentation
cp -a ./node_modules/@stockastix/technical-indicators/src/. ./content/docs/indicators
# delete json files, otherwise it confuses fumadocs
# https://stackoverflow.com/a/42655267/18612308
rm -f ./content/docs/indicators/**/*.test.json
# otherwise npm run build complains because it tries to process the typescript files
rm -r -f ./content/docs/indicators/__test__

# copy public assets
cp -a ./node_modules/@stockastix/parse/dist/parse.min.js ./public/
cp -a ./node_modules/@stockastix/parse/grammar/lang.base.min.json ./public/
cp -a ./node_modules/@stockastix/x-input/dist/x-input.min.js ./public/
cp -a ./node_modules/@stockastix/x-input/style/x-input.css ./public/

# run original postinstall from fumadocs
fumadocs-mdx