# yarn list --pattern npm-run-all
echo "CD-ING INTO NODE_MODULES/@SENTRY/NEXTJS"
cd node_modules/@sentry/nextjs
cat package.json
echo "INSTALLING SDK DEPENDENCIES"
# this makes it install dev dependencies, which we need for building
yarn --prod false
yarn list --depth=0
# yarn add npm-run-all
# yarn list --depth=0
# yarn list --pattern npm-run-all
echo "BUILDING SDK"
echo "(Hint: We need to do this because we're installing it straight from a GH branch, not from npm.)"
yarn build
echo "NEXTJS SDK BUILT SUCCESSFULLY"
echo "RETURNING TO PROJECT ROOT"
cd ../../..
echo "BUILDING PROJECT"
yarn build
