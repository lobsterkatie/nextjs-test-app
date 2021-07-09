#!/usr/bin/bash

# SCRIPT TO INCLUDE AS PART OF A VERCEL-DEPLOYED PROJECT, SO THAT IT USES A BRANCH FROM THE SDK REPO
# USE `yarn vercel:project <path-to-project>` TO HAVE IT AUTOMATICALLY ADDED TO YOUR PROJECT

# CUSTOM INSTALL COMMAND FOR PROJECT ON VERCEL: `source .sentry/install-sentry-from-branch.sh`

PROJECT_DIR=$(pwd)

# Set BRANCH_NAME as an environment variable
source .sentry/set-branch-name.sh

echo "current shell"
echo $0
man echo

# echo " "
printf "%b" "\nCLONING SDK REPO\n"
printf "\n%s\n" "CLONING SDK REPO"
git clone https://github.com/getsentry/sentry-javascript.git
cd sentry-javascript
git checkout $BRANCH_NAME
# git checkout 055854221c08685f07a0121bff911f6648a0e446
# SDK_COMMIT=$(git log --format="%s" | head -n 1)
echo "Latest commit: $(git log --format="%C(auto) %h - %s" | head -n 1)"
# echo "SDK_COMMIT=\"$(git log --format="%C(auto)%h - %s" | head -n 1)\"" >>.env.local
# cat .env.local

# echo " "
echo $'\nINSTALLING SDK DEPENDENCIES'
echo -e $'\nINSTALLING SDK DEPENDENCIES'
# We need dev dependencies so that we can build the SDK
yarn --prod false

# echo " "
BUILD_MSG="\nBUILDING SDK"
echo -e "$BUILD_MSG"
# we need to build es5 versions because `next.config.js` calls `require` on the SDK (to get `withSentryConfig`) and
# therefore it looks for `dist/index.js`
yarn build:es5
# we need to build esm versions because that's what `next` actually uses when it builds the app
yarn build:esm
cd $PROJECT_DIR

INFINITE_STACKTRACE_CODE="
Error.stackTraceLimit = Infinity;
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

# for abs_package_path in ${PROJECT_DIR}/sentry-javascript/packages/*; do

# # link the built packages into project dependencies
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
#   yarn link

#   cd $PROJECT_DIR
#   yarn link "@sentry/$package"
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
