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

mv .next/analyze/* public
