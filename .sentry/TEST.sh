# echo " "
# echo "ls"
# ls
# echo " "
# echo "ls .next"
# ls .next
# echo " "
# echo "ls .next/server"
# ls .next/server || exit 0
# echo " "
# echo "ls .next/serverless"
# ls .next/serverless || exit 0
# echo " "
# echo "ls .next/static"
# ls .next/static || exit 0

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
