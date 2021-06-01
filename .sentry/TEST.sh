echo "  root"
ls -a
echo "  .next"
ls -a .next
echo "  .next/server"
ls -a .next/server
mv .next/analyze/* public
cp instructions.md public
cp pages/api/hello.js public
cp pages/simple.js public
