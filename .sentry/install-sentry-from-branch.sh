#!/usr/bin/bash

# SCRIPT TO INCLUDE AS PART OF A VERCEL-DEPLOYED PROJECT, SO THAT IT USES A BRANCH FROM THE SDK REPO
# USE `yarn vercel:project <path-to-project>` TO HAVE IT AUTOMATICALLY ADDED TO YOUR PROJECT

# CUSTOM INSTALL COMMAND FOR PROJECT ON VERCEL: `source .sentry/install-sentry-from-branch.sh`

PROJECT_DIR=$(pwd)
REPO_DIR="${PROJECT_DIR}/sentry-javascript"

# Set BRANCH_NAME as an environment variable
source .sentry/set-branch-name.sh

# echo "current shell"
# echo $0
# bash --version
# shopt xpg_echo
# shopt -s xpg_echo
# shopt xpg_echo
# env | sort

echo " "
echo "CLONING SDK REPO"
git clone https://github.com/getsentry/sentry-javascript.git

echo " "
echo "MOVING INTO REPO DIRECTORY AND CHECKING OUT BRANCH"
cd $REPO_DIR
git checkout $BRANCH_NAME
# git checkout b6e355442c3c9df16d2938cacc9924e8c3bfb1e4
# echo " "
echo "LATEST COMMIT: $(git log --format="%C(auto) %h - %s" | head -n 1)"

echo " "
echo "INSTALLING SDK DEPENDENCIES"
# We need dev dependencies so that we can build the SDK
yarn --prod false

echo " "
echo "BUILDING SDK"
# we need to build es5 versions because `next.config.js` calls `require` on the SDK (to get `withSentryConfig`) and
# therefore it looks for `dist/index.js`
yarn build:es5
# we need to build esm versions because that's what `next` actually uses when it builds the app
yarn build:esm

# Set all packages in the repo to point to their siblings as file dependencies.
# That way, when we install the local copy of @sentry/nextjs, it'll pull the
# local copy of each of its @sentry/* dependents. This mimics what Lerna does
# with symlinks, just with file dependencies (which we have to use because
# linking seems to lead to module resolution errors).
echo " "
echo "POINTING SIBLING DEPENDENCIES IN PACKAGE.JSON AT LOCAL DIRECTORIES"

PACKAGES_DIR="$REPO_DIR/packages"

# escape all of the slashes in the path for use in sed
ESCAPED_PACKAGES_DIR=$(echo $PACKAGES_DIR | sed s/'\/'/'\\\/'/g)
echo $ESCAPED_PACKAGES_DIR

# get the names of all of the packages
package_names=()
for abs_package_path in ${PACKAGES_DIR}/*; do
  package_names+=($(basename $abs_package_path))
done

# set -x

# modify each package's package.json file
for package in ${package_names[@]}; do
  cd ${PACKAGES_DIR}/${package}

  # search package.json for sentry dependencies from the monorepo and for each
  # sibling dependency found, replace the version number with a file dependency
  # pointing to the sibling itself (so `"@sentry/utils": "6.9.0"` becomes
  # `"@sentry/utils": "file:./utils"`)
  for package_dep in ${package_names[@]}; do
    # echo $package_dep
    # sed -Ei "" /"${quote}@sentry(-internal)?\/${package_dep}${quote}"/s/"[0-9]+\.[0-9]+\.[0-9]+"/"file:.\/${package_dep}"/ package.json
    sed -Ei /"@sentry\/${package_dep}"/s/"[0-9]+\.[0-9]+\.[0-9]+"/"file:${ESCAPED_PACKAGES_DIR}\/${package_dep}"/ package.json
  done
done

# set +x

echo " "
echo "MOVING BACK TO PROJECT DIRECTORY"
cd $PROJECT_DIR

INFINITE_STACKTRACE_CODE="
// Error.stackTraceLimit = Infinity;
  "

SDK_COMMIT_MESSAGE=$(cd sentry-javascript && git log --format="%C(auto)%s" | head -n 1)
CONFIGURE_SCOPE_CODE="
Sentry.configureScope(scope => {
  if (process.env.VERCEL) {
    scope.setTag('vercel', true);
    scope.setTag('commitMessage', process.env.VERCEL_GIT_COMMIT_MESSAGE);
    scope.setTag('sdkCommitMessage', \"$SDK_COMMIT_MESSAGE\");
  }
});
  "

echo "$INFINITE_STACKTRACE_CODE" "$CONFIGURE_SCOPE_CODE" >>sentry.server.config.js
echo "$INFINITE_STACKTRACE_CODE" "$CONFIGURE_SCOPE_CODE" >>sentry.client.config.js

# Add built SDK as a file dependency. This has the side effect of forcing yarn to install all of the other dependencies,
# saving us the trouble of needing to call `yarn` separately after this
echo " "
echo "SUBSTITUTING LOCAL SDK FOR PUBLISHED ONE AND INSTALLING PROJECT DEPENDENCIES"
echo "yarn add file:sentry-javascript/packages/nextjs"
yarn add file:sentry-javascript/packages/nextjs

# In case for any reason we ever need to link the local SDK rather than adding it as a file dependency:

# echo " "
# echo "LINKING LOCAL SDK INTO PROJECT"

# ls -l node_modules/@sentry

# for abs_package_path in sentry-javascript/packages/*; do
#   package=$(basename $abs_package_path)

#   # this one will error out because it's not called @sentry/typescript, it's
#   # called @sentry-internal/typescript, but we don't need it, so just move on
#   if [ "$package" = "typescript" ]; then
#     continue
#   fi

#   echo " "
#   echo "Linking @sentry/${package}"

#   cd $abs_package_path
#   # yarn link
#   ls node_modules/

#   cd $PROJECT_DIR
#   # yarn link "@sentry/$package"
# done

# # These aren't in the repo and therefore have to be done separately (we link these even though they're not in the repo
# # because the branch might specify a different version of either than the published SDK does)
# for package in "cli" "webpack-plugin"; do

#   echo " "
#   echo "Linking @sentry/${package}"

#   cd sentry-javascript/node_modules/@sentry/$package
#   yarn link

#   cd $PROJECT_DIR
#   yarn link "@sentry/$package"
# done

# ls -l node_modules/@sentry

# echo " "
# echo "INSTALLING PROJECT DEPENDENCIES"

# yarn

# yarn
