# yarn list --pattern npm-run-all
echo -e "\nCD-ING INTO NODE_MODULES/@SENTRY/NEXTJS\n"
cd node_modules/@sentry/nextjs
# a
# cat package.json
echo $'\nINSTALLING SDK DEPENDENCIES\n'
# this makes it install dev dependencies, which we need for building
yarn --prod false
ls -l node_modules/@sentry
# yarn list --depth=0
# yarn add npm-run-all
# yarn list --depth=0
# yarn list --pattern npm-run-all
for package in "types" "utils" "hub" "minimal" "core" "browser" "tracing" "node" "react" "integrations"; do
  # ${var-name:u} converts to uppercase in zsh (can also do ${(U)var-name},
  # and the same works with l/L for lowercase)
  echo "  "
  echo "  "
  echo "***** @SENTRY/${package:u} *****\n"
  cd node_modules/@sentry/${package}
  # echo "\n Deleting node_modules\n"
  # yarn
  yarn --prod false
  yarn build
  cd -
done
yarn list --pattern \@sentry
yarn why \@sentry/types
ls -l node_modules/@sentry
ls -l node_modules/@sentry/node/node_modules/@sentry
echo "BUILDING SDK"
echo "(Hint: We need to do this because we're installing it straight from a GH branch, not from npm.)"
yarn build
echo "NEXTJS SDK BUILT SUCCESSFULLY"
echo "RETURNING TO PROJECT ROOT"
cd ../../..
echo "BUILDING PROJECT"
yarn build
