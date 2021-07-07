# SDK_COMMIT_MESSAGE=$(cd sentry-javascript && git log --format="%C(auto)%s" | head -n 1)

# CONFIGURE_SCOPE_CODE="
# Sentry.configureScope(scope => {
#   if (process.env.VERCEL) {
#     scope.setTag('vercel', true);
#     scope.setTag('commitMessage', process.env.VERCEL_GIT_COMMIT_MESSAGE);
#     scope.setTag('sdkCommitMessage', $SDK_COMMIT_MESSAGE);
#   }
# });"

# cat .sentry/configurescope.txt >>blah.txt
# echo "$CONFIGURE_SCOPE_CODE" >>blah.txt
# echo $CONFIGURE_SCOPE_CODE >>sentry.server.config.js
# echo $CONFIGURE_SCOPE_CODE >>sentry.client.config.js

# cat sentry.server.config.js
# cat sentry.client.config.js
