echo "CD-ING INTO NODE_MODULES/@SENTRY/NEXTJS"
cd node_modules/@sentry/nextjs
echo "INSTALLING SDK DEPENDENCIES"
yarn
echo "BUILDING SDK"
echo "(Hint: We need to do this because we're installing it straight from a GH branch, not from npm.)"
yarn build
echo "NEXTJS SDK BUILT SUCCESSFULLY"
echo "RETURNING TO PROJECT ROOT"
cd ../../..
echo "BUILDING PROJECT"
yarn build
