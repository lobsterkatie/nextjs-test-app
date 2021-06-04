# echo "  root"
# ls -a
# echo "  .next"
# ls -a .next
# echo "  .next/server"
# ls -a .next/server
mv .next/analyze/* public
cp .next/server/webpack-runtime* public

cat .env.local
pwd
