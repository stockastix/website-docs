#!/usr/bin/env bash

# create symlink to @technical-indicators so that its content is taken into account
# when creating documentation

# I need to cd to the target directory where I want to create the symlink
# otherwise the link points to the wrong place
cd ./content/docs
# https://unix.stackexchange.com/a/207296
ln -sfn ../../node_modules/@stockastix/technical-indicators/src/ technical-indicators
# move back to root
cd ../..
# delete json files, otherwise it confuses fumadocs
# https://stackoverflow.com/a/42655267/18612308
rm -f ./content/docs/technical-indicators/**/*.test.json
# otherwise npm run build complains because it tries to process the typescript files
rm -r -f ./content/docs/technical-indicators/__test__

# run original postinstall from fumadocs
fumadocs-mdx