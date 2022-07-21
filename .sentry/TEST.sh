# echo " "
# echo "ls -a"
# ls
# echo " "
echo "ls -a .next"
ls .next
echo " "
echo "ls .next/server"
ls .next/server || exit 0
echo " "
echo "ls .next/server/chunks"
ls .next/server/chunks || exit 0
echo " "
# echo "ls .next/serverless"
# ls .next/serverless || exit 0
# echo " "
# echo "ls .next/static"
# ls .next/static || exit 0

echo "grepping for instrumentServer"
grep -lr 'instrumentServer' .next
echo ""

echo "grepping for config/webpack"
grep -lr 'config/webpack' .next
echo ""

echo "grepping for @sentry/core"
grep -lr '@sentry/core' .next
echo ""

echo "grepping for @sentry/cli"
grep -lr '@sentry/cli' .next
echo ""

echo "grepping for transaction.initSpanRecorder"
grep -lr 'transaction.initSpanRecorder' .next
echo ""

echo "grepping for deterministic version identifier"
grep -lr 'deterministic version identifier' .next
echo ""

# "e" for exists
if [[ -e .next/analyze ]]; then
  echo " "
  echo "Moving bundle analysis graphs from \`.next/analyze\` to \`/public\`"
  mv .next/analyze/* public
fi
if [[ -e .next/server/analyze/ ]]; then
  echo " "
  echo "Moving bundle analysis graphs from \`.next/server/analyze/\` to \`/public\`"
  mv .next/server/analyze/* public
  echo " "
fi

node .sentry/doNodeStuff.js
