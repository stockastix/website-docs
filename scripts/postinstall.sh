#!/usr/bin/env bash

# copy from @technical-indicators so that its content is taken into account
# when creating documentation
cp -a ./node_modules/@stockastix/technical-indicators/src/. ./content/docs/technical-indicators
# delete json files, otherwise it confuses fumadocs
# https://stackoverflow.com/a/42655267/18612308
rm -f ./content/docs/technical-indicators/**/*.test.json
# otherwise npm run build complains because it tries to process the typescript files
rm -r -f ./content/docs/technical-indicators/__test__

# run original postinstall from fumadocs
fumadocs-mdx