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

ls .next
[[ -e .next/analyze ]]
echo $?

# "e" for exists
if [[ -e .next/analyze ]]; then
  echo "Moving bundle analysis graphs to $(/public)"
  mv .next/analyze/* public
fi
